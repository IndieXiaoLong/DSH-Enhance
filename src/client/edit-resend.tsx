/**
 * Edit the last user prompt and resend it from a clean branch.
 *
 * DSH keeps an append-only session log and exposes no "rewrite this user
 * message" API. The public `ctx.sessions.fork()` call can cut an exact
 * inclusive prefix, so the feature forks **before the turn that carried the
 * prompt** (including its queued inbox copy), sends the edited text in the
 * child, opens the child, and archives the superseded source.
 *
 * The affordance follows the native message form: a pencil action beside Copy
 * in the sent prompt's action row expands that row into a full-width inline
 * editor with Cancel/Send.
 */
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type {} from '@deepseek-ai/dsh-api-session-controller/client'
import { enhanceStore } from './store'
import { conversationBody, conversationScroll, isVisible, readableText } from './dom'

type Translate = (key: string, params?: Record<string, unknown>) => string

declare module '@deepseek-ai/dsh-api-session-controller/client' {
  interface SessionReferenceSourceMap {
    /** A dsh-enhance edit-and-resend branch. */
    dshEnhanceEditResend: unknown
  }
}

type EditPromptProps = {
  t: Translate
  ctx: any
  sessionId: string | null
  sessions: any
}

type PromptTarget = {
  /** The user flow item that owns the prompt. */
  element: HTMLElement
  /** Durable seq of the last appended user message. */
  seq: number
  text: string
  attachments: boolean
  rowTop: number
  rowBottom: number
  rowLeft: number
  rowWidth: number
  rowHeight: number
}

type ResendArgs = {
  ctx: any
  t: Translate
  sessionId: string
  promptSeq: number
  text: string
  title: string | undefined
  cwd: string | undefined
}

const PENCIL_SVG =
  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="m14 6 4 4"/></svg>'

function serviceOf(ctx: any, name: string): any {
  return typeof ctx?.get === 'function' ? ctx.get(name) : ctx?.[name]
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return typeof error === 'string' ? error : String(error)
}

function sameTarget(left: PromptTarget | null, right: PromptTarget | null): boolean {
  if (left === right) return true
  if (left === null || right === null) return false
  return (
    left.seq === right.seq &&
    left.text === right.text &&
    left.attachments === right.attachments &&
    left.element === right.element &&
    Math.round(left.rowTop) === Math.round(right.rowTop) &&
    Math.round(left.rowBottom) === Math.round(right.rowBottom) &&
    Math.round(left.rowLeft) === Math.round(right.rowLeft) &&
    Math.round(left.rowWidth) === Math.round(right.rowWidth)
  )
}

/** Cache the (static) prompt text so scrolling only re-measures geometry. */
let cachedKey = ''
let cachedText = ''
let cachedAttachments = false

/** Read the last durable user bubble and its flow-item geometry. */
function readTarget(sessionId: string | null, allowOffscreen = false): PromptTarget | null {
  if (!sessionId) return null
  const body = conversationBody()
  if (body?.getAttribute('data-conversation-session') !== sessionId) return null
  const scroll = conversationScroll()
  if (!scroll) return null
  const rows = Array.from(
    scroll.querySelectorAll<HTMLElement>('[data-chat-flow-kind="user"], [data-chat-flow-kind="steering"]'),
  )
  const last = rows[rows.length - 1]
  if (!last || last.getAttribute('data-chat-flow-kind') !== 'user') return null
  if (last.hasAttribute('data-submission-echo') || last.querySelector('[data-submission-echo]')) return null
  if (!isVisible(last)) return null

  const key =
    last.getAttribute('data-chat-flow-key') ??
    last.getAttribute('data-chat-anchor-key') ??
    ''
  const match = /^(\d+):/.exec(key)
  if (!match) return null
  const seq = Number(match[1])
  if (!Number.isSafeInteger(seq) || seq < 0) return null

  const cacheKey = `${sessionId}:${seq}`
  if (cacheKey !== cachedKey) {
    cachedText = readableText(last)
    cachedAttachments = last.querySelector('[data-message-attachments], img') !== null
    cachedKey = cacheKey
  }
  if (!cachedText.trim()) return null

  const rowRect = last.getBoundingClientRect()
  if (rowRect.width === 0 || rowRect.height === 0) return null
  if (!allowOffscreen && (rowRect.bottom < 40 || rowRect.top > window.innerHeight - 20)) return null

  return {
    element: last,
    seq,
    text: cachedText,
    attachments: cachedAttachments,
    rowTop: rowRect.top,
    rowBottom: rowRect.bottom,
    rowLeft: rowRect.left,
    rowWidth: rowRect.width,
    rowHeight: rowRect.height,
  }
}

