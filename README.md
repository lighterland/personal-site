# Erland Sadana | Data & Narrative — Portfolio Website

A production-ready personal portfolio website for a Data Analyst, built with Next.js 14, TailwindCSS, Chart.js, D3.js, and Framer Motion.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | TailwindCSS 3.x |
| Charts | Chart.js 4.x + react-chartjs-2 |
| Animation | Framer Motion 11 |
| Content | gray-matter + remark (Markdown) |
| Icons | lucide-react + react-icons |
| Forms | react-hook-form |
| Email | Resend |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```bash
RESEND_API_KEY=re_xxxxxx        # From resend.com (optional — form works without it)
CONTACT_EMAIL=you@email.com     # Where contact form messages go
NEXT_PUBLIC_SITE_URL=https://sadanaerland.com
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout + SEO meta
│   ├── page.tsx            # Main single-page portfolio
│   ├── globals.css         # Design system styles
│   ├── projects/
│   │   └── [slug]/page.tsx # Dynamic project pages
│   └── api/
│       └── contact/route.ts
│
├── components/
│   ├── layout/             # Navbar, Footer, BackToTop
│   ├── sections/           # Hero, About, Snapshot, Playground, Skills,
│   │                       # Portfolio, Experience, CVViewer, Contact
│   ├── playground/         # 5 interactive data widgets
│   ├── portfolio/          # ProjectCard, ProjectGrid, ProjectLayout
│   └── ui/                 # StatCard, SkillPill, PhotoPlaceholder, SocialLinks
│
├── content/
│   ├── projects/           # Markdown project files (add new ones here!)
│   ├── experience.json     # Work history
│   └── skills.json         # Skills with proficiency scores
│
├── lib/
│   ├── projects.ts         # Markdown file parsing
│   ├── markdown.ts         # HTML renderer
│   └── utils.ts            # Shared utilities
│
└── public/
    └── cv/
        └── erland-sadana-cv.pdf
```

---

## Adding Portfolio Projects

1. Create a new file: `content/projects/your-project.md`
2. Use this frontmatter schema:

```markdown
---
title: "Project Title"
slug: "project-slug"
date: "2024-03"
status: "published"
featured: false
tags: ["Python", "SQL"]
industry: "Logistics"
impact: "One-line metric-driven impact statement"
tools: ["Python", "SQL", "Power BI"]
---

## Problem
...

## Dataset
...

## Method
...

## Analysis
...

## Result
...

## Impact
- Metric 1
- Metric 2
```

3. Commit and push — Vercel auto-deploys in ~60 seconds.

---

## Updating the CV

```bash
# Replace the file
cp ~/downloads/your-cv.pdf public/cv/erland-sadana-cv.pdf

# Commit
git add public/cv/erland-sadana-cv.pdf
git commit -m "Update CV"
git push
```

---

## Deployment

### Option A: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import repository
3. Click **Deploy**
4. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`

Every push to `main` auto-deploys.

### Option B: GitHub Pages (Static Export)

1. Update `next.config.ts`:
```js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
```

2. Install gh-pages: `npm install --save-dev gh-pages`

3. Add to `package.json` scripts:
```json
"deploy": "next build && gh-pages -d out"
```

4. Run: `npm run deploy`

5. Enable GitHub Pages (Settings → Pages → Deploy from `gh-pages` branch)

> **Note:** GitHub Pages doesn't support API routes. Replace the contact form endpoint with [Formspree](https://formspree.io) for a fully static deployment.

### Option C: Replit

1. Fork or import repo to Replit
2. Set environment variables in Replit Secrets
3. Run: `npm install && npm run dev`

---

## Customization Guide

| What to change | File |
|---|---|
| Your name & tagline | `components/sections/Hero.tsx` |
| About text | `components/sections/About.tsx` |
| Stat card numbers | `components/sections/Snapshot.tsx` |
| Work experience | `content/experience.json` |
| Skills & proficiency | `content/skills.json` |
| Social links (LinkedIn etc) | `components/ui/SocialLinks.tsx` |
| Contact email | `components/sections/Contact.tsx` |
| Brand colors | `tailwind.config.ts` + `app/globals.css` |
| Add photo | Replace `<PhotoPlaceholder>` in `Hero.tsx` with `<Image>` |

---

## License

MIT — use, modify, and deploy freely.

---

*Built with data and coffee. ☕*
