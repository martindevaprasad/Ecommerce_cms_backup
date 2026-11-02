# Venus — The Photography Company

Single-page site for an Indian wedding photography studio. Next.js 16 (App Router), GSAP + ScrollTrigger, Lenis smooth scroll.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project** → import the repository.
3. Set **Root Directory** to `venus-photography` (the app lives in this subfolder). Vercel detects Next.js; leave build settings at their defaults.
4. Deploy.

### Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Once a custom domain is attached | Canonical origin for metadata, Open Graph, `robots.txt` and `sitemap.xml`, e.g. `https://venusphotography.in`. Without it, Vercel's production URL is used. |

## Content

All copy, contact details and photo IDs live in `src/lib/data.ts`. Photos are Pexels placeholders loaded straight from the Pexels CDN (`src/lib/imageLoader.ts`), so they don't use Vercel image-optimisation quota.

### Before launch

- Replace placeholder phone, email, address, couple names, testimonials and journal entries in `src/lib/data.ts`.
- Swap Pexels photos for Venus' own work.
- Connect the inquiry form (`src/components/Inquiry.tsx`) to email or a CRM — it currently only shows a thank-you message.
- Replace the film teasers in `src/components/Films.tsx` with YouTube/Vimeo embeds when the films are online.