/**
 * Find the seq just before the turn's input was enqueued. A normal send lands
 * an `agent/inbox/spliced` event carrying the prompt immediately before
 * `turn/start`; cutting before that splice removes both the durable user
 * message and its queued inbox copy. Fallbacks move the prompt itself out of
 * the child and let the Host's fork repair close any open turn.
 */
async function findForkBoundary(sessions: any, sessionId: string, promptSeq: number): Promise<number> {
  if (promptSeq <= 1) return 0
  let boundary = promptSeq - 1
  try {
    await sessions.using(sessionId, { source: 'dshEnhanceEditResend' }, async (reference: any) => {
      try {
        await reference.binding.session.loadThrough?.(promptSeq)
      } catch {
        // The loaded window may already cover the prompt.
      }
      const entries = reference.binding.eventSource?.getSnapshot?.()?.entries ?? []
      const events = entries
        .filter((entry: any) => entry?.type === 'event')
        .map((entry: any) => entry.event)

      let promptEvent: any
      for (const event of events) {
        if (event?.type !== 'user/message' || event?.data?.source?.kind !== 'user') continue
        if (Number(event.seq) === promptSeq) {
          promptEvent = event
          break
        }
        if (Number(event.seq) <= promptSeq) promptEvent = event
      }
      const messageId = promptEvent?.data?.id === undefined ? undefined : String(promptEvent.data.id)

      let spliceSeq: number | undefined
      let turnStart: number | undefined
      for (const event of events) {
        if (event?.type === 'turn/start' && Number(event.seq) <= promptSeq) {
          turnStart = Number(event.seq)
        }
        if (event?.type !== 'agent/inbox/spliced' || messageId === undefined) continue
        const inserted = Array.isArray(event.data?.inserted) ? event.data.inserted : []
        const carriesPrompt = inserted.some(
          (item: any) => String(item?.id ?? item?.message?.id ?? '') === messageId,
        )
        if (carriesPrompt && (spliceSeq === undefined || Number(event.seq) < spliceSeq)) {
          spliceSeq = Number(event.seq)
        }
      }

      if (spliceSeq !== undefined) boundary = Math.max(0, spliceSeq - 1)
      else if (turnStart !== undefined) boundary = Math.max(0, turnStart - 1)
    })
  } catch {
    // Fall back to the boundary immediately before the user message.
  }
  return boundary
}

async function resendEditedPrompt(args: ResendArgs): Promise<boolean> {
  const { ctx, t, sessionId, promptSeq, text, title, cwd } = args
  const sessions = serviceOf(ctx, 'sessions')
  const workspace = serviceOf(ctx, 'uiWorkspace')
  const workspaces = serviceOf(ctx, 'workspaces')
  if (typeof sessions?.using !== 'function') throw new Error('session service unavailable')
  const summary = sessions.list?.getSnapshot?.()?.byId?.[sessionId]
  if (summary?.running === true) throw new Error(t('edit.running'))

  const boundary = await findForkBoundary(sessions, sessionId, promptSeq)
  let childId: string
  if (boundary > 0) {
    childId = await sessions.fork({ sessionId, atSeq: boundary, increaseTitle: false })
  } else {
    if (!cwd) throw new Error(t('edit.noWorkspace'))
    childId = await sessions.create({ cwd })
  }

  await sessions.using(childId, { source: 'dshEnhanceEditResend' }, async (reference: any) => {
    if (typeof title === 'string' && title.trim()) {
      try {
        await reference.binding.session.rename(title)
      } catch {
        // The child already inherits the source title on the fork path.
      }
    }
    const result = await reference.binding.session.prompt([{ type: 'text', text }], 'queue')
    if (result?.ok !== true) throw new Error(result?.error?.message ?? 'prompt rejected')
  })

  try {
    await sessions.refresh?.()
  } catch {
    // The child is addressable even when the list refresh fails.
  }
  if (typeof workspace?.openSession !== 'function') throw new Error('workspace service unavailable')
  workspace.openSession(childId)

  let archived = false
  if (typeof workspaces?.archiveSession === 'function') {
    try {
      await workspaces.archiveSession(sessionId)
      archived = true
    } catch {
      // Keep the child open; the source remains in the list.
    }
  }
  return archived
}

