/**
 * Drag a file from the right-sidebar file tree into the composer as an
 * `@path` reference chip.
 *
 * The native file tree (ui-sidebar-files) intentionally has no drag-and-drop,
 * so this module marks its file rows draggable and recognises them by the
 * stable `data-files-*` markers they already publish. Dropping on the composer
 * inserts an ordinary file reference through the public Conversation input
 * face; the file is never moved, copied, read, or rewritten.
 */
import { enhanceStore } from './store'

type Translate = (key: string, params?: Record<string, unknown>) => string

const DRAG_MIME = 'application/x-dsh-enhance-file'
const ENTRY_SELECTOR = '[data-files-entry="file"], [data-files-entry="directory"]'
const ALL_ENTRY_SELECTOR = '[data-files-entry]'
const COMPOSER_CARD_SELECTOR = '[data-composer-card]'
const OVER_ATTR = 'data-dsh-enhance-file-over'
const DRAGGABLE_ATTR = 'data-dsh-enhance-draggable'
const DRAGGING_ATTR = 'data-dsh-enhance-dragging'

type EntryKind = 'file' | 'directory'
type FileDragPayload = { path: string; kind: EntryKind }

let draggedPath: string | null = null
let draggedKind: EntryKind = 'file'
let activeCard: HTMLElement | null = null

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return typeof error === 'string' ? error : String(error)
}

function serviceOf(ctx: any, name: string): any {
  return typeof ctx?.get === 'function' ? ctx.get(name) : ctx?.[name]
}

function closestDraggableEntry(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null
  return target.closest<HTMLElement>(ENTRY_SELECTOR)
}

/** Mark one row (and its button) as an HTML5 drag source, or undo the mark. */
function setDraggable(entry: HTMLElement, enabled: boolean): void {
  const button = entry.querySelector<HTMLElement>(':scope > button')
  if (enabled) {
    entry.draggable = true
    entry.setAttribute(DRAGGABLE_ATTR, '')
    if (button) {
      button.draggable = true
      button.setAttribute(DRAGGABLE_ATTR, '')
    }
    return
  }
  if (!entry.hasAttribute(DRAGGABLE_ATTR) && !button?.hasAttribute(DRAGGABLE_ATTR)) return
  entry.removeAttribute('draggable')
  entry.removeAttribute(DRAGGABLE_ATTR)
  if (button) {
    button.removeAttribute('draggable')
    button.removeAttribute(DRAGGABLE_ATTR)
  }
}

function refreshFileRows(): void {
  if (!document.querySelector('[data-files-body]')) return
  for (const entry of document.querySelectorAll<HTMLElement>(ALL_ENTRY_SELECTOR)) {
    const kind = entry.getAttribute('data-files-entry')
    setDraggable(entry, kind === 'file' || kind === 'directory')
  }
}

function basename(path: string): string {
  const trimmed = path.replace(/[/\\]+$/, '')
  const separator = Math.max(trimmed.lastIndexOf('/'), trimmed.lastIndexOf('\\'))
  return trimmed.slice(separator + 1)
}

/**
 * Strip the session workspace root from an absolute path. Both separators are
 * normalized first: the tree publishes `D:\root/src/file`, while a Host cwd
 * may use either spelling.
 */
function relativizeToCwd(path: string, cwd: string | undefined): string {
  const normalizedPath = path.replace(/\\/g, '/')
  if (!cwd) return normalizedPath
  const root = cwd.replace(/\\/g, '/').replace(/\/+$/, '')
  if (root === '') return normalizedPath
  if (normalizedPath === root) return ''
  if (normalizedPath.startsWith(`${root}/`)) return normalizedPath.slice(root.length + 1)
  return normalizedPath
}

/**
 * The shared `@path` grammar: quote whitespace, refuse control characters.
 * A quoted directory keeps its opening quote after the trailing slash, which
 * is the grammar the native `@` completion uses for folder references.
 */
