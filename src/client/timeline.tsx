import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { compactText, conversationScroll, isVisible, readableText } from './dom'
import { IconArrowDown, IconArrowUp, IconChevronLeft, IconChevronRight } from './icons'

type Translate = (key: string, params?: Record<string, unknown>) => string

type TimelineItem = {
  element: HTMLElement
  key: string
  kind: 'user' | 'steering'
  text: string
  turn?: number
}

type Preview = { index: number; top: number; right: number }

const KINDS = ['user', 'steering'] as const

function roleLabel(t: Translate): string {
  return t('timeline.user')
}

function normalizedKind(element: HTMLElement): TimelineItem['kind'] | null {
  const kind = element.getAttribute('data-chat-flow-kind')
  if (kind === 'user' || kind === 'steering') return kind
  return null
}

/**
 * One rail mark per user/steering question. Assistant reply rows are not
 * separate marks: the reply below a question belongs to that question's turn,
 * so clicking the question mark and scrolling through the answer covers the
 * whole pair.
 */
function collectItems(): TimelineItem[] {
  const scroller = conversationScroll()
  if (!scroller) return []
  const selector = KINDS.map(kind => `[data-chat-flow-kind="${kind}"]`).join(',')
  const items: TimelineItem[] = []
  const seen = new Set<string>()
  for (const element of Array.from(scroller.querySelectorAll<HTMLElement>(selector))) {
    if (element.hasAttribute('data-chat-group-key')) continue
    if (!isVisible(element)) continue
    const kind = normalizedKind(element)
    if (!kind) continue
    const key = element.getAttribute('data-chat-flow-key') || element.dataset.chatNodeKey || ''
    if (!key || seen.has(key)) continue
    seen.add(key)
    const text = compactText(readableText(element), 260)
    if (!text) continue
    const turnValue = Number(element.getAttribute('data-chat-turn'))
    items.push({
      element,
      key,
      kind,
      text,
      ...(Number.isSafeInteger(turnValue) && turnValue > 0 ? { turn: turnValue } : {}),
    })
  }
  return items
}

function sameItems(left: TimelineItem[], right: TimelineItem[]): boolean {
  if (left.length !== right.length) return false
  for (let index = 0; index < left.length; index += 1) {
    if (left[index].key !== right[index].key || left[index].text !== right[index].text) return false
  }
  return true
}

export type TimelineProps = {
  t: Translate
  sessionId: string | null
  enabled: boolean
}

