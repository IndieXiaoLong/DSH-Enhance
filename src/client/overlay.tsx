import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { enhanceStore } from './store'
import { useCurrentConversation, useEnhanceState } from './hooks'
import { NamedBlankSessionTitles, NewSessionNamer } from './new-session-namer'
import { TimelineRail } from './timeline'
import { EditLastPrompt } from './edit-resend'
import {
  IconClose,
  IconPencil,
  IconSparkle,
  IconTimeline,
  IconTurns,
} from './icons'

type Translate = (key: string, params?: Record<string, unknown>) => string

type OverlayProps = {
  t: Translate
  useSessions: any
  ctx: any
}

const VERSION = '0.1.0'

export function OverlayRoot({ t, useSessions, ctx }: OverlayProps) {
  const state = useEnhanceState()
  const sessionId = useCurrentConversation()
  const sessions = useSessions(snapshot => snapshot)

  return (
    <>
      <NamedBlankSessionTitles sessions={sessions} />
      <NewSessionNamer t={t} ctx={ctx} enabled={state.settings.nameNewSession} />
      <TimelineRail t={t} sessionId={sessionId} enabled={state.settings.timeline} />
      <EditLastPrompt t={t} ctx={ctx} sessionId={sessionId} sessions={sessions} />
      <FloatingTools t={t} state={state} />
      <Toast />
    </>
  )
}

type FloatingToolsProps = {
  t: Translate
  state: ReturnType<typeof useEnhanceState>
}

