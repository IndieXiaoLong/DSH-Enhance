/**
 * Small DOM helpers shared by the folder, timeline, and export surfaces.
 * They only read DSH's stable public markers (`data-*`), never classes.
 */

export type SessionLike = {
  sessionId?: string
  id?: string
  title?: string
  blank?: boolean
  origin?: string
  updatedAt?: number
  cwd?: string
  projections?: { values?: Record<string, unknown> }
}

export function sessionIdOf(session: SessionLike): string {
  return String(session.sessionId ?? session.id ?? '')
}

export function sessionTitleOf(session: SessionLike | undefined, fallback: string): string {
  if (!session) return fallback
  const direct = typeof session.title === 'string' ? session.title.trim() : ''
  if (direct) return direct
  const projected = session.projections?.values?.title
  if (typeof projected === 'string' && projected.trim()) return projected.trim()
  return fallback
}

export function conversationScroll(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-conversation-scroll]')
}

export function conversationBody(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-conversation-content]')
}

export function currentConversationId(): string | null {
  const body = conversationBody()
  return body?.getAttribute('data-conversation-session') || null
}

export function compactText(value: string, max = 220): string {
  const text = value.replace(/\s+/g, ' ').trim()
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text
}

/** Text of an element with controls, icon glyphs, and hidden decorations removed. */
export function readableText(element: Element): string {
  const clone = element.cloneNode(true) as HTMLElement
  for (const node of clone.querySelectorAll(
    'button, [role="button"], svg, [data-actions-reveal], [data-clock], [aria-hidden="true"], script, style, noscript',
  )) {
    node.remove()
  }
  return (clone.innerText || clone.textContent || '').replace(/\n{3,}/g, '\n\n').trim()
}

export function isVisible(element: Element): boolean {
  if (element.hasAttribute('hidden')) return false
  let current: Element | null = element
  while (current) {
    if (current.hasAttribute('hidden')) return false
    current = current.parentElement
  }
  const style = window.getComputedStyle(element)
  return style.display !== 'none' && style.visibility !== 'hidden'
}

export function parseSessionIdFromDataTransfer(data: DataTransfer): string | null {
  for (const type of ['application/x-dsh-enhance-session', 'text/plain']) {
    const value = data.getData(type)
    if (!value) continue
    const match = /^session:(.+)$/.exec(value.trim())
    if (match) return match[1]
    if (type === 'application/x-dsh-enhance-session') return value.trim()
  }
  return null
}

export function hasSessionPayload(data: DataTransfer): boolean {
  return Array.from(data.types).some(
    type => type === 'application/x-dsh-enhance-session' || type === 'text/plain',
  )
}

export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  )
}
