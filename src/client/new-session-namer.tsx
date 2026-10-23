/**
 * Name a conversation before it is created.
 *
 * ui-workspace owns the workspace row's "+" button and exposes no slot for it.
 * A capture-phase document listener therefore recognises that one button
 * structurally (the last button of a real Workspace row), prevents the native
 * click, and raises a naming dialog. Confirming creates a fresh Session
 * through the public `ctx.sessions` service, applies the title through a
 * temporary Session reference, and opens it through `ctx.uiWorkspace` exactly
 * like the native action.
 *
 * Named blank Sessions still read "New Session" in the native row until their
 * first turn; `NamedBlankSessionTitles` paints the saved title into that row
 * without touching the Session or the Host.
 */
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type {} from '@deepseek-ai/dsh-api-session-controller/client'
import { enhanceStore } from './store'
import { IconChatPlus, IconClose } from './icons'

declare module '@deepseek-ai/dsh-api-session-controller/client' {
  interface SessionReferenceSourceMap {
    /** A dsh-enhance title applied to a Session the plugin just created. */
    dshEnhanceNaming: unknown
  }
}

type Translate = (key: string, params?: Record<string, unknown>) => string

type NewSessionRequest = {
  workspaceId: string
  workspaceName: string
}

type NewSessionNamerProps = {
  t: Translate
  ctx: any
  enabled: boolean
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return typeof error === 'string' ? error : String(error)
}

function serviceOf(ctx: any, name: string): any {
  return typeof ctx?.get === 'function' ? ctx.get(name) : ctx?.[name]
}

/**
 * Recognise the workspace row's new-session button. ui-workspace renders the
 * "..." menu trigger and then the "+" button as the row's last two buttons, so
 * the last button of a real Workspace row is the one to intercept.
 */
function newSessionButton(target: EventTarget | null): { row: HTMLElement; workspaceId: string } | null {
  if (!(target instanceof Element)) return null
  const button = target.closest('button')
  if (!button) return null
  const row = button.closest<HTMLElement>('[data-row-key^="workspace:"]')
  if (!row || row.getAttribute('role') !== 'treeitem') return null
  const buttons = Array.from(row.querySelectorAll('button'))
  if (buttons[buttons.length - 1] !== button) return null
  const workspaceId = (row.getAttribute('data-row-key') ?? '').slice('workspace:'.length)
  if (!workspaceId) return null
  return { row, workspaceId }
}

/** Visible workspace label; the header row carries no other text. */
function rowLabel(row: HTMLElement): string {
  const text = (row.textContent ?? '').replace(/\s+/g, ' ').trim()
  return text || 'workspace'
}

async function renameSession(ctx: any, sessionId: string, title: string): Promise<void> {
  const sessions = serviceOf(ctx, 'sessions')
  if (!sessions?.using) throw new Error('session service unavailable')
  await sessions.using(sessionId, { source: 'dshEnhanceNaming' }, async (reference: any) => {
    const result = await reference.binding.session.rename(title)
    if (!result?.ok) throw new Error(result?.error?.message ?? 'rename failed')
  })
}

/** Match the native "+" behavior, which opens a collapsed Workspace before creating. */
function expandWorkspace(workspaceId: string): void {
  const row = document.querySelector<HTMLElement>(`[data-row-key="workspace:${CSS.escape(workspaceId)}"]`)
  if (row?.getAttribute('aria-expanded') === 'false') row.click()
}

