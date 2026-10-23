import { useEffect, useMemo, useRef, useState } from 'react'
import { enhanceStore } from './store'
import { useEnhanceState } from './hooks'
import {
  compactText,
  hasSessionPayload,
  parseSessionIdFromDataTransfer,
  sessionIdOf,
  sessionTitleOf,
} from './dom'
import {
  IconChevronDown,
  IconChevronRight,
  IconFolderPlus,
  IconGrip,
  IconMore,
  IconPencil,
  IconTrash,
} from './icons'

type Translate = (key: string, params?: Record<string, unknown>) => string

export type FolderStripProps = {
  sessions: any
  t: Translate
  openSession: (sessionId: string) => void
}

const FOLDER_MIME = 'application/x-dsh-enhance-folder'

type SessionRow = {
  id: string
  title: string
  updatedAt: number
  blank: boolean
  origin?: string
}

function sessionRows(sessions: any, fallbackTitle: string): SessionRow[] {
  if (!sessions || !Array.isArray(sessions.ids)) return []
  const rows: SessionRow[] = []
  for (const rawId of sessions.ids) {
    const id = String(rawId)
    const session = sessions.byId?.[id]
    if (!session) continue
    if (session.origin === 'subagent') continue
    if (session.blank === true) continue
    rows.push({
      id,
      title: sessionTitleOf(session, fallbackTitle),
      updatedAt: Number(session.updatedAt) || 0,
      blank: session.blank === true,
      origin: session.origin,
    })
  }
  return rows.sort((left, right) => right.updatedAt - left.updatedAt)
}

