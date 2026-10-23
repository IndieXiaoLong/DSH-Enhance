/**
 * Browser-local state for the plugin: conversation folders, presentation
 * settings, and the floating button position.
 *
 * Everything survives reloads through one localStorage document. The store is
 * intentionally framework-free; React subscribes through `useSyncExternalStore`.
 */

export type Folder = {
  id: string
  name: string
  color: string
  createdAt: number
}

export type Settings = {
  widthRem: number
  timeline: boolean
  /** Hide DSH's own horizontal turn rail on the right of the Chat view. */
  hideNativeTurnNav: boolean
  hideFiled: boolean
  showStrip: boolean
  stripCollapsed: boolean
  /** Ask for a title before creating a conversation from a workspace "+" button. */
  nameNewSession: boolean
  ball: { right: number; bottom: number }
}

export type EnhanceState = {
  version: 1
  folders: Folder[]
  /** session id -> folder id */
  assignments: Record<string, string>
  settings: Settings
}

export const WIDTH_MIN = 38
export const WIDTH_MAX = 90
export const WIDTH_DEFAULT = 48

/** Native DSH preference key for the conversation content width (px). */
const NATIVE_WIDTH_KEY = 'dsh.conversation.contentWidth'
const STORAGE_KEY = 'dsh-enhance.state.v1'

