# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
cp .env.local.example .env.local   # set ANTHROPIC_API_KEY (only needed for the chat route)
npm run dev                        # http://localhost:3000
npm run build                      # must stay clean — it's the project's acceptance check
npm run lint                       # next lint (next/core-web-vitals)
```

There is no test suite. Verify changes with `npm run lint` and `npm run build`.

## Architecture

Single-page personal portfolio (Next.js 14 App Router, TypeScript, Tailwind, Framer Motion). `app/page.tsx` stacks the section components (Hero → About → Skills → Experience → Projects → Contact) with anchor-link navigation. `TASK.md` is the original build spec.

**`lib/data/resume.ts` is the single source of truth for all content.** Section components render from it, and `lib/data/knowledge-base.ts` serializes the same data to markdown for the chat system prompt. Edit resume content there, not in components.

### AI assistant "Medo" (currently disabled in the UI)
- `app/page.tsx` has the `ChatWidget` import and `<ChatWidget />` commented out ("disabled for now"). `ChatProvider` (via `app/providers.tsx`) is still mounted, and `/api/chat` still exists. Re-enable by uncommenting both lines in `page.tsx`.
- `app/api/chat/route.ts`: Node runtime; builds a system prompt from `renderKnowledgeBaseMarkdown()` that restricts answers to the resume data, then streams Claude's reply back as a plain-text `ReadableStream` (not SSE). Returns 503 with a friendly message when `ANTHROPIC_API_KEY` is unset. The model ID is hardcoded in this file.
- `lib/chat-context.tsx`: shared chat state (open/close, messages, status). Both the Hero CTA and the floating `ChatWidget` use `useChat()`. `sendMessage` sends the full history to `/api/chat` and appends decoded chunks to the last assistant message. The `status` it exposes (`idle | thinking | error`) is what drives the avatar's "active" state.
- Voice input: `hooks/useSpeechRecognition.ts` (Web Speech API; types come from `@types/dom-speech-recognition`).

### 3D avatar
- `Hero.tsx` loads `Avatar.tsx` with `next/dynamic` and `ssr: false` (Three.js is browser-only), with `AvatarLoadingSkeleton` as the loading state.
- `Avatar.tsx` sets up the R3F `Canvas` and lights, and wraps `AvatarModel` in `AvatarErrorBoundary` + `Suspense`. If `/public/models/avatar.glb` is missing or fails to parse, `AvatarFallback` (a procedural placeholder) renders instead. Keep `useGLTF` calls inside `AvatarModel` so only that subtree can suspend or throw.
- `AvatarModel.tsx` rotates the Mixamo-style arm bones out of the T-pose on load (`relaxTPose`). Bone names (`LeftArm`, `RightForeArm`, etc.) are assumed, and a different `.glb` export may need those values retuned.
- `hooks/useIdleBob.ts` does the procedural idle/active motion in `useFrame`. Both the model and the fallback use it.
- `hooks/useHeadLook.ts` (model only) turns the `Neck` + `Head` bones toward the mouse anywhere on the page. It aims from the head's projected screen position, eases back to center when the pointer leaves the window, and is off under `prefers-reduced-motion`. The model has no eye bones, so tune the angles with the constants at the top of the file.

### Styling
Tailwind theme in `tailwind.config.ts` is a dark "Violet Ink + Peach" palette with semantic tokens: `canvas` (page bg), `surface` (cards), `line`, `fg` / `fg-muted` (text), `accent` / `accent-bright` (violet), `accent-strong` (button fills only, with white text), and `spark` (peach, small highlights). Don't call the page-bg token `base`, because it collides with Tailwind's `text-base`. Use `accent` for text on `canvas`; `accent-strong` is too low-contrast for text. This is not the light cream/navy theme `TASK.md` describes, and the code is authoritative. Some colors are hard-coded outside Tailwind and must be changed by hand when retheming: `app/globals.css`, `app/icon.svg`, `components/Logo.tsx`, the lights in `components/Avatar.tsx`, and the materials in `components/AvatarFallback.tsx`.

Fonts (Bricolage Grotesque display at 600-700, Inter body, JetBrains Mono labels) are set up in `lib/fonts.ts` and exposed as `font-display` / `font-sans` / `font-mono` through CSS variables. Avoid weights above 700 and all-caps tracked labels; they were removed for readability. Tech/skill lists put a `{" "}` after each item span so they can wrap on narrow screens. Scroll fade-ins use `components/AnimatedSection.tsx`. Path alias `@/*` maps to the repo root.

Don't run `npm run build` while `npm run dev` is running: both write to `.next`, and the build breaks the dev server's CSS. Stop the dev server (or clear `.next` and restart it) afterwards.

### Deployment (GitHub Pages)
`.github/workflows/deploy.yml` builds with `STATIC_EXPORT=true` and `NEXT_PUBLIC_BASE_PATH=/<repo-name>` (see `next.config.mjs`), deletes `app/api` (server routes can't be statically exported), and publishes `out/`. Locally and on Vercel the app runs as a normal server with `/api/chat`. Raw URL strings must go through `asset()` in `lib/asset.ts`; Next only auto-prefixes `<Link>`/`next/image`/its own assets. To test the Pages build without disturbing a running dev server, build in a copy of the repo (it writes `.next`/`out`).
Fallback when Actions is blocked (billing lock): `npm run deploy:pages` (`scripts/deploy-pages.sh`) builds the static export in a temp copy and force-pushes `out/` to the `gh-pages` branch; Pages must then use "Deploy from a branch → gh-pages". `DRY_RUN=1` builds without pushing. With a branch source, the `deploy.yml` workflow's deploy job isn't used.
