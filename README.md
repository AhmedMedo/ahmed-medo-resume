# Ahmed Alaa — Portfolio

A personal developer portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS, featuring an AI chat assistant ("Medo") grounded in the real resume content, and a 3D avatar hero powered by React Three Fiber.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (scroll animations, transitions)
- React Three Fiber + drei (3D avatar)
- `@anthropic-ai/sdk` (chat backend, streamed responses)

## Getting started

```bash
npm install
cp .env.local.example .env.local
# then edit .env.local and set ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Server-side only. Powers the `/api/chat` route (Medo, the AI assistant). Get one at https://console.anthropic.com. |

The site builds and runs fine without this key — the chat widget will show a friendly "not configured yet" message instead of crashing.

## Adding your 3D avatar

The hero section expects a Ready Player Me avatar at `public/models/avatar.glb`. Until that file is added, a simple procedural placeholder is shown instead (with the same idle animation), so the site works today.

To add your own:
1. Go to https://readyplayer.me and create a custom character resembling you.
2. Export/download it as a `.glb` file.
3. Place it at `public/models/avatar.glb` (exact filename).

No code changes are needed — `components/AvatarModel.tsx` will pick it up automatically.

## Building

```bash
npm run build
npm run start
```

## Deploying to GitHub Pages

Pages only serves static files, so the workflow in `.github/workflows/deploy.yml` builds a static export (`STATIC_EXPORT=true`) and publishes `out/`. The `/api/chat` route is removed in CI only, and the chat UI is currently disabled anyway.

1. In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions** (not "Deploy from a branch").
2. Push to `main`. The **Deploy to GitHub Pages** workflow runs and publishes the site at `https://<user>.github.io/<repo>/`.

The repo sub-path is injected as `NEXT_PUBLIC_BASE_PATH`. Wrap any new raw URL strings (`fetch`, `useGLTF`, `<a href>` to files in `public/`) with `asset()` from `lib/asset.ts` so they work under the sub-path.

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the project at https://vercel.com/new.
3. In the Vercel project's **Settings → Environment Variables**, add `ANTHROPIC_API_KEY` with your Anthropic API key (Production + Preview as needed).
4. Deploy. No other configuration is required.

## Project structure

```
app/            # routes, layout, global styles, /api/chat
components/     # section components, avatar, chat widget
hooks/           # useIdleBob, useSpeechRecognition
lib/
  data/          # resume.ts (single source of truth) + knowledge-base.ts (chat context)
  chat-context.tsx  # shared chat state (Hero CTA + floating widget)
  fonts.ts       # next/font setup (Bricolage Grotesque / Inter / JetBrains Mono)
public/models/   # drop avatar.glb here
```
