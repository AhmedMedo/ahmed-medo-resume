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

### Styling
Tailwind theme in `tailwind.config.ts` is a dark "espresso + gold" palette (`espresso`, `cream`, `gold`, `line`). This is not the light cream/navy theme `TASK.md` describes, and the code is authoritative. Fonts (Archivo display, Instrument Sans, IBM Plex Mono) are set up in `lib/fonts.ts` and exposed as `font-display` / `font-sans` / `font-mono` through CSS variables. The README's mention of Fraunces/Inter is out of date. Scroll fade-ins use `components/AnimatedSection.tsx`. Path alias `@/*` maps to the repo root.