const COLORS = ['#5b8def', '#7c6cf0', '#d9764a', '#3fa980', '#c75c9a', '#b08b3e']

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function uid(): string {
  return `f_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

function defaultState(): EnhanceState {
  return {
    version: 1,
    folders: [],
    assignments: {},
    settings: {
      widthRem: WIDTH_DEFAULT,
      timeline: true,
      hideNativeTurnNav: true,
      hideFiled: true,
      showStrip: true,
      stripCollapsed: false,
      nameNewSession: true,
      ball: { right: 18, bottom: 96 },
    },
  }
}

function sanitize(raw: unknown): EnhanceState {
  const base = defaultState()
  if (raw === null || typeof raw !== 'object') return base
  const input = raw as Partial<EnhanceState>
  const folders: Folder[] = Array.isArray(input.folders)
    ? input.folders
        .filter(folder => folder && typeof folder === 'object')
        .map((folder, index) => ({
          id: typeof folder.id === 'string' && folder.id ? folder.id : uid(),
          name: typeof folder.name === 'string' && folder.name.trim() ? folder.name.trim().slice(0, 60) : `Folder ${index + 1}`,
          color: typeof folder.color === 'string' && folder.color ? folder.color : COLORS[index % COLORS.length],
          createdAt: typeof folder.createdAt === 'number' ? folder.createdAt : Date.now(),
        }))
    : []
  const ids = new Set(folders.map(folder => folder.id))
  const assignments: Record<string, string> = {}
  if (input.assignments && typeof input.assignments === 'object') {
    for (const [sessionId, folderId] of Object.entries(input.assignments)) {
      if (typeof sessionId === 'string' && typeof folderId === 'string' && ids.has(folderId)) {
        assignments[sessionId] = folderId
      }
    }
  }
  const settings = { ...base.settings, ...(input.settings ?? {}) }
  const width = Number(settings.widthRem)
  const ball = settings.ball
  return {
    version: 1,
    folders,
    assignments,
    settings: {
      widthRem: Number.isFinite(width) ? clamp(Math.round(width), WIDTH_MIN, WIDTH_MAX) : WIDTH_DEFAULT,
      timeline: settings.timeline !== false,
      hideNativeTurnNav: settings.hideNativeTurnNav !== false,
      hideFiled: settings.hideFiled !== false,
      showStrip: settings.showStrip !== false,
      stripCollapsed: settings.stripCollapsed === true,
      nameNewSession: settings.nameNewSession !== false,
      ball:
        ball && Number.isFinite(ball.right) && Number.isFinite(ball.bottom)
          ? { right: clamp(ball.right, 4, 400), bottom: clamp(ball.bottom, 4, 400) }
          : base.settings.ball,
    },
  }
}

export class EnhanceStore {
  private state: EnhanceState = defaultState()

  private readonly listeners = new Set<() => void>()

  private toastTimer: number | undefined

  toast: string | null = null

  private started = false

  private observer: MutationObserver | null = null

  private frame = 0

  private appliedWidthPx = 0

  private storageHandler: ((event: StorageEvent) => void) | null = null

  start(): void {
    if (this.started) return
    this.started = true
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw !== null) this.state = sanitize(JSON.parse(raw))
    } catch {
      this.state = defaultState()
    }
    this.applyWidth()
    this.applyNativeTurnNav()
    // The folder panel is gone; make sure a previous version's filed-row
    // filter cannot keep conversations hidden.
    document.documentElement.removeAttribute('data-dsh-enhance-hide-filed')
    for (const row of document.querySelectorAll<HTMLElement>('[data-dsh-enhance-filed]')) {
      row.removeAttribute('data-dsh-enhance-filed')
    }

    this.observer = new MutationObserver(() => {
      if (this.frame) return
      this.frame = window.requestAnimationFrame(() => {
        this.frame = 0
        this.syncWidthFromDom()
        this.applyNativeTurnNav()
      })
    })
    this.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style'],
    })

    this.storageHandler = event => {
      if (event.key !== STORAGE_KEY || event.newValue === null) return
      try {
        this.state = sanitize(JSON.parse(event.newValue))
        this.applyAll()
        this.emit()
      } catch {
        // Ignore malformed values written by another tab.
      }
    }
    window.addEventListener('storage', this.storageHandler)
  }

  stop(): void {
    if (!this.started) return
    this.started = false
    this.observer?.disconnect()
    this.observer = null
    if (this.frame) {
      window.cancelAnimationFrame(this.frame)
      this.frame = 0
    }
    if (this.storageHandler) window.removeEventListener('storage', this.storageHandler)
    this.storageHandler = null
    if (this.toastTimer !== undefined) window.clearTimeout(this.toastTimer)
    document.documentElement.removeAttribute('data-dsh-enhance-hide-filed')
    for (const nav of document.querySelectorAll<HTMLElement>('[data-dsh-enhance-native-turn-nav]')) {
      nav.removeAttribute('data-dsh-enhance-native-turn-nav')
    }
    document.documentElement.style.removeProperty('--dsh-chat-user-width')
    for (const body of document.querySelectorAll<HTMLElement>('[data-conversation-content]')) {
      const target = body.parentElement
      if (target?.style.getPropertyValue('--dsh-chat-user-width') === `${this.appliedWidthPx}px`) {
        target.style.removeProperty('--dsh-chat-user-width')
      }
    }
  }

  getSnapshot = (): EnhanceState => this.state

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private emit(): void {
    for (const listener of this.listeners) listener()
  }

  private commit(next: EnhanceState): void {
    this.state = next
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Storage can be unavailable in privacy mode; in-memory state still works.
    }
    this.applyAll()
    this.emit()
  }

  createFolder(name: string): Folder {
    const folder: Folder = {
      id: uid(),
      name: name.trim().slice(0, 60) || 'Folder',
      color: COLORS[this.state.folders.length % COLORS.length],
      createdAt: Date.now(),
    }
    this.commit({ ...this.state, folders: [...this.state.folders, folder] })
    return folder
  }

  renameFolder(id: string, name: string): void {
    const trimmed = name.trim().slice(0, 60)
    if (!trimmed) return
    this.commit({
      ...this.state,
      folders: this.state.folders.map(folder => (folder.id === id ? { ...folder, name: trimmed } : folder)),
    })
  }

  deleteFolder(id: string): void {
    const assignments: Record<string, string> = {}
    for (const [sessionId, folderId] of Object.entries(this.state.assignments)) {
      if (folderId !== id) assignments[sessionId] = folderId
    }
    this.commit({
      ...this.state,
      folders: this.state.folders.filter(folder => folder.id !== id),
      assignments,
    })
  }

  assign(sessionId: string, folderId: string | null): void {
    const assignments = { ...this.state.assignments }
    if (folderId === null) delete assignments[sessionId]
    else assignments[sessionId] = folderId
    this.commit({ ...this.state, assignments })
  }

  reorderFolders(sourceId: string, targetId: string): void {
    if (sourceId === targetId) return
    const folders = [...this.state.folders]
    const from = folders.findIndex(folder => folder.id === sourceId)
    const to = folders.findIndex(folder => folder.id === targetId)
    if (from < 0 || to < 0) return
    const [moved] = folders.splice(from, 1)
    folders.splice(to, 0, moved)
    this.commit({ ...this.state, folders })
  }

  setWidth(rem: number): void {
    const widthRem = clamp(Math.round(rem), WIDTH_MIN, WIDTH_MAX)
    if (widthRem === this.state.settings.widthRem) return
    try {
      localStorage.setItem(NATIVE_WIDTH_KEY, String(widthRem * 16))
    } catch {
      // Ignore storage errors.
    }
    this.commit({ ...this.state, settings: { ...this.state.settings, widthRem } })
  }

  patchSettings(patch: Partial<Settings>): void {
    this.commit({ ...this.state, settings: { ...this.state.settings, ...patch } })
  }

  setBall(position: { right: number; bottom: number }): void {
    this.commit({
      ...this.state,
      settings: {
        ...this.state.settings,
        ball: {
          right: clamp(Math.round(position.right), 4, Math.max(4, window.innerWidth - 60)),
          bottom: clamp(Math.round(position.bottom), 4, Math.max(4, window.innerHeight - 60)),
        },
      },
    })
  }

  resetBall(): void {
    this.patchSettings({ ball: { right: 18, bottom: 96 } })
  }

  notify(message: string): void {
    this.toast = message
    if (this.toastTimer !== undefined) window.clearTimeout(this.toastTimer)
    this.toastTimer = window.setTimeout(() => {
      this.toast = null
      this.emit()
    }, 2600)
    this.emit()
  }

  dismissToast(): void {
    this.toast = null
    if (this.toastTimer !== undefined) window.clearTimeout(this.toastTimer)
    this.emit()
  }

  private applyAll(): void {
    this.applyWidth()
    this.syncWidthFromDom()
    this.applyNativeTurnNav()
  }

  /**
   * DSH's Chat view renders its own turn rail as a `nav` inside the
   * conversation scroller (its CSS-module class ends in `_frame`). Mark that
   * nav so a small CSS rule can hide it; the native rail is recreated as turns
   * change, so the store's DOM observer re-applies the mark.
   */
  private applyNativeTurnNav(): void {
    const hide = this.state.settings.hideNativeTurnNav === true
    for (const nav of document.querySelectorAll<HTMLElement>('[data-conversation-scroll] nav[aria-label]')) {
      if (nav.classList.contains('dsh-fx-timeline')) continue
      const hasFrameClass = Array.from(nav.classList).some(name => name.endsWith('_frame'))
      if (!hasFrameClass) continue
      if (nav.querySelectorAll('button').length < 2) continue
      if (hide) nav.setAttribute('data-dsh-enhance-native-turn-nav', '')
      else nav.removeAttribute('data-dsh-enhance-native-turn-nav')
    }
    if (!hide) {
      for (const nav of document.querySelectorAll<HTMLElement>('[data-dsh-enhance-native-turn-nav]')) {
        nav.removeAttribute('data-dsh-enhance-native-turn-nav')
      }
    }
  }

  /** Project the chosen width onto the Conversation body's parent, where DSH reads it. */
  private applyWidth(): void {
    const px = Math.round(this.state.settings.widthRem * 16)
    this.appliedWidthPx = px
    const value = `${px}px`
    document.documentElement.style.setProperty('--dsh-chat-user-width', value)
    const bodies = document.querySelectorAll<HTMLElement>('[data-conversation-content]')
    for (const body of bodies) {
      const target = body.parentElement
      if (!target) continue
      if (target.style.getPropertyValue('--dsh-chat-user-width') !== value) {
        target.style.setProperty('--dsh-chat-user-width', value)
      }
    }
    try {
      localStorage.setItem(NATIVE_WIDTH_KEY, String(px))
    } catch {
      // Ignore storage errors.
    }
  }

  /**
   * Follow width changes made through DSH's own drag handles: the handle writes
   * the same CSS variable and preference key, so the panel's slider stays in
   * sync instead of fighting it.
   */
  private syncWidthFromDom(): void {
    const body = document.querySelector<HTMLElement>('[data-conversation-content]')
    const raw = body?.parentElement?.style.getPropertyValue('--dsh-chat-user-width').trim()
    if (!raw || !raw.endsWith('px')) return
    const px = Number.parseFloat(raw)
    if (!Number.isFinite(px) || px <= 0) return
    if (Math.abs(px - this.appliedWidthPx) < 4) return
    const widthRem = clamp(Math.round(px / 16), WIDTH_MIN, WIDTH_MAX)
    if (widthRem === this.state.settings.widthRem) return
    this.appliedWidthPx = widthRem * 16
    this.state = { ...this.state, settings: { ...this.state.settings, widthRem } }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state))
    } catch {
      // Ignore storage errors.
    }
    this.emit()
  }
}

export const enhanceStore = new EnhanceStore()
