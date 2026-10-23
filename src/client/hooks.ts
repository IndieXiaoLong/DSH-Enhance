import { useEffect, useState, useSyncExternalStore } from 'react'
import { enhanceStore, type EnhanceState } from './store'

export function useEnhanceState(): EnhanceState {
  return useSyncExternalStore(enhanceStore.subscribe, enhanceStore.getSnapshot, enhanceStore.getSnapshot)
}

/** Current conversation identity, kept in sync as the user navigates. */
export function useCurrentConversation(): string | null {
  const [sessionId, setSessionId] = useState<string | null>(null)
  useEffect(() => {
    const read = () => {
      const body = document.querySelector('[data-conversation-content]')
      const next = body?.getAttribute('data-conversation-session') ?? null
      setSessionId(previous => (previous === next ? previous : next))
    }
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-conversation-session'],
    })
    return () => observer.disconnect()
  }, [])
  return sessionId
}

/**
 * Insert a host node immediately before the sidebar's workspace browser and
 * return it for a React portal. Falls back to nothing when the composition
 * has no sidebar browser.
 */
export function useSidebarMount(enabled: boolean): { host: HTMLElement | null; narrow: boolean } {
  const [host, setHost] = useState<HTMLElement | null>(null)
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    if (!enabled) {
      setHost(null)
      return
    }
    const element = document.createElement('div')
    element.className = 'dsh-enhance-sidebar-mount'
    let resize: ResizeObserver | null = null
    let parent: HTMLElement | null = null
    const attach = () => {
      const slot = document.querySelector('[data-slot="sidebar.workspaces"]')
      if (!slot || !slot.parentElement) return
      if (element.nextSibling !== slot || element.parentElement !== slot.parentElement) {
        slot.parentElement.insertBefore(element, slot)
      }
      if (slot.parentElement !== parent) {
        resize?.disconnect()
        parent = slot.parentElement as HTMLElement
        resize = new ResizeObserver(() => setNarrow(parent!.clientWidth < 180))
        resize.observe(parent)
        setNarrow(parent.clientWidth < 180)
      }
      setHost(previous => (previous === element ? previous : element))
    }
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })
    attach()
    return () => {
      observer.disconnect()
      resize?.disconnect()
      element.remove()
      setHost(null)
    }
  }, [enabled])
  return { host, narrow }
}

/** True while `query` matches at least one element; used to gate frame-wide chrome. */
export function useElementPresence(query: string): boolean {
  const [present, setPresent] = useState(false)
  useEffect(() => {
    const read = () => setPresent(document.querySelector(query) !== null)
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [query])
  return present
}
