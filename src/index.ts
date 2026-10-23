/**
 * Host half of dsh-enhance.
 *
 * The browser bundle owns every visible surface. This half contributes no
 * Host behavior; the empty `apply` keeps the package on the Loader so the
 * client module graph can discover and serve the browser bundle declared by
 * `dsh.client` in package.json.
 */
export function apply(): void {
  // Intentionally empty.
}
