import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const required = [
  'lib/index.js',
  'lib/client.js',
  'lib/types/index.d.ts',
  'lib/types/client/index.d.ts',
  'cordis.patch.yml',
  'package.json',
]
const missing = required.filter(file => !existsSync(`${root}${file}`))
if (missing.length) {
  console.error(`missing build artifacts: ${missing.join(', ')}`)
  process.exit(1)
}

const client = readFileSync(`${root}lib/client.js`, 'utf8')
if (!client.startsWith('window.__ModuleLoader__.load({')) {
  console.error('lib/client.js is not a Module Loader factory registration')
  process.exit(1)
}
if (!client.includes('id: "dsh-enhance"')) {
  console.error('lib/client.js registers the wrong module id')
  process.exit(1)
}
if (!client.includes('return module.exports;')) {
  console.error('lib/client.js factory does not return its exports')
  process.exit(1)
}

const host = readFileSync(`${root}lib/index.js`, 'utf8')
if (!host.includes('export') || !host.includes('apply')) {
  console.error('lib/index.js does not export apply')
  process.exit(1)
}

const pkg = JSON.parse(readFileSync(`${root}package.json`, 'utf8'))
if (pkg.name !== 'dsh-enhance' || pkg.dsh?.bundle?.patch !== './cordis.patch.yml') {
  console.error('package.json dsh bundle declaration is incomplete')
  process.exit(1)
}
if (pkg.dsh?.client?.platform !== 'web' || pkg.dsh?.client?.inject?.length < 3) {
  console.error('package.json dsh client declaration is incomplete')
  process.exit(1)
}

console.log(`OK: dsh-enhance ${pkg.version} (client ${client.length} bytes)`)