function FloatingTools({ t, state }: FloatingToolsProps) {
  const [open, setOpen] = useState(false)
  const [drag, setDrag] = useState<{ right: number; bottom: number } | null>(null)
  const dragRef = useRef<{ right: number; bottom: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const suppressClick = useRef(false)
  const pointer = useRef<{ x: number; y: number; right: number; bottom: number; moved: boolean } | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const rawPosition = drag ?? state.settings.ball
  const position = {
    right: Math.max(4, Math.min(rawPosition.right, window.innerWidth - 56)),
    bottom: Math.max(4, Math.min(rawPosition.bottom, window.innerHeight - 56)),
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Node && panelRef.current && panelRef.current.contains(target)) return
      if (target instanceof Element && target.closest('[data-dsh-enhance-ball]')) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer, true)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer, true)
    }
  }, [open])

  const spaceAbove = window.innerHeight - position.bottom - 56
  const spaceBelow = position.bottom - 56
  const panelAbove = spaceAbove >= spaceBelow && spaceAbove >= 260
  const panelStyle = {
    right: Math.min(position.right, Math.max(8, window.innerWidth - 328)),
    maxHeight: Math.max(220, Math.min(window.innerHeight * 0.78, panelAbove ? spaceAbove - 12 : spaceBelow - 12)),
    ...(panelAbove
      ? { bottom: Math.min(position.bottom + 56, window.innerHeight - 120) }
      : { top: Math.max(8, window.innerHeight - position.bottom + 56) }),
  }

  return (
    <>
      <button
        type="button"
        data-dsh-enhance-ball=""
        className={`dsh-fx-ball${open ? ' is-open' : ''}${dragging ? ' is-dragging' : ''}`}
        style={{ right: position.right, bottom: position.bottom }}
        aria-label={t('panel.title')}
        aria-expanded={open}
        title={t('panel.title')}
        onPointerDown={event => {
          if (event.button !== 0) return
          suppressClick.current = false
          try {
            event.currentTarget.setPointerCapture(event.pointerId)
          } catch {
            // Synthetic pointers (tests) may not be capturable.
          }
          pointer.current = {
            x: event.clientX,
            y: event.clientY,
            right: position.right,
            bottom: position.bottom,
            moved: false,
          }
        }}
        onPointerMove={event => {
          const start = pointer.current
          if (!start) return
          const dx = event.clientX - start.x
          const dy = event.clientY - start.y
          if (!start.moved && Math.abs(dx) + Math.abs(dy) < 5) return
          start.moved = true
          setDragging(true)
          const next = {
            right: Math.max(4, start.right - dx),
            bottom: Math.max(4, start.bottom - dy),
          }
          dragRef.current = next
          setDrag(next)
        }}
        onPointerUp={event => {
          const start = pointer.current
          pointer.current = null
          if (!start) return
          try {
            event.currentTarget.releasePointerCapture?.(event.pointerId)
          } catch {
            // The pointer may already be released.
          }
          if (start.moved) {
            suppressClick.current = true
            if (dragRef.current) enhanceStore.setBall(dragRef.current)
            dragRef.current = null
            setDrag(null)
            setDragging(false)
          }
        }}
        onPointerCancel={() => {
          pointer.current = null
          dragRef.current = null
          setDrag(null)
          setDragging(false)
        }}
        onClick={() => {
          if (suppressClick.current) {
            suppressClick.current = false
            return
          }
          setOpen(value => !value)
        }}
      >
        {open ? <IconClose size={18} /> : <IconSparkle size={19} />}
      </button>

      {open ? (
        <div ref={panelRef} className="dsh-fx-panel" style={panelStyle} role="dialog" aria-label={t('panel.title')}>
          <header className="dsh-fx-panel-head">
            <span className="dsh-fx-panel-mark" aria-hidden="true">
              <IconSparkle size={16} />
            </span>
            <div className="dsh-fx-panel-heading">
              <strong>{t('panel.title')}</strong>
              <span>{t('panel.subtitle')}</span>
            </div>
            <button
              type="button"
              className="dsh-fx-icon-button"
              aria-label={t('panel.close')}
              title={t('panel.close')}
              onClick={() => setOpen(false)}
            >
              <IconClose size={15} />
            </button>
          </header>

          <section className="dsh-fx-panel-section">
            <div className="dsh-fx-panel-row">
              <span className="dsh-fx-panel-label">{t('panel.width')}</span>
              <output className="dsh-fx-panel-value">{state.settings.widthRem}rem</output>
            </div>
            <input
              className="dsh-fx-range"
              type="range"
              min={38}
              max={90}
              step={1}
              value={state.settings.widthRem}
              aria-label={t('panel.width')}
              onChange={event => enhanceStore.setWidth(Number(event.target.value))}
            />
            <div className="dsh-fx-panel-hint">
              {t('panel.widthHint', { value: state.settings.widthRem })}
            </div>
            <div className="dsh-fx-panel-actions">
              <button
                type="button"
                className="dsh-fx-button"
                onClick={() => enhanceStore.setWidth(48)}
              >
                {t('panel.widthReset')}
              </button>
            </div>
          </section>

          <section className="dsh-fx-panel-section">
            <ToggleRow
              icon={<IconTimeline size={16} />}
              label={t('panel.timeline')}
              hint={t('panel.timelineHint')}
              checked={state.settings.timeline}
              onChange={value => enhanceStore.patchSettings({ timeline: value })}
            />
            <ToggleRow
              icon={<IconTurns size={16} />}
              label={t('panel.hideNativeTurnNav')}
              hint={t('panel.hideNativeTurnNavHint')}
              checked={state.settings.hideNativeTurnNav}
              onChange={value => enhanceStore.patchSettings({ hideNativeTurnNav: value })}
            />
            <ToggleRow
              icon={<IconPencil size={16} />}
              label={t('panel.nameNewSession')}
              hint={t('panel.nameNewSessionHint')}
              checked={state.settings.nameNewSession}
              onChange={value => enhanceStore.patchSettings({ nameNewSession: value })}
            />
          </section>

          <footer className="dsh-fx-panel-foot">
            <span>{t('panel.version', { version: VERSION })}</span>
            <button
              type="button"
              className="dsh-fx-link"
              onClick={() => {
                enhanceStore.resetBall()
                setDrag(null)
              }}
            >
              {t('panel.resetBall')}
            </button>
          </footer>
        </div>
      ) : null}
    </>
  )
}

function ToggleRow({
  icon,
  label,
  hint,
  checked,
  onChange,
}: {
  icon: ReactNode
  label: string
  hint: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <button
      type="button"
      className="dsh-fx-toggle-row"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span className="dsh-fx-toggle-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="dsh-fx-toggle-text">
        <strong>{label}</strong>
        <small>{hint}</small>
      </span>
      <span className={`dsh-fx-switch${checked ? ' is-on' : ''}`} aria-hidden="true">
        <span />
      </span>
    </button>
  )
}

function Toast() {
  const message = useSyncExternalStore(
    enhanceStore.subscribe,
    () => enhanceStore.toast,
    () => enhanceStore.toast,
  )
  if (!message) return null
  return (
    <div className="dsh-fx-toast" role="status" onClick={() => enhanceStore.dismissToast()}>
      {message}
    </div>
  )
}
