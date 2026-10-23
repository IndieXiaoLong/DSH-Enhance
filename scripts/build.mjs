import { rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const root = fileURLToPath(new URL('..', import.meta.url))
rmSync(`${root}lib`, { recursive: true, force: true })
mkdirSync(`${root}lib/types/client`, { recursive: true })

const external = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/*',
]

// Browser half: one Module Loader factory registration.
const client = await build({
  absWorkingDir: root,
  entryPoints: ['src/client/index.ts'],
  bundle: true,
  write: false,
  platform: 'browser',
  format: 'cjs',
  target: ['es2022'],
  jsx: 'automatic',
  external,
  loader: { '.css': 'text' },
  legalComments: 'none',
  logLevel: 'warning',
})

const body = client.outputFiles[0].text
const wrapped = `window.__ModuleLoader__.load({
  id: "dsh-enhance",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
${body}
    return module.exports;
  }
});
`
writeFileSync(`${root}lib/client.js`, wrapped)

// Host half: a no-op ESM plugin that keeps the package on the Loader.
await build({
  absWorkingDir: root,
  entryPoints: ['src/index.ts'],
  outfile: 'lib/index.js',
  bundle: false,
  platform: 'node',
  format: 'esm',
  target: ['node20'],
  logLevel: 'warning',
})

writeFileSync(
  `${root}lib/types/index.d.ts`,
  `/** Host half: registers the conversation-move command used by the browser drag. */\nexport declare function apply(ctx: import('@deepseek-ai/cordis').Context): void\n`,
)
writeFileSync(
  `${root}lib/types/client/index.d.ts`,
  `/** Browser half: Cordis service injections. */\nexport declare const inject: string[]\n/** Register the overlay and header-action surfaces. */\nexport declare function apply(ctx: import('@deepseek-ai/cordis').Context): void\n`,
)

console.log('built lib/index.js and lib/client.js')