export function TimelineRail({ t, sessionId, enabled }: TimelineProps) {
  const [items, setItems] = useState<TimelineItem[]>([])
  const [active, setActive] = useState(-1)
  const [preview, setPreview] = useState<Preview | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [geometry, setGeometry] = useState<{ right: number; top: number; maxHeight: number } | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)
  const itemsRef = useRef<TimelineItem[]>([])
  itemsRef.current = items

  const measure = useCallback(() => {
    const body = document.querySelector<HTMLElement>('[data-conversation-content]')
    if (!body) {
      setGeometry(null)
      return
    }
    const rect = body.getBoundingClientRect()
    if (rect.width < 720 || rect.height < 260) {
      setGeometry(null)
      return
    }
    const right = Math.max(8, window.innerWidth - rect.right + 46)
    setGeometry({
      right,
      top: rect.top + rect.height / 2,
      maxHeight: Math.max(120, rect.height - 150),
    })
  }, [])

  const updateActive = useCallback(() => {
    const scroller = conversationScroll()
    if (!scroller) return
    const scrollerRect = scroller.getBoundingClientRect()
    const line = scrollerRect.top + 96
    let next = -1
    const current = itemsRef.current
    for (let index = 0; index < current.length; index += 1) {
      const rect = current[index].element.getBoundingClientRect()
      if (rect.top <= line) next = index
      else break
    }
    setActive(previous => (previous === next ? previous : next))
  }, [])

  useEffect(() => {
    if (!enabled) return
    let frame = 0
    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const next = collectItems()
        setItems(current => (sameItems(current, next) ? current : next))
        measure()
        updateActive()
      })
    }
    const observer = new MutationObserver(schedule)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden'],
    })
    const onScroll = () => updateActive()
    document.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', schedule)
    schedule()
    return () => {
      observer.disconnect()
      document.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [enabled, sessionId, measure, updateActive])

  useEffect(() => {
    setPreview(null)
    setItems([])
    setActive(-1)
  }, [sessionId])

  const scrollTo = useCallback((item: TimelineItem) => {
    const scroller = conversationScroll()
    if (!scroller) return
    const scrollerRect = scroller.getBoundingClientRect()
    const elementRect = item.element.getBoundingClientRect()
    const top = Math.max(0, scroller.scrollTop + elementRect.top - scrollerRect.top - 16)
    scroller.scrollTo({ top, behavior: 'smooth' })
  }, [])

  const jump = (edge: 'top' | 'bottom') => {
    const scroller = conversationScroll()
    if (!scroller) return
    scroller.scrollTo({ top: edge === 'top' ? 0 : scroller.scrollHeight, behavior: 'smooth' })
  }

  const showPreview = (index: number, anchor: HTMLElement) => {
    const rect = anchor.getBoundingClientRect()
    setPreview({
      index,
      top: Math.max(8, Math.min(rect.top - 8, window.innerHeight - 150)),
      right: Math.max(8, window.innerWidth - rect.left + 12),
    })
  }

  const activeItem = useMemo(() => (active >= 0 ? items[active] : undefined), [active, items])

  // One rail mark represents one question/answer turn: the mark is anchored
  // on the user question, and the assistant reply below it belongs to the
  // same node. The preview always answers "what did I ask?".
  const previewItem = preview ? items[preview.index] : undefined
  const previewTurn = previewItem?.turn

  useEffect(() => {
    if (!activeItem || !railRef.current) return
    const rail = railRef.current
    const dot = rail.querySelector<HTMLElement>(`[data-dsh-enhance-timeline-index="${active}"]`)
    if (!dot) return
    const railRect = rail.getBoundingClientRect()
    const dotRect = dot.getBoundingClientRect()
    if (dotRect.top < railRect.top + 16) rail.scrollTop -= railRect.top + 16 - dotRect.top
    else if (dotRect.bottom > railRect.bottom - 16) rail.scrollTop += dotRect.bottom - (railRect.bottom - 16)
  }, [active, activeItem])

  if (!enabled || items.length === 0 || !geometry) return null

  if (collapsed) {
    return (
      <button
        type="button"
        className="dsh-fx-timeline-reopen"
        style={{ right: geometry.right, top: geometry.top }}
        aria-label={t('timeline.expand')}
        title={t('timeline.expand')}
        onClick={() => setCollapsed(false)}
      >
        <IconChevronLeft size={13} />
      </button>
    )
  }

  return (
    <>
      <nav
        className="dsh-fx-timeline"
        style={{ right: geometry.right, top: geometry.top, height: geometry.maxHeight }}
        aria-label={t('timeline.label')}
      >
        <div className="dsh-fx-timeline-head">
          <button
            type="button"
            className="dsh-fx-timeline-control"
            aria-label={t('timeline.collapse')}
            title={t('timeline.collapse')}
            onClick={() => setCollapsed(true)}
          >
            <IconChevronRight size={12} />
          </button>
          <button
            type="button"
            className="dsh-fx-timeline-control"
            aria-label={t('timeline.top')}
            title={t('timeline.top')}
            onClick={() => jump('top')}
          >
            <IconArrowUp size={12} />
          </button>
        </div>
        <div className="dsh-fx-timeline-track" ref={railRef}>
          <span className="dsh-fx-timeline-line" aria-hidden="true" />
          {items.map((item, index) => (
            <button
              key={item.key}
              type="button"
              data-dsh-enhance-timeline-index={index}
              className={`dsh-fx-timeline-dot is-${item.kind}${active === index ? ' is-active' : ''}`}
              aria-label={`${roleLabel(t)} ${index + 1}`}
              aria-current={active === index ? 'true' : undefined}
              onClick={() => scrollTo(item)}
              onMouseEnter={event => showPreview(index, event.currentTarget)}
              onMouseLeave={() => setPreview(current => (current?.index === index ? null : current))}
              onFocus={event => showPreview(index, event.currentTarget)}
              onBlur={() => setPreview(null)}
            />
          ))}
        </div>
        <div className="dsh-fx-timeline-foot">
          <button
            type="button"
            className="dsh-fx-timeline-control"
            aria-label={t('timeline.bottom')}
            title={t('timeline.bottom')}
            onClick={() => jump('bottom')}
          >
            <IconArrowDown size={12} />
          </button>
        </div>
      </nav>
      {preview ? (
        <div
          className="dsh-fx-timeline-preview"
          style={{ top: preview.top, right: preview.right }}
          role="tooltip"
        >
          <div className="dsh-fx-preview-head">
            <span className={`dsh-fx-preview-dot is-${previewItem?.kind ?? 'user'}`} />
            <strong>{roleLabel(t)}</strong>
            {previewTurn ? (
              <span className="dsh-fx-preview-turn">
                {t('timeline.turn', { turn: previewTurn })}
              </span>
            ) : null}
          </div>
          <p>{previewItem?.text}</p>
        </div>
      ) : null}
    </>
  )
}
