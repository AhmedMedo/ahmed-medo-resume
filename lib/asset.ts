// Raw string URLs (fetch, useGLTF, <a href>) are NOT prefixed with Next's
// basePath automatically. Wrap them with this so they also work when the
// site is served from a sub-path such as GitHub Pages project sites.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