export function EditLastPrompt({ t, ctx, sessionId, sessions }: EditPromptProps) {
  const summary = sessionId ? sessions?.byId?.[sessionId] : undefined
  const running = summary?.running === true
  const blank = summary?.blank === true
  const subagent = summary?.origin === 'subagent'

  const [target, setTarget] = useState<PromptTarget | null>(null)
  const [open, setOpen] = useState(false)
  const [openSeq, setOpenSeq] = useState<number | null>(null)
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [editorHeight, setEditorHeight] = useState(220)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const editElementRef = useRef<HTMLElement | null>(null)
  const previousMinHeightRef = useRef('')
  const pencilRef = useRef<HTMLButtonElement | null>(null)
  const openRef = useRef<() => void>(() => {})

  useEffect(() => {
    if (!sessionId || running || blank || subagent) {
      pencilRef.current?.remove()
      setTarget(null)
      if (open) {
        setOpen(false)
        setOpenSeq(null)
      }
      return
    }

    let frame = 0
    let disposed = false
    const removePencil = () => pencilRef.current?.remove()

    const scan = () => {
      if (disposed) return
      const next = readTarget(sessionId, openSeq !== null)
      if (openSeq !== null && (next === null || next.seq !== openSeq)) {
        setOpen(false)
        setOpenSeq(null)
      }
      setTarget(previous => (sameTarget(previous, next) ? previous : next))

      if (next !== null && !open) {
        const actions = next.element.querySelector<HTMLElement>('[data-clock]')
        if (actions !== null) {
          let pencil = pencilRef.current
          if (pencil === null) {
            pencil = document.createElement('button')
            pencil.type = 'button'
            pencil.className = 'dsh-fx-edit-icon'
            pencil.innerHTML = PENCIL_SVG
            pencil.addEventListener('click', event => {
              event.preventDefault()
              event.stopPropagation()
              openRef.current()
            })
            pencilRef.current = pencil
          }
          pencil.title = t('edit.cta')
          pencil.setAttribute('aria-label', t('edit.cta'))
          if (pencil.parentElement !== actions) actions.appendChild(pencil)
        } else {
          removePencil()
        }
      } else {
        removePencil()
      }

      // React may replace the flow item's inline style while editing; restore
      // the reserved space (the original value is restored on close).
      if (open && next !== null && editElementRef.current === next.element) {
        if (next.element.style.minHeight !== `${editorHeight}px`) {
          next.element.style.minHeight = `${editorHeight}px`
        }
      }
    }

    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        scan()
      })
    }

    scan()
    const observer = new MutationObserver(schedule)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden', 'data-chat-flow-key', 'data-chat-flow-kind'],
    })
    document.addEventListener('scroll', schedule, true)
    window.addEventListener('resize', schedule)
    const resize = new ResizeObserver(schedule)
    const body = conversationBody()
    if (body) resize.observe(body)
    return () => {
      disposed = true
      observer.disconnect()
      document.removeEventListener('scroll', schedule, true)
      window.removeEventListener('resize', schedule)
      resize.disconnect()
      removePencil()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [sessionId, running, blank, subagent, open, openSeq, editorHeight, t])

  // Reserve the message row's height so the following turn visibly moves down
  // while the editor replaces the bubble.
  useEffect(() => {
    if (!open) return
    const element = editElementRef.current
    if (!element) return
    element.style.minHeight = `${editorHeight}px`
    const heightObserver = new MutationObserver(() => {
      if (element.style.minHeight !== `${editorHeight}px`) {
        element.style.minHeight = `${editorHeight}px`
      }
    })
    heightObserver.observe(element, { attributes: true, attributeFilter: ['style'] })
    const frame = window.requestAnimationFrame(() => {
      element.scrollIntoView({ block: 'center', behavior: 'auto' })
    })
    return () => {
      heightObserver.disconnect()
      window.cancelAnimationFrame(frame)
      element.style.minHeight = previousMinHeightRef.current
    }
  }, [open, editorHeight, openSeq])

  useEffect(() => {
    if (!open) return
    const textarea = textareaRef.current
    if (!textarea) return
    const frame = window.requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(textarea.value.length, textarea.value.length)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  const close = () => {
    if (busy) return
    setOpen(false)
    setOpenSeq(null)
    setDraft('')
  }

  const openEditor = () => {
    if (!target) return
    const height = Math.min(480, Math.max(210, Math.round(target.rowHeight) + 100))
    setEditorHeight(height)
    editElementRef.current = target.element
    previousMinHeightRef.current = target.element.style.minHeight
    setDraft(target.text)
    setOpenSeq(target.seq)
    setOpen(true)
    setBusy(false)
  }
  openRef.current = openEditor

  const submit = async () => {
    if (!target || openSeq === null || busy || !sessionId) return
    const text = draft.trim()
    if (!text) {
      enhanceStore.notify(t('edit.empty'))
      return
    }
    if (sessions?.byId?.[sessionId]?.running === true) {
      enhanceStore.notify(t('edit.running'))
      return
    }
    const current = sessions?.byId?.[sessionId]
    setBusy(true)
    try {
      const archived = await resendEditedPrompt({
        ctx,
        t,
        sessionId,
        promptSeq: openSeq,
        text,
        title: typeof current?.title === 'string' ? current.title : undefined,
        cwd: typeof current?.cwd === 'string' ? current.cwd : undefined,
      })
      enhanceStore.notify(archived ? t('edit.done') : t('edit.doneKept'))
      setOpen(false)
      setOpenSeq(null)
      setDraft('')
    } catch (error) {
      enhanceStore.notify(t('edit.failed', { message: errorMessage(error) }))
    } finally {
      setBusy(false)
    }
  }

  if (!open || !target) return null

  const left = Math.max(8, target.rowLeft)
  const width = Math.max(220, Math.min(target.rowWidth, window.innerWidth - left - 8))
  const top = Math.max(8, Math.min(target.rowTop, window.innerHeight - editorHeight - 8))

  return createPortal(
    <div
      className="dsh-fx-edit-inline"
      style={{ top, left, width, height: editorHeight }}
      role="dialog"
      aria-label={t('edit.title')}
      data-dsh-enhance-edit-root=""
      onKeyDown={event => {
        event.stopPropagation()
        if (event.key === 'Escape') {
          event.preventDefault()
          close()
          return
        }
        if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
          event.preventDefault()
          void submit()
        }
      }}
    >
      <textarea
        ref={textareaRef}
        className="dsh-fx-edit-inline-input"
        value={draft}
        readOnly={busy}
        placeholder={t('edit.placeholder')}
        aria-label={t('edit.placeholder')}
        onChange={event => setDraft(event.target.value)}
      />
      <footer className="dsh-fx-edit-inline-foot">
        {target.attachments ? (
          <span className="dsh-fx-edit-inline-warn">{t('edit.attachments')}</span>
        ) : (
          <span className="dsh-fx-edit-inline-spacer" />
        )}
        <button type="button" className="dsh-fx-edit-inline-cancel" disabled={busy} onClick={close}>
          {t('edit.cancel')}
        </button>
        <button
          type="button"
          className="dsh-fx-edit-inline-send"
          disabled={busy || !draft.trim()}
          onClick={() => void submit()}
        >
          {busy ? t('edit.sending') : t('edit.send')}
        </button>
      </footer>
    </div>,
    document.body,
  )
}