function formatEntryMention(path: string, directory: boolean): string | undefined {
  const target = directory ? `${path}/` : path
  if (/[\u0000-\u001f\u007f-\u009f"]/u.test(target)) return undefined
  if (!/\s/u.test(target)) return `@${target}`
  return directory ? `@"${target}` : `@"${target}"`
}

function clearCardHighlight(): void {
  if (activeCard) {
    activeCard.removeAttribute(OVER_ATTR)
    activeCard = null
  }
  for (const card of document.querySelectorAll<HTMLElement>(`[${OVER_ATTR}]`)) {
    card.removeAttribute(OVER_ATTR)
  }
}

function markCard(card: HTMLElement, hint: string): void {
  if (activeCard && activeCard !== card) activeCard.removeAttribute(OVER_ATTR)
  activeCard = card
  if (card.getAttribute(OVER_ATTR) !== hint) card.setAttribute(OVER_ATTR, hint)
}

/** The Session whose composer owns this card. */
function sessionOfCard(card: HTMLElement): string | null {
  const owner =
    card.closest('[data-conversation-content]') ??
    document.querySelector('[data-conversation-content]')
  const id = owner?.getAttribute('data-conversation-session') ?? ''
  return id || null
}

/**
 * Insert one file reference at the composer's current selection. This is the
 * same structured reference the native `@` completion inserts, so submission
 * expands it to the model-facing `@path` mention and clicking it previews the
 * file.
 */
function insertFileReference(
  ctx: any,
  t: Translate,
  card: HTMLElement,
  path: string,
  kind: EntryKind,
): void {
  const sessionId = sessionOfCard(card)
  if (!sessionId) {
    enhanceStore.notify(t('fileDrag.noSession'))
    return
  }

  const editor = card.querySelector<HTMLElement>('[data-composer-input]')
  if (editor?.getAttribute('contenteditable') === 'false') {
    enhanceStore.notify(t('fileDrag.locked'))
    return
  }

  const sessions = serviceOf(ctx, 'sessions')
  const conversation = serviceOf(ctx, 'conversation')
  if (!sessions?.scope || !conversation?.input?.for) {
    enhanceStore.notify(t('fileDrag.failed', { message: 'conversation input unavailable' }))
    return
  }

  const actx = sessions.scope(sessionId)
  if (!actx) {
    enhanceStore.notify(t('fileDrag.failed', { message: 'session scope unavailable' }))
    return
  }

  const summary = sessions.list?.getSnapshot?.().byId?.[sessionId]
  const cwd = typeof summary?.cwd === 'string' ? summary.cwd : undefined
  const relative = relativizeToCwd(path, cwd)
  const directory = kind === 'directory'
  const mention = formatEntryMention(relative, directory)
  if (!mention) {
    enhanceStore.notify(t('fileDrag.unsupported'))
    return
  }

  const name = basename(path) || relative
  const label = directory ? `${name}/` : name
  try {
    const shell = conversation.input.for(actx)
    const span = shell.actions?.captureInsertion?.()
    if (!span) {
      enhanceStore.notify(t('fileDrag.failed', { message: 'editor selection unavailable' }))
      return
    }
    const inserted = shell.insertReference(
      {
        source: 'reference',
        ref: mention,
        label,
        appearance: directory ? 'folder' : 'file',
        clipboardText: mention,
      },
      span,
    )
    if (!inserted) {
      enhanceStore.notify(t('fileDrag.locked'))
      return
    }
    shell.focus?.()
  } catch (error) {
    enhanceStore.notify(t('fileDrag.failed', { message: errorMessage(error) }))
  }
}

/**
 * Install the file-tree drag source and the composer drop target.
 * @param ctx - Client root context (sessions/conversation services resolved lazily).
 * @param t - plugin-bound translate for the drop hint and failure notices.
 * @returns the teardown that removes every listener, mark, and attribute.
 */
export function installFileDrag(ctx: any, t: Translate): () => void {
  let frame = 0
  const schedule = () => {
    if (frame) return
    frame = window.requestAnimationFrame(() => {
      frame = 0
      refreshFileRows()
    })
  }

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return
    const entry = closestDraggableEntry(event.target)
    if (entry) setDraggable(entry, true)
  }

  const onDragStart = (event: DragEvent) => {
    const entry = closestDraggableEntry(event.target)
    const transfer = event.dataTransfer
    if (!entry || !transfer) return
    const path = entry.getAttribute('data-files-path') ?? ''
    if (!path) return
    const kind: EntryKind = entry.getAttribute('data-files-entry') === 'directory' ? 'directory' : 'file'
    draggedPath = path
    draggedKind = kind
    transfer.effectAllowed = 'copy'
    try {
      transfer.clearData()
    } catch {
      // Some synthetic drag sources do not implement clearData.
    }
    transfer.setData(DRAG_MIME, JSON.stringify({ path, kind } satisfies FileDragPayload))
    // No text/plain on purpose: the composer editor would insert it as text.
    try {
      transfer.setDragImage(entry, 14, 14)
    } catch {
      // The row can be detached by a concurrent re-render.
    }
    entry.setAttribute(DRAGGING_ATTR, '')
  }

  const onDragOver = (event: DragEvent) => {
    const transfer = event.dataTransfer
    if (!transfer) return
    const ours = Array.from(transfer.types).includes(DRAG_MIME) || draggedPath !== null
    if (!ours) return
    const card =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>(COMPOSER_CARD_SELECTOR)
        : null
    if (!card) {
      clearCardHighlight()
      return
    }
    event.preventDefault()
    event.stopPropagation()
    transfer.dropEffect = 'copy'
    const name = draggedPath ? basename(draggedPath) : ''
    const suffix = draggedKind === 'directory' ? '/' : ''
    markCard(card, t('fileDrag.dropHint', { name: `${name}${suffix}` }))
  }

  const onDragLeave = (event: DragEvent) => {
    if (!activeCard) return
    const related = event.relatedTarget
    if (related instanceof Node && activeCard.contains(related)) return
    clearCardHighlight()
  }

  const onDrop = (event: DragEvent) => {
    const transfer = event.dataTransfer
    if (!transfer) return
    const ours = Array.from(transfer.types).includes(DRAG_MIME) || draggedPath !== null
    if (!ours) return
    const card =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>(COMPOSER_CARD_SELECTOR)
        : null
    if (!card) {
      clearCardHighlight()
      return
    }
    event.preventDefault()
    event.stopPropagation()
    clearCardHighlight()

    let path = draggedPath
    let kind: EntryKind = draggedKind
    try {
      const raw = transfer.getData(DRAG_MIME)
      if (raw) {
        const parsed = JSON.parse(raw) as FileDragPayload
        if (typeof parsed?.path === 'string' && parsed.path) path = parsed.path
        if (parsed?.kind === 'directory' || parsed?.kind === 'file') kind = parsed.kind
      }
    } catch {
      // Fall back to the path retained at dragstart.
    }
    draggedPath = null
    draggedKind = 'file'
    if (!path) {
      enhanceStore.notify(t('fileDrag.failed', { message: 'missing path' }))
      return
    }
    insertFileReference(ctx, t, card, path, kind)
  }

  const onDragEnd = () => {
    draggedPath = null
    draggedKind = 'file'
    clearCardHighlight()
    for (const node of document.querySelectorAll(`[${DRAGGING_ATTR}]`)) {
      node.removeAttribute(DRAGGING_ATTR)
    }
  }

  const observer = new MutationObserver(schedule)
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-files-entry'],
  })
  schedule()

  document.addEventListener('pointerdown', onPointerDown, true)
  window.addEventListener('dragstart', onDragStart, true)
  window.addEventListener('dragover', onDragOver, true)
  window.addEventListener('dragleave', onDragLeave, true)
  window.addEventListener('drop', onDrop, true)
  window.addEventListener('dragend', onDragEnd, true)

  return () => {
    if (frame) window.cancelAnimationFrame(frame)
    observer.disconnect()
    document.removeEventListener('pointerdown', onPointerDown, true)
    window.removeEventListener('dragstart', onDragStart, true)
    window.removeEventListener('dragover', onDragOver, true)
    window.removeEventListener('dragleave', onDragLeave, true)
    window.removeEventListener('drop', onDrop, true)
    window.removeEventListener('dragend', onDragEnd, true)
    draggedPath = null
    draggedKind = 'file'
    clearCardHighlight()
    for (const node of document.querySelectorAll(`[${DRAGGING_ATTR}]`)) {
      node.removeAttribute(DRAGGING_ATTR)
    }
    for (const entry of document.querySelectorAll<HTMLElement>(ALL_ENTRY_SELECTOR)) {
      setDraggable(entry, false)
    }
  }
}