export function FolderStrip({ sessions, t, openSession }: FolderStripProps) {
  const state = useEnhanceState()
  const [creating, setCreating] = useState(false)
  const [draft, setDraft] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editDraft, setEditDraft] = useState('')
  const [menuId, setMenuId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<string | null>(null)
  const createRef = useRef<HTMLInputElement | null>(null)
  const editRef = useRef<HTMLInputElement | null>(null)
  const stripRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (creating) createRef.current?.focus()
  }, [creating])

  useEffect(() => {
    if (editingId) {
      editRef.current?.focus()
      editRef.current?.select()
    }
  }, [editingId])

  useEffect(() => {
    if (!menuId) return
    const close = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Element && target.closest('[data-dsh-enhance-folder-menu]')) return
      setMenuId(null)
    }
    document.addEventListener('pointerdown', close, true)
    return () => document.removeEventListener('pointerdown', close, true)
  }, [menuId])

  useEffect(() => {
    if (expandedId && !state.folders.some(folder => folder.id === expandedId)) setExpandedId(null)
  }, [expandedId, state.folders])

  useEffect(() => {
    const onFocusFolder = (event: Event) => {
      const id = (event as CustomEvent<string>).detail
      if (!id || !state.folders.some(folder => folder.id === id)) return
      setExpandedId(id)
      stripRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
    window.addEventListener('dsh-enhance:focus-folder', onFocusFolder as EventListener)
    return () => window.removeEventListener('dsh-enhance:focus-folder', onFocusFolder as EventListener)
  }, [state.folders])

  const rows = useMemo(() => sessionRows(sessions, t('common.untitled')), [sessions, t])

  const filedByFolder = useMemo(() => {
    const map = new Map<string, SessionRow[]>()
    for (const row of rows) {
      const folderId = state.assignments[row.id]
      if (!folderId) continue
      const list = map.get(folderId) ?? []
      list.push(row)
      map.set(folderId, list)
    }
    return map
  }, [rows, state.assignments])

  const filedCount = Object.keys(state.assignments).filter(id => rows.some(row => row.id === id)).length
  const unfiledCount = rows.filter(row => !state.assignments[row.id]).length
  const expandedRows = expandedId ? filedByFolder.get(expandedId) ?? [] : []

  if (!state.settings.showStrip) return null

  const submitCreate = () => {
    const name = draft.trim()
    if (!name) {
      setCreating(false)
      setDraft('')
      return
    }
    const folder = enhanceStore.createFolder(name)
    setCreating(false)
    setDraft('')
    setExpandedId(folder.id)
  }

  const submitRename = (id: string) => {
    if (editDraft.trim()) enhanceStore.renameFolder(id, editDraft)
    setEditingId(null)
    setEditDraft('')
  }

  const removeFolder = (id: string, name: string) => {
    setMenuId(null)
    if (!window.confirm(t('folder.deleteConfirm', { name }))) return
    enhanceStore.deleteFolder(id)
    if (expandedId === id) setExpandedId(null)
  }

  const renderChip = (id: string, name: string, color: string, members: SessionRow[]) => {
    const active = expandedId === id
    const over = dragOver === `folder:${id}`
    return (
      <div
        key={id}
        className={`dsh-fx-chip${active ? ' is-active' : ''}${over ? ' is-over' : ''}`}
        style={{ ['--dsh-fx-color' as string]: color }}
        title={t('folder.stripHint')}
        draggable
        onDragStart={event => {
          event.dataTransfer.effectAllowed = 'move'
          event.dataTransfer.setData(FOLDER_MIME, id)
          event.dataTransfer.setData('text/plain', `folder:${id}`)
        }}
        onDragOver={event => {
          const types = Array.from(event.dataTransfer.types)
          const folderDrag = types.includes(FOLDER_MIME)
          if (!folderDrag && !hasSessionPayload(event.dataTransfer)) return
          event.preventDefault()
          event.stopPropagation()
          event.dataTransfer.dropEffect = 'move'
          if (dragOver !== `folder:${id}`) setDragOver(`folder:${id}`)
        }}
        onDragLeave={() => setDragOver(current => (current === `folder:${id}` ? null : current))}
        onDrop={event => {
          event.preventDefault()
          event.stopPropagation()
          setDragOver(null)
          const movingFolder = event.dataTransfer.getData(FOLDER_MIME)
          if (movingFolder) {
            enhanceStore.reorderFolders(movingFolder, id)
            return
          }
          const sessionId = parseSessionIdFromDataTransfer(event.dataTransfer)
          if (sessionId) {
            enhanceStore.assign(sessionId, id)
            setExpandedId(id)
          }
        }}
      >
        <button
          type="button"
          className="dsh-fx-chip-main"
          aria-pressed={active}
          onClick={() => setExpandedId(active ? null : id)}
        >
          <span className="dsh-fx-chip-dot" aria-hidden="true" />
          <span className="dsh-fx-chip-name">{name}</span>
          <span className="dsh-fx-chip-count">{members.length}</span>
        </button>
        <button
          type="button"
          className="dsh-fx-chip-more"
          aria-label={t('folder.more')}
          title={t('folder.more')}
          onClick={event => {
            event.stopPropagation()
            setMenuId(current => (current === id ? null : id))
          }}
        >
          <IconMore size={14} />
        </button>
        {menuId === id ? (
          <div className="dsh-fx-folder-menu" data-dsh-enhance-folder-menu role="menu">
            <button
              type="button"
              role="menuitem"
              onClick={event => {
                event.stopPropagation()
                setMenuId(null)
                setEditingId(id)
                setEditDraft(name)
              }}
            >
              <IconPencil size={14} />
              {t('folder.rename')}
            </button>
            <button
              type="button"
              role="menuitem"
              className="is-danger"
              onClick={event => {
                event.stopPropagation()
                removeFolder(id, name)
              }}
            >
              <IconTrash size={14} />
              {t('folder.delete')}
            </button>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <section
      ref={stripRef}
      className="dsh-fx-strip"
      data-dsh-enhance-strip=""
      aria-label={t('folder.title')}
      data-collapsed={state.settings.stripCollapsed ? 'true' : 'false'}
    >
      <header className="dsh-fx-strip-head">
        <button
          type="button"
          className="dsh-fx-icon-button"
          aria-label={state.settings.stripCollapsed ? t('folder.expand') : t('folder.collapse')}
          title={state.settings.stripCollapsed ? t('folder.expand') : t('folder.collapse')}
          onClick={() => enhanceStore.patchSettings({ stripCollapsed: !state.settings.stripCollapsed })}
        >
          {state.settings.stripCollapsed ? <IconChevronRight size={14} /> : <IconChevronDown size={14} />}
        </button>
        <span className="dsh-fx-strip-title">{t('folder.title')}</span>
        <span className="dsh-fx-strip-count">{filedCount}</span>
        <button
          type="button"
          className="dsh-fx-icon-button"
          aria-label={t('folder.new')}
          title={t('folder.new')}
          onClick={() => {
            enhanceStore.patchSettings({ stripCollapsed: false })
            setCreating(true)
          }}
        >
          <IconFolderPlus size={15} />
        </button>
      </header>

      {state.settings.stripCollapsed ? null : (
        <div className="dsh-fx-strip-body">
          {creating ? (
            <form
              className="dsh-fx-inline-form"
              onSubmit={event => {
                event.preventDefault()
                submitCreate()
              }}
            >
              <input
                ref={createRef}
                className="dsh-fx-input"
                value={draft}
                maxLength={60}
                placeholder={t('folder.name')}
                aria-label={t('folder.name')}
                onChange={event => setDraft(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Escape') {
                    setCreating(false)
                    setDraft('')
                  }
                }}
              />
              <button type="submit" className="dsh-fx-button is-primary" disabled={!draft.trim()}>
                {t('folder.create')}
              </button>
              <button
                type="button"
                className="dsh-fx-button"
                onClick={() => {
                  setCreating(false)
                  setDraft('')
                }}
              >
                {t('folder.cancel')}
              </button>
            </form>
          ) : null}

          {editingId ? (
            <form
              className="dsh-fx-inline-form"
              onSubmit={event => {
                event.preventDefault()
                submitRename(editingId)
              }}
            >
              <input
                ref={editRef}
                className="dsh-fx-input"
                value={editDraft}
                maxLength={60}
                aria-label={t('folder.name')}
                onChange={event => setEditDraft(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Escape') {
                    setEditingId(null)
                    setEditDraft('')
                  }
                }}
              />
              <button type="submit" className="dsh-fx-button is-primary" disabled={!editDraft.trim()}>
                {t('folder.save')}
              </button>
              <button
                type="button"
                className="dsh-fx-button"
                onClick={() => {
                  setEditingId(null)
                  setEditDraft('')
                }}
              >
                {t('folder.cancel')}
              </button>
            </form>
          ) : null}

          <div className="dsh-fx-chips" role="list">
            {state.folders.map(folder =>
              renderChip(folder.id, folder.name, folder.color, filedByFolder.get(folder.id) ?? []),
            )}
            <button
              type="button"
              className={`dsh-fx-chip is-unfiled${dragOver === 'unfiled' ? ' is-over' : ''}`}
              title={t('folder.unfiled')}
              onClick={() => setExpandedId(null)}
              onDragOver={event => {
                if (!hasSessionPayload(event.dataTransfer)) return
                if (Array.from(event.dataTransfer.types).includes(FOLDER_MIME)) return
                event.preventDefault()
                event.stopPropagation()
                if (dragOver !== 'unfiled') setDragOver('unfiled')
              }}
              onDragLeave={() => setDragOver(current => (current === 'unfiled' ? null : current))}
              onDrop={event => {
                event.preventDefault()
                event.stopPropagation()
                setDragOver(null)
                const sessionId = parseSessionIdFromDataTransfer(event.dataTransfer)
                if (sessionId) enhanceStore.assign(sessionId, null)
              }}
            >
              <span className="dsh-fx-chip-dot" aria-hidden="true" />
              <span className="dsh-fx-chip-name">{t('folder.unfiled')}</span>
              <span className="dsh-fx-chip-count">{unfiledCount}</span>
            </button>
          </div>

          {state.folders.length === 0 ? (
            <div className="dsh-fx-empty">
              <span>{t('folder.empty')}</span>
              <small>{t('folder.emptyHint')}</small>
            </div>
          ) : null}

          {expandedId ? (
            <div className="dsh-fx-sessions" aria-label={t('folder.open')}>
              {expandedRows.length === 0 ? (
                <div className="dsh-fx-sessions-empty">{t('folder.noSessions')}</div>
              ) : (
                expandedRows.map(row => (
                  <div
                    key={row.id}
                    className="dsh-fx-session"
                    role="button"
                    tabIndex={0}
                    draggable
                    title={row.title}
                    onClick={() => openSession(row.id)}
                    onKeyDown={event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        openSession(row.id)
                      }
                    }}
                    onDragStart={event => {
                      event.dataTransfer.effectAllowed = 'move'
                      event.dataTransfer.setData('application/x-dsh-enhance-session', row.id)
                      event.dataTransfer.setData('text/plain', `session:${row.id}`)
                    }}
                  >
                    <IconGrip size={13} />
                    <span className="dsh-fx-session-title">{compactText(row.title, 120)}</span>
                    <button
                      type="button"
                      className="dsh-fx-session-remove"
                      aria-label={t('folder.remove')}
                      title={t('folder.remove')}
                      onClick={event => {
                        event.stopPropagation()
                        enhanceStore.assign(row.id, null)
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : null}
        </div>
      )}
    </section>
  )
}