export function NewSessionNamer({ t, ctx, enabled }: NewSessionNamerProps) {
  const [request, setRequest] = useState<NewSessionRequest | null>(null)
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    if (!enabled) return
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return
      const hit = newSessionButton(event.target)
      if (!hit) return
      event.preventDefault()
      event.stopPropagation()
      setDraft('')
      setBusy(false)
      setRequest({ workspaceId: hit.workspaceId, workspaceName: rowLabel(hit.row) })
    }
    window.addEventListener('click', onClick, true)
    return () => window.removeEventListener('click', onClick, true)
  }, [enabled])
  useEffect(() => {
    if (!request) return
    const timer = window.setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [request])

  const close = () => {
    if (busy) return
    setRequest(null)
    setDraft('')
  }

  useEffect(() => {
    if (!request) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const form = formRef.current
        if (!form) return
        const focusable = Array.from(
          form.querySelectorAll<HTMLElement>('input:not(:disabled), button:not(:disabled)'),
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement
        if (!event.shiftKey && active === last) {
          event.preventDefault()
          first.focus()
        } else if (event.shiftKey && (active === first || !form.contains(active))) {
          event.preventDefault()
          last.focus()
        }
        return
      }
      if (event.key !== 'Escape') return
      event.preventDefault()
      event.stopPropagation()
      if (!busy) {
        setRequest(null)
        setDraft('')
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [request, busy])

  const create = async (name: string) => {
    if (!request || busy) return
    const title = name.trim()
    const workspace = serviceOf(ctx, 'uiWorkspace')
    const sessions = serviceOf(ctx, 'sessions')
    if (!sessions?.create || !workspace?.openSession) {
      enhanceStore.notify(t('newSession.failed', { message: 'session services unavailable' }))
      return
    }

    setBusy(true)
    let sessionId: string
    try {
      // Same fresh Session the native workspace "+" creates; deliberately not
      // `connectWorkspace`, which would reuse an existing blank and make every
      // consecutive "+" rename that one placeholder.
      sessionId = await sessions.create({ workspaceId: request.workspaceId })
    } catch (error) {
      enhanceStore.notify(t('newSession.failed', { message: errorMessage(error) }))
      setBusy(false)
      return
    }

    setRequest(null)
    setDraft('')
    setBusy(false)

    expandWorkspace(request.workspaceId)
    try {
      workspace.openSession(sessionId)
    } catch (error) {
      enhanceStore.notify(t('newSession.failed', { message: errorMessage(error) }))
    }

    if (!title) return
    try {
      await renameSession(ctx, sessionId, title)
    } catch (error) {
      enhanceStore.notify(t('newSession.renameFailed', { message: errorMessage(error) }))
    }
  }

  if (!request) return null

  return createPortal(
    <div
      className="dsh-fx-dialog-backdrop"
      onClick={event => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <form
        ref={formRef}
        className="dsh-fx-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dsh-fx-new-session-title"
        onSubmit={event => {
          event.preventDefault()
          if (draft.trim()) void create(draft)
        }}
      >
        <header className="dsh-fx-dialog-head">
          <span className="dsh-fx-dialog-mark" aria-hidden="true">
            <IconChatPlus size={18} />
          </span>
          <div className="dsh-fx-dialog-heading">
            <strong id="dsh-fx-new-session-title">{t('newSession.title')}</strong>
            <span>{t('newSession.subtitle', { workspace: request.workspaceName })}</span>
          </div>
          <button
            type="button"
            className="dsh-fx-icon-button"
            aria-label={t('newSession.cancel')}
            title={t('newSession.cancel')}
            disabled={busy}
            onClick={close}
          >
            <IconClose size={15} />
          </button>
        </header>

        <label className="dsh-fx-dialog-label" htmlFor="dsh-fx-new-session-name">
          {t('newSession.name')}
        </label>
        <input
          id="dsh-fx-new-session-name"
          ref={inputRef}
          className="dsh-fx-dialog-input"
          value={draft}
          maxLength={80}
          disabled={busy}
          placeholder={t('newSession.placeholder')}
          onChange={event => setDraft(event.target.value)}
        />
        <p className="dsh-fx-dialog-hint">{t('newSession.hint')}</p>

        <footer className="dsh-fx-dialog-foot">
          <button type="button" className="dsh-fx-link" disabled={busy} onClick={() => void create('')}>
            {t('newSession.skip')}
          </button>
          <span className="dsh-fx-dialog-spacer" />
          <button type="button" className="dsh-fx-button" disabled={busy} onClick={close}>
            {t('newSession.cancel')}
          </button>
          <button type="submit" className="dsh-fx-button is-primary" disabled={busy || !draft.trim()}>
            {busy ? t('newSession.creating') : t('newSession.create')}
          </button>
        </footer>
      </form>
    </div>,
    document.body,
  )
}

/**
 * Show a named blank Session's saved title in its native sidebar row. The
 * native row intentionally paints the localized "New Session" placeholder
 * until the first turn, so this decoration is removed as soon as the Session
 * stops being blank.
 */
export function NamedBlankSessionTitles({ sessions }: { sessions: any }) {
  const sessionsRef = useRef(sessions)
  sessionsRef.current = sessions

  const applyRef = useRef<() => void>(() => {})

  applyRef.current = () => {
    const snapshot = sessionsRef.current
    for (const row of document.querySelectorAll<HTMLElement>('[data-row-key^="session:"]')) {
      const sessionId = (row.getAttribute('data-row-key') ?? '').slice('session:'.length)
      const session = sessionId ? snapshot?.byId?.[sessionId] : undefined
      const title = typeof session?.title === 'string' ? session.title.trim() : ''
      let titleSpan: HTMLElement | null = null
      if (session?.blank === true && title) {
        for (const child of Array.from(row.children)) {
          if (child.tagName === 'SPAN' && (child.textContent ?? '').trim()) {
            titleSpan = child as HTMLElement
            break
          }
        }
      }
      if (titleSpan) {
        titleSpan.setAttribute('data-dsh-enhance-title', title)
      } else {
        for (const node of row.querySelectorAll('[data-dsh-enhance-title]')) {
          node.removeAttribute('data-dsh-enhance-title')
        }
      }
    }
  }

  useEffect(() => {
    let frame = 0
    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        applyRef.current()
      })
    }
    schedule()
    const scope = document.querySelector('[data-slot="sidebar"]') ?? document.body
    const observer = new MutationObserver(schedule)
    observer.observe(scope, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-row-key'],
    })
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      observer.disconnect()
      for (const node of document.querySelectorAll('[data-dsh-enhance-title]')) {
        node.removeAttribute('data-dsh-enhance-title')
      }
    }
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => applyRef.current())
    return () => window.cancelAnimationFrame(frame)
  }, [sessions])

  return null
}
