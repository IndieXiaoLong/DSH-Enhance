/**
 * Browser half of dsh-enhance.
 *
 * `shell.overlay` paints the message timeline, the floating quick panel, the
 * new-conversation dialog, and the toast surface. The slot is declared by
 * another package, so it is attached through `slots.inject()` and survives
 * declaration collapse/restore.
 */
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import { createElement } from 'react'
import { NS, en, zh } from './locales'
import styles from './styles.css'
import { enhanceStore } from './store'
import { installFileDrag } from './file-drag'
import { OverlayRoot } from './overlay'

export const inject = ['slots', 'locale']

let styleElement: HTMLStyleElement | null = null

function installStyles(): void {
  if (styleElement?.isConnected) return
  if (document.querySelector('style[data-plugin-css="dsh-enhance"]')) return
  const element = document.createElement('style')
  element.dataset.plugin = 'dsh-enhance'
  element.dataset.pluginCss = 'dsh-enhance'
  element.textContent = styles
  document.head.appendChild(element)
  styleElement = element
}

export function apply(ctx: Context): void {
  installStyles()

  const fallbackTranslate = ctx.locale.bind(NS as never) as unknown as (
    key: string,
    params?: Record<string, unknown>,
  ) => string

  ctx.effect(
    () => ctx.locale.register(NS as never, { en, zh } as never),
    'dsh-enhance: locale dictionaries',
  )

  ctx.effect(() => {
    enhanceStore.start()
    return () => enhanceStore.stop()
  }, 'dsh-enhance: local settings store')

  ctx.effect(() => installFileDrag(ctx, fallbackTranslate), 'dsh-enhance: file drag references')

  const slots = ctx.slots as any

  ctx.effect(
    () =>
      slots.inject('shell.overlay', () =>
        slots.register(
          {
            name: 'shell.overlay',
            id: 'dsh-enhance.root',
            order: 900,
            locale: NS,
          },
          (props: any) =>
            createElement(OverlayRoot, {
              t: props.t ?? fallbackTranslate,
              useSessions: props.useSessions,
              ctx,
            }),
        ),
      ),
    'dsh-enhance: overlay surface',
  )
}
