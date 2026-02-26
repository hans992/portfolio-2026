# Damir Andrijanic — Portfolio

A modern, bilingual portfolio and professional presence for a full-stack AI engineer. Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS. Features a dark/light theme, internationalization (EN/DE), project showcases with live and repository links, a contact form with server-side email delivery, and Vercel Analytics.

**Live site:** [andrijanic.dev](https://www.andrijanic.dev)

---

## Features

- **Bilingual (EN/DE)** — Full content and UI in English and German via `next-intl`; locale switcher in the header; URL structure `/[locale]` (e.g. `/en`, `/de`).
- **Dark / light theme** — System-aware theme toggle with `next-themes`; persisted preference.
- **Hero & layout** — Scroll-driven hero, projects grid, skills, about, and contact section with fixed header and footer.
- **Projects** — Four featured projects (Hausheld, Nexus AI, Croatia 360, CRM App) with bullets, links to live demos and GitHub repos, and a full case study for Hausheld (architecture, tech stack, GDPR, shift workflow, API reference).
- **Contact form** — Client-side form (Name, Email, Project type, Message) with Zod validation and react-hook-form; POST `/api/contact` sends email via Nodemailer (Zoho Mail). Success and error toasts (Sonner). Form copy and validation messages are localized (EN/DE).
- **SEO & analytics** — Per-locale metadata, canonical URLs, hreflang, Open Graph, Twitter cards, sitemap, skip link, and Vercel Analytics for page views.

---

## Tech stack

| Category    | Technologies |
|------------|--------------|
| Framework  | Next.js 15 (App Router), React 19 |
| Language   | TypeScript |
| Styling    | Tailwind CSS, class-variance-authority |
| i18n       | next-intl |
| Theme      | next-themes |
| Motion     | Framer Motion |
| Forms      | react-hook-form, Zod, @hookform/resolvers |
| UI         | Radix UI (Label, Select, Slot), Sonner (toasts) |
| Email      | Nodemailer (Zoho SMTP) |
| Analytics  | @vercel/analytics |

---

## Project structure

```
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata, Analytics
│   ├── globals.css              # Tailwind + CSS variables (theme)
│   ├── api/contact/route.ts     # POST contact form → Zoho Mail
│   ├── [locale]/                # Locale-based routes (en, de)
│   │   ├── layout.tsx          # ThemeProvider, Header, Footer, Toaster
│   │   ├── page.tsx            # Home: Hero, Projects, Skills, About, Contact
│   │   └── projects/hausheld/  # Hausheld case study
│   └── sitemap.ts
├── components/
│   ├── ui/                      # Reusable UI (button, input, textarea, select, form, label)
│   ├── header.tsx               # Nav, locale switch, theme toggle, GitHub/LinkedIn
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── projects.tsx / project-card.tsx
│   ├── skills.tsx
│   ├── about.tsx
│   ├── contact.tsx               # Contact section + ContactForm
│   ├── contact-form.tsx          # Form with validation and toasts
│   └── theme-provider.tsx
├── i18n/
│   ├── routing.ts               # Locales, defaultLocale, localePrefix
│   └── request.ts               # getRequestConfig, messages per locale
├── messages/
│   ├── en.json
│   └── de.json
├── lib/utils.ts
├── .env.example
└── middleware.ts                 # next-intl locale routing
```

---

## Prerequisites

- **Node.js** 18+
- **npm** (or pnpm/yarn)

---

## Getting started

1. **Clone and install**

   ```bash
   git clone <repo-url>
   cd portfolio
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env.local` and set:

   | Variable | Required | Description |
   |----------|----------|-------------|
   | `EMAIL_USER` | For contact form | Full Zoho Mail address (sender and recipient). |
   | `EMAIL_APP_PASSWORD` | For contact form | Zoho [App Password](https://www.zoho.com/mail/help/adminconsole/two-factor-authentication.html#alink5) (not your account password). |
   | `NEXT_PUBLIC_SITE_URL` | Optional | Canonical base URL (e.g. `https://www.andrijanic.dev`). Defaults to `https://damir-andrijanic.com` if unset. |

   Without `EMAIL_USER` and `EMAIL_APP_PASSWORD`, the contact form API returns 503; the rest of the site runs normally.

3. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). You are redirected to `/en`. Use the header to switch language (EN/DE) or theme.

4. **Build for production**

   ```bash
   npm run build
   npm start
   ```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack). |
| `npm run build` | Production build. |
| `npm start` | Start production server. |
| `npm run lint` | Run ESLint. |

---

## Routes

| Path | Description |
|------|-------------|
| `/` | Redirects to default locale (`/en`). |
| `/[locale]` | Home: hero, projects, skills, about, contact. `locale` ∈ `en`, `de`. |
| `/[locale]/projects/hausheld` | Hausheld case study (architecture, tech stack, GDPR, API, etc.). |
| `POST /api/contact` | Contact form submission; sends email via Zoho. |

---

## Deployment (Vercel)

1. Push the repository to GitHub and [import it in Vercel](https://vercel.com/new).
2. Add environment variables in the Vercel project: `EMAIL_USER`, `EMAIL_APP_PASSWORD`, and optionally `NEXT_PUBLIC_SITE_URL`.
3. Deploy; Vercel will use the default Next.js build and run `next build`.
4. (Optional) Add a custom domain in Vercel and set `NEXT_PUBLIC_SITE_URL` to that domain.

Analytics (page views) are available in the Vercel project dashboard when using `@vercel/analytics`.

---

## Content and links

- **Copy and translations** — Edit `messages/en.json` and `messages/de.json` (nav, hero, projects, contact form, Hausheld case study, etc.).
- **Profile links** — GitHub and LinkedIn URLs are in `components/header.tsx` and `components/footer.tsx`.
- **Project links** — Live and repository URLs per project are in `components/project-card.tsx` (`projectLinks`).

---

## License

Private use. All rights reserved.
