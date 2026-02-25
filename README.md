# Damir Andrijanic — Portfolio

Premium 2026 portfolio site: bilingual (EN/DE), four case studies (Hausheld, Nexus AI, Croatia 360, CRM), origin story, skills, and about. Built with Next.js 15, Tailwind, next-intl, and Framer Motion.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **next-intl** (EN/DE)
- **next-themes** (dark/light)
- **Framer Motion**

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You’ll be redirected to `/en`. Use the header to switch to `/de`.

## Build

```bash
npm run build
npm start
```

## Deploy (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Build and deploy (default Next.js settings).
3. Optionally add a custom domain (e.g. damir-andrijanic.com).

## Content

- **Copy**: `messages/en.json` and `messages/de.json`.
- **Hausheld**: Add a link to your GDPR doc and export the README mermaid diagram to `public/hausheld-architecture.png` if you want the image on the case study page.
- **Links**: Update GitHub and live project URLs in the Header and ProjectCard (or move to config).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to default locale |
| `/[locale]` (`en`, `de`) | Home: hero, projects, skills, about |
| `/[locale]/projects/hausheld` | Hausheld deep-dive |
