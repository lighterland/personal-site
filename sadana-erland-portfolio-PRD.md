# Product Requirements Document
## Sadana Erland | Data & Narrative — Personal Portfolio Website

**Version:** 1.0  
**Author:** AI Product Team  
**Status:** Production-Ready  
**Last Updated:** March 2026

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [Target Audience](#2-target-audience)
3. [UX Strategy](#3-ux-strategy)
4. [Website Architecture](#4-website-architecture)
5. [Page Layout Specifications](#5-page-layout-specifications)
6. [Design System](#6-design-system)
7. [Portfolio Content Model](#7-portfolio-content-model)
8. [Interactive Data Playground Design](#8-interactive-data-playground-design)
9. [Technical Architecture](#9-technical-architecture)
10. [Folder Structure](#10-folder-structure)
11. [Deployment Instructions](#11-deployment-instructions)
12. [Future Extensions](#12-future-extensions)

---

## 1. Product Vision

### 1.1 Statement

> *"A portfolio that doesn't just show what Sadana has done — it demonstrates how she thinks."*

Sadana Erland's portfolio is a living, interactive document of analytical thinking. Rather than a static resume, it functions as a lightweight data product: structured, insightful, and designed to tell stories through data. Visitors should leave understanding not just Sadana's technical skills, but her ability to turn raw data into business decisions.

### 1.2 Core Brand Identity

| Element | Value |
|---|---|
| **Name** | Sadana Erland |
| **Brand Title** | Sadana Erland \| Data & Narrative |
| **Tagline** | *"Turning data into decisions."* |
| **Tone** | Confident, analytical, human |
| **Aesthetic** | Modern analytics dashboard × storytelling portfolio |

### 1.3 Design Philosophy

- **Simple over complex** — Every element earns its place
- **Data-native** — Visualizations are primary, not decorative
- **Narrative-led** — Each section tells a story
- **Interactive** — Visitors explore, not just read
- **Performance-first** — Fast load, static generation, no bloat

---

## 2. Target Audience

### 2.1 Primary Audiences

| Persona | Goal | What They Look For |
|---|---|---|
| **Technical Recruiter** | Assess skill depth | Tools, frameworks, measurable impact |
| **Hiring Manager** | Evaluate analytical thinking | Problem-solving approach, business outcomes |
| **Data Team Lead** | Gauge collaboration style | Communication, storytelling, methodology |
| **Potential Client** | Verify credibility | Past work, results, domain expertise |

### 2.2 Visitor Behavior Assumptions

- Average visit: 2–4 minutes
- Entry point: LinkedIn or referral link
- Most viewed: Hero → Summary Snapshot → Portfolio Projects → CV download
- Decision trigger: A clear, quantified impact statement within the first scroll

### 2.3 Accessibility Requirements

- WCAG 2.1 AA compliance
- Keyboard-navigable interactive elements
- `aria-label` attributes on all charts and interactive widgets
- Minimum contrast ratio: 4.5:1 for all body text

---

## 3. UX Strategy

### 3.1 Core User Journey

```
Landing → Hero (grab attention)
       → Summary Snapshot (prove impact quickly)
       → Data Playground (demonstrate thinking style)
       → Portfolio Projects (show depth)
       → Experience (validate background)
       → CV Download (convert intent)
       → Contact (close)
```

### 3.2 Scroll Strategy

The page is a **single continuous narrative**. Each section flows into the next, like chapters in a data story. Sections should feel like:

1. **Hook** — Hero: "Who is this person?"
2. **Proof** — Snapshot + Playground: "Can they actually do this?"
3. **Evidence** — Portfolio: "Here's what they've built"
4. **Context** — Experience + Skills: "Here's the full picture"
5. **Action** — CV + Contact: "Let's talk"

### 3.3 Navigation

- **Sticky top navbar** — minimal, transparent on hero, white on scroll
- **Smooth scroll anchors** — all nav items link to page sections
- **Back-to-top button** — appears after 50% scroll
- **Mobile hamburger menu** — full-screen overlay on mobile

### 3.4 Interaction Principles

- Hover states on all interactive elements
- Chart animations trigger on scroll-into-view (Intersection Observer)
- Playground widgets respond immediately to user input (< 100ms)
- Transitions: `ease-out`, 200–400ms duration
- No auto-playing animations that distract reading

---

## 4. Website Architecture

### 4.1 Page Sections (Single-Page Architecture)

```
/
├── #hero
├── #about
├── #snapshot
├── #playground
├── #skills
├── #portfolio
│   └── /projects/[slug]   ← individual project pages
├── #experience
├── #cv
└── #contact
```

### 4.2 Routes

| Route | Type | Description |
|---|---|---|
| `/` | Static page | Main portfolio page |
| `/projects/[slug]` | Dynamic static page | Individual case study |
| `/api/contact` | API route | Contact form submission |

### 4.3 Content Sources

| Content Type | Source |
|---|---|
| Projects | `/content/projects/*.md` |
| Experience | `/content/experience.json` |
| Skills | `/content/skills.json` |
| CV File | `/public/cv/sadana-erland-cv.pdf` |
| Playground Config | `/content/playground.json` |

---

## 5. Page Layout Specifications

### 5.1 Hero Section (`#hero`)

**Purpose:** Immediately communicate who Sadana is and invite exploration.

**Layout:** Full viewport height (`100vh`), centered vertically and horizontally.

**Elements:**
- Top-left or top-center: `Sadana Erland | Data & Narrative` (logo/wordmark)
- Center: Photo placeholder (circular, 160×160px — see §5.1.1)
- H1: `Sadana Erland`
- H2: `Data Analyst · Storyteller · Problem Solver`
- Paragraph (max 2 lines): Short tagline drawn from CV summary
- Social icons row: LinkedIn, GitHub, Medium (with `aria-labels`)
- CTA button: `View My Work` (smooth scroll to #portfolio)
- Secondary link: `Download CV` (opens PDF)
- Background: Subtle animated mesh/grid pattern in brand blue, very low opacity

**5.1.1 Photo Placeholder Spec:**
```html
<div class="photo-placeholder">
  <!-- Circular container, 160px diameter -->
  <!-- Background: gradient from #EBF4FF to #DBEAFE -->
  <!-- Border: 3px solid #3B82F6 -->
  <!-- Centered SVG silhouette in #93C5FD -->
  <!-- On hover: dashed border + "Upload Photo" tooltip -->
  <!-- Replace with <Image> component when photo provided -->
</div>
```

---

### 5.2 About Section (`#about`)

**Purpose:** Humanize the data. One paragraph of narrative voice.

**Layout:** 2-column on desktop (text left, decorative data visual right). Single column on mobile.

**Elements:**
- Section heading: `About`
- 3–4 paragraphs of narrative (see §5.2.1 for content)
- Right column: Animated circular chart showing "industries worked in" (donut chart, Chart.js)
- Subtle background: very light blue-gray (`#F8FAFF`)

**5.2.1 Suggested About Copy (based on CV profile — edit as needed):**
> Sadana Erland is a data analyst who believes the most powerful thing a dataset can do is change a decision. She works at the intersection of logistics, supply chain, and business intelligence — translating complex operational data into clear, actionable insights.
>
> Her approach is methodical but narrative-driven: every analysis begins with a question and ends with a recommendation. She has worked across industries including [insert from CV], building dashboards, automating reporting pipelines, and surfacing patterns that drive cost savings and efficiency gains.
>
> When she's not wrangling data, she writes about analytics and data storytelling on Medium — because the best analysis is the one that gets read.

---

### 5.3 Summary Snapshot (`#snapshot`)

**Purpose:** Give recruiters the "at a glance" view in under 30 seconds.

**Layout:** 3–4 stat cards on top, then 3-column grid below.

**Stat Cards (animated counter on scroll):**

| Metric | Value | Source |
|---|---|---|
| Years of Experience | `X+` | Calculated from CV |
| Dashboards Built | `XX+` | From CV achievements |
| Cost Savings Identified | `$X.XM` | From CV impact metrics |
| Datasets Analyzed | `XX+` | From CV projects |

> **Note to developer:** Values are placeholders. Replace with real numbers from CV. Animation: count up from 0 on first scroll-into-view using `requestAnimationFrame`.

**Below Cards — 3 Columns:**

| Column 1: Industries | Column 2: Core Skills | Column 3: Tools |
|---|---|---|
| Logistics | Exploratory Data Analysis | Python |
| Supply Chain | Dashboard Design | SQL |
| Retail / FMCG | Statistical Modeling | Power BI / Tableau |
| [from CV] | A/B Testing | Excel / Google Sheets |
| | Data Storytelling | dbt / Airflow |

---

### 5.4 Data Playground (`#playground`)

Full specification in **§8. Interactive Data Playground Design**.

**Layout:** Full-width section with dark blue background (`#0F172A`), white text. Grid of 4–5 interactive widget cards.

**Section Heading:** `Data Playground` with subtitle: *"Explore data ideas. No code required."*

---

### 5.5 Skills Section (`#skills`)

**Purpose:** Show breadth and depth without being a wall of text.

**Layout:** Tabbed interface (Languages / Tools / Capabilities).

**Tab 1 — Languages & Frameworks:**
- Python, SQL, R, DAX, M (Power Query)
- Each shown as a pill badge with proficiency dot (●●●●○)

**Tab 2 — Tools & Platforms:**
- Power BI, Tableau, Looker, Google Data Studio
- dbt, Airflow, Spark (if applicable)
- Excel, Google Sheets
- Git, GitHub, VS Code, Jupyter

**Tab 3 — Analytical Capabilities:**
- Exploratory Data Analysis (EDA)
- Dashboard Design & BI Reporting
- ETL / Data Pipeline Design
- Statistical Analysis
- Data Storytelling & Visualization
- A/B Testing & Experimentation
- Forecasting & Trend Analysis
- Data Quality & Governance

> **Note to developer:** All skill data lives in `/content/skills.json`. Proficiency scores are 1–5. Render dots programmatically.

---

### 5.6 Portfolio Projects (`#portfolio`)

Full specification in **§7. Portfolio Content Model**.

**Layout:** Card grid (2 columns desktop, 1 column mobile). Each card shows:
- Project thumbnail or auto-generated chart preview
- Title
- One-line impact statement
- Tool tags
- `Read Case Study →` link

**Section Heading:** `Portfolio` with subtitle: *"Selected work. Real data. Real impact."*

---

### 5.7 Experience (`#experience`)

**Purpose:** Show career progression in a visually clear timeline.

**Layout:** Vertical timeline, alternating left/right on desktop, left-aligned on mobile.

**Each Timeline Node:**
```
[Year Range]  [Company Name]
              [Job Title]
              [2–3 bullet achievements with metrics]
              [Tag: industry/tool]
```

**Visual Design:**
- Vertical line: `#3B82F6` (brand blue)
- Node circles: filled blue with white inner dot
- Cards: white with subtle shadow
- Hover: card lifts slightly (box-shadow increase + translate-y: -2px)

> **Note to developer:** Experience data lives in `/content/experience.json`. See schema in §9.3.

---

### 5.8 CV Viewer (`#cv`)

**Purpose:** Allow visitors to read and download the CV without leaving the page.

**Layout:** Full-width section, centered.

**Elements:**
- Section heading: `Curriculum Vitae`
- Subtitle: *"Download or read inline."*
- Scrollable PDF embed using `react-pdf` or `<iframe>`
- Download button: `⬇ Download CV (PDF)` — triggers download of `/public/cv/sadana-erland-cv.pdf`
- Viewer height: 700px on desktop, 500px on mobile
- Fallback: If PDF fails to load, show "View CV on Google Drive" link

**Implementation Note:**
```jsx
import { Document, Page } from 'react-pdf';
// OR use a simple iframe:
<iframe src="/cv/sadana-erland-cv.pdf" width="100%" height="700px" />
```

---

### 5.9 Contact Section (`#contact`)

**Purpose:** Make it easy to reach Sadana.

**Layout:** 2-column (form left, links right) on desktop.

**Left — Contact Form:**
- Fields: Name, Email, Subject (dropdown: Hiring / Collaboration / Speaking / Other), Message
- Submit button: `Send Message`
- Success state: inline confirmation message
- Connects to `/api/contact` (Next.js API route → sends via Nodemailer or Resend)

**Right — Direct Links:**
- LinkedIn icon + URL
- GitHub icon + URL
- Medium icon + URL
- Email address (with copy-to-clipboard button)

**Bottom of Page:**
- Copyright line: `© 2026 Sadana Erland. Built with data and coffee.`

---

## 6. Design System

### 6.1 Color Palette

```css
/* Primary Colors */
--color-blue-900: #1E3A5F;   /* Deep headers, dark backgrounds */
--color-blue-700: #1D4ED8;   /* Primary interactive elements */
--color-blue-600: #2563EB;   /* Hover states */
--color-blue-500: #3B82F6;   /* Brand blue, borders, accents */
--color-blue-400: #60A5FA;   /* Light accents, chart fills */
--color-blue-100: #DBEAFE;   /* Subtle backgrounds */
--color-blue-50:  #EFF6FF;   /* Page section alternates */

/* Secondary / Purple Accents */
--color-purple-600: #7C3AED;  /* Highlights, tags */
--color-purple-400: #A78BFA;  /* Subtle accents */
--color-purple-100: #EDE9FE;  /* Tag backgrounds */

/* Neutral */
--color-gray-900: #111827;   /* Body text */
--color-gray-700: #374151;   /* Secondary text */
--color-gray-400: #9CA3AF;   /* Placeholder, muted */
--color-gray-100: #F3F4F6;   /* Section backgrounds */
--color-white:    #FFFFFF;   /* Cards, hero */

/* Semantic */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error:   #EF4444;
```

### 6.2 Typography

```css
/* Font Stack */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Scale */
--text-xs:   0.75rem;   /* 12px */
--text-sm:   0.875rem;  /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg:   1.125rem;  /* 18px */
--text-xl:   1.25rem;   /* 20px */
--text-2xl:  1.5rem;    /* 24px */
--text-3xl:  1.875rem;  /* 30px */
--text-4xl:  2.25rem;   /* 36px */
--text-5xl:  3rem;      /* 48px */

/* Usage */
h1 (name):       5xl, bold, blue-900
h2 (titles):     3xl–4xl, semibold, blue-700
h3 (section):    2xl, semibold, gray-900
body:            base, regular, gray-700
caption/label:   sm, medium, gray-400
code:            sm, mono
```

### 6.3 Spacing System

Follow Tailwind's default 4px base unit: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px`

Section padding: `py-20` (80px top/bottom) on desktop, `py-12` on mobile.

### 6.4 Component Styles

#### Cards
```css
.card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-blue-100);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.card:hover {
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12);
  transform: translateY(-2px);
}
```

#### Buttons
```css
/* Primary */
.btn-primary {
  background: var(--color-blue-500);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.15s ease;
}
.btn-primary:hover { background: var(--color-blue-600); }

/* Secondary (outlined) */
.btn-secondary {
  background: transparent;
  border: 2px solid var(--color-blue-500);
  color: var(--color-blue-500);
}
```

#### Tags / Pills
```css
.tag-blue   { background: #EFF6FF; color: #1D4ED8; }
.tag-purple { background: #EDE9FE; color: #7C3AED; }
.tag-gray   { background: #F3F4F6; color: #374151; }
```

### 6.5 Iconography

Use **Lucide React** for all UI icons. Use **Simple Icons** (via `react-icons/si`) for brand logos (LinkedIn, GitHub, Medium).

### 6.6 Chart Defaults (Chart.js)

```javascript
const chartDefaults = {
  color: '#374151',
  borderColor: '#3B82F6',
  backgroundColor: 'rgba(59, 130, 246, 0.1)',
  grid: { color: '#E5E7EB', drawBorder: false },
  font: { family: 'Inter', size: 12 },
  animation: { duration: 800, easing: 'easeOutQuart' },
};
```

### 6.7 Animation Guidelines (Framer Motion)

```javascript
// Fade in on scroll
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' }
};

// Stagger children
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// Counter animation — use requestAnimationFrame, not Framer Motion
```

---

## 7. Portfolio Content Model

### 7.1 Markdown Schema

Each project lives at `/content/projects/[slug].md`.

```markdown
---
title: "Logistics Cost Optimization Analysis"
slug: "logistics-cost-optimization"
date: "2024-03"
status: "published"           # published | draft | archived
featured: true                # appears first in grid
thumbnail: "/images/projects/logistics-thumb.png"
tags: ["Python", "SQL", "Power BI", "Logistics"]
industry: "Supply Chain"
impact: "Identified $1.2M in potential annual savings"
tools: ["Python", "SQL", "Power BI", "Excel"]
---

## Problem

[1–2 paragraphs: What was the business challenge? What decision needed to be made?]

## Dataset

[Describe the data: source, volume, fields, limitations, any privacy considerations]

## Method

[Step-by-step analytical approach: how did you approach the problem?]

## Analysis

[Main findings. This is where you can embed charts or code snippets.]

<!-- Chart embed using custom MDX component -->
<InteractiveChart
  type="bar"
  data="logistics-cost-by-region"
  title="Cost Distribution by Region"
/>

<!-- Code snippet -->
```python
# Example snippet from the analysis
df.groupby('region')['cost'].agg(['mean', 'sum', 'count'])
```

## Visualization

[Description of key visuals. Embed images or interactive charts here.]

![Cost Breakdown Dashboard](/images/projects/logistics-dashboard.png)

## Result

[What happened? What was the outcome? Quantify if possible.]

## Impact

- $1.2M identified in potential annual savings
- 15% reduction in average cost per shipment
- Dashboard adopted by 3 regional teams

## Lessons Learned

[Optional: What would you do differently? What did this teach you?]
```

### 7.2 Project Card Component

```typescript
interface Project {
  title: string;
  slug: string;
  date: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  thumbnail?: string;
  tags: string[];
  industry: string;
  impact: string;
  tools: string[];
}
```

### 7.3 Portfolio Conversion Prompt Template

Use this prompt to convert existing work (slides, notebooks, articles) into portfolio case studies:

---

```
PORTFOLIO CONVERSION PROMPT
============================

I want to convert my existing work into a portfolio case study for my data analyst portfolio.

Source type: [PowerPoint / Jupyter Notebook / Medium article / SQL analysis / HTML dashboard]

Here is my source content:
[PASTE OR DESCRIBE YOUR CONTENT HERE]

Please convert this into a portfolio case study using this exact structure:

---
title: "[Descriptive project title]"
slug: "[url-friendly-slug]"
date: "[YYYY-MM]"
status: "published"
featured: [true/false]
tags: ["Tool1", "Tool2", "Industry"]
industry: "[Industry Name]"
impact: "[One-line impact statement with a metric]"
tools: ["List", "of", "tools", "used"]
---

## Problem
[1–2 paragraphs: business challenge, question being answered]

## Dataset
[Data description: source, volume, key fields]

## Method
[Analytical steps taken, numbered 1–5+]

## Analysis
[Key findings, patterns discovered]

## Visualization
[Description of charts/visuals — I will embed images later]

## Result
[Concrete outcome]

## Impact
- [Metric 1]
- [Metric 2]
- [Metric 3]

Rules:
- Be specific and quantify wherever possible
- Use past tense
- Avoid jargon without explanation
- Write for a technical recruiter who has 90 seconds
- The impact statement must contain at least one number
```

---

### 7.4 Suggested Initial Projects

Based on a typical Data Analyst CV in logistics/supply chain, suggest including:

| # | Project | Data Source | Key Visual |
|---|---|---|---|
| 1 | Logistics Cost Optimization | Internal shipment data | Cost-by-region bar chart |
| 2 | Demand Forecasting Model | Sales/inventory data | Time series with forecast band |
| 3 | Dashboard Redesign Case Study | Before/after BI dashboard | Screenshot comparison |
| 4 | Automation of Weekly Reporting | ETL pipeline / scripts | Before: 4hrs → After: 15min |
| 5 | Customer Behavior Analysis | CRM / transaction data | Segmentation scatter plot |

> Replace these with real projects from the CV. Minimum 3 case studies recommended for launch.

---

## 8. Interactive Data Playground Design

### 8.1 Overview

The Data Playground is a full-width section (`#playground`) with a dark navy background (`#0F172A`). It contains 4–5 self-contained interactive widgets, each demonstrating a different analytical concept. All widgets are client-side only — no API calls required.

**Grid Layout:** 2×2 on desktop + 1 full-width at bottom. On mobile: single column.

---

### Widget 1: Trend Simulator

**Concept:** Users adjust sliders to simulate how different parameters affect a KPI trend line.

**UI Elements:**
- Chart: Line chart (Chart.js) showing simulated monthly revenue or units sold over 12 months
- Slider 1: `Growth Rate` (0% → 30%)
- Slider 2: `Seasonality Strength` (None → Strong)
- Slider 3: `Noise Level` (Low → High)
- Live update: Chart redraws < 100ms on any slider change

**Implementation:**
```javascript
function generateTrendData(growthRate, seasonality, noise) {
  return Array.from({ length: 12 }, (_, i) => {
    const trend = 100 * Math.pow(1 + growthRate / 100, i);
    const seasonal = seasonality * 20 * Math.sin((i / 12) * 2 * Math.PI);
    const random = noise * (Math.random() - 0.5) * 30;
    return Math.round(trend + seasonal + random);
  });
}
```

**Label/Title:** `📈 Trend Simulator`
**Subtitle:** `Adjust parameters and watch the trend respond.`

---

### Widget 2: Cost Scenario Optimizer

**Concept:** A simplified logistics cost simulation. Users allocate a budget across 3 cost levers and see the projected savings.

**UI Elements:**
- 3 input sliders: `Transport Budget`, `Warehouse Budget`, `Technology Investment`
- Total budget indicator (progress bar — cannot exceed 100%)
- Output: Animated bar chart showing "Projected Cost Savings by Category"
- Savings formula (simplified, hard-coded logic): higher tech investment → lower transport costs over time

**Label/Title:** `⚙️ Cost Optimizer`
**Subtitle:** `How would you allocate the budget? See the projected impact.`

---

### Widget 3: Pattern Guesser Game

**Concept:** Show partial data, user guesses the trend, then reveal the real data.

**UI Elements:**
- Phase 1: Chart shows first 6 of 12 months of a dataset
- User clicks one of 3 "prediction" options (uptrend / flat / downtrend)
- Phase 2: Reveal animation shows remaining 6 months
- Score tracker: correct / total guesses this session
- New dataset button: cycles through 5 pre-built datasets

**Datasets (pre-built, no API):**
1. E-commerce sales with seasonal spike
2. Flat metric with sudden anomaly
3. Steady uptrend with dip
4. Cyclical pattern
5. Volatile data with underlying trend

**Label/Title:** `🎯 Trend Guesser`
**Subtitle:** `Can you predict what comes next?`

---

### Widget 4: Mini Dataset Explorer

**Concept:** A small interactive table + linked chart. Users click a row in the table to highlight it on the chart.

**Dataset:** A fictional dataset of 10 product categories with columns: Category, Revenue, Units Sold, Avg Price, YoY Growth.

**UI Elements:**
- Left: Scrollable mini-table (5 columns, 10 rows)
- Right: Bar chart that highlights selected row in blue
- Dropdown: Switch metric (Revenue / Units / YoY Growth)
- Sort buttons on each column header

**Label/Title:** `🔍 Dataset Explorer`
**Subtitle:** `Click a row to explore it. Sort to find patterns.`

---

### Widget 5: Data Story Animation (Full Width)

**Concept:** A narrated step-by-step visualization. The user presses "Next" to advance through a data story. Each step reveals a new insight.

**Story Arc (5 steps):**
1. `"Start with the raw data..."` — Shows a messy scatter plot
2. `"Identify the outliers..."` — Highlights anomaly points in red
3. `"Find the trend..."` — Draws regression line
4. `"Segment by category..."` — Colors points by group
5. `"The insight: Cluster A is 3× more efficient than Cluster B."` — Final callout

**UI Elements:**
- Full-width chart (D3.js or Chart.js scatter)
- Step counter: `Step 2 of 5`
- Progress bar
- `← Prev` / `Next →` buttons
- Narrative text box below chart (changes per step)

**Label/Title:** `📖 Data Story`
**Subtitle:** `Watch raw data become an insight. Press Next to advance.`

---

## 9. Technical Architecture

### 9.1 Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | Static generation, file-based routing, excellent performance |
| Styling | TailwindCSS 3.x | Utility-first, consistent design tokens, responsive |
| Charts | Chart.js 4.x + react-chartjs-2 | Easy integration, performant for portfolio use |
| Advanced Viz | D3.js (Widget 5 only) | Full control for custom animated narrative |
| Animation | Framer Motion 11 | Declarative, high-quality scroll/enter animations |
| Content | gray-matter + remark | Parse MDX frontmatter and render Markdown |
| PDF Viewer | react-pdf | CV viewer component |
| Icons | lucide-react + react-icons | Consistent iconography |
| Forms | react-hook-form | Contact form validation |
| Email | Resend (or Nodemailer) | Contact form delivery |

### 9.2 Key Configuration Files

**`next.config.js`**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // Static HTML export for GitHub Pages
  images: { unoptimized: true }, // Required for static export
  trailingSlash: true,
  basePath: '',              // Set to '/repo-name' if using GitHub Pages subpath
};
module.exports = nextConfig;
```

**`tailwind.config.js`**
```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          900: '#1E3A5F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
};
```

### 9.3 Data Schemas

**`/content/experience.json`**
```json
[
  {
    "id": 1,
    "company": "Company Name",
    "role": "Senior Data Analyst",
    "period": "Jan 2022 – Present",
    "location": "City, Country",
    "industry": "Logistics",
    "description": "Short role description.",
    "achievements": [
      "Built end-to-end reporting pipeline reducing report generation from 4hrs to 15min",
      "Developed logistics cost dashboard used by 5 regional teams",
      "Identified $1.2M in cost savings through route optimization analysis"
    ],
    "tools": ["Python", "SQL", "Power BI"]
  }
]
```

**`/content/skills.json`**
```json
{
  "languages": [
    { "name": "Python", "proficiency": 5, "category": "language" },
    { "name": "SQL", "proficiency": 5, "category": "language" },
    { "name": "R", "proficiency": 3, "category": "language" }
  ],
  "tools": [
    { "name": "Power BI", "proficiency": 5, "category": "tool" },
    { "name": "Tableau", "proficiency": 4, "category": "tool" }
  ],
  "capabilities": [
    "Exploratory Data Analysis",
    "Dashboard Design & BI Reporting",
    "ETL Pipeline Design",
    "Statistical Analysis",
    "Data Storytelling",
    "A/B Testing & Experimentation",
    "Forecasting & Trend Analysis"
  ]
}
```

### 9.4 Static Generation (getStaticProps)

```typescript
// app/projects/[slug]/page.tsx
import { getAllProjects, getProjectBySlug } from '@/lib/projects';

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }) {
  const project = await getProjectBySlug(params.slug);
  return <ProjectLayout project={project} />;
}
```

### 9.5 SEO Configuration

**`/app/layout.tsx`**
```typescript
export const metadata = {
  title: 'Sadana Erland | Data Analyst & Storyteller',
  description: 'Portfolio of Sadana Erland — data analyst specializing in logistics, supply chain analytics, and data storytelling.',
  openGraph: {
    title: 'Sadana Erland | Data & Narrative',
    description: 'Turning data into decisions.',
    url: 'https://sadanaerland.com',
    siteName: 'Sadana Erland Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sadana Erland | Data & Narrative',
  },
};
```

---

## 10. Folder Structure

```
sadana-portfolio/
├── public/
│   ├── cv/
│   │   └── sadana-erland-cv.pdf          # Upload CV here
│   ├── images/
│   │   ├── projects/                      # Project thumbnails
│   │   └── og-image.png                   # Social preview image
│   └── favicon.ico
│
├── content/
│   ├── projects/
│   │   ├── logistics-cost-optimization.md
│   │   ├── demand-forecasting.md
│   │   └── [add new projects here]
│   ├── experience.json
│   ├── skills.json
│   └── playground.json                    # Playground widget config/data
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                     # Root layout + metadata
│   │   ├── page.tsx                       # Main portfolio page
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx               # Individual project pages
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts               # Contact form API
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── BackToTop.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Snapshot.tsx
│   │   │   ├── Playground.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── CVViewer.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   ├── playground/
│   │   │   ├── TrendSimulator.tsx
│   │   │   ├── CostOptimizer.tsx
│   │   │   ├── PatternGuesser.tsx
│   │   │   ├── DatasetExplorer.tsx
│   │   │   └── DataStoryAnimation.tsx
│   │   │
│   │   ├── portfolio/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectGrid.tsx
│   │   │   └── ProjectLayout.tsx
│   │   │
│   │   └── ui/
│   │       ├── StatCard.tsx
│   │       ├── SkillPill.tsx
│   │       ├── TimelineItem.tsx
│   │       ├── ChartWrapper.tsx
│   │       ├── SocialLinks.tsx
│   │       └── PhotoPlaceholder.tsx
│   │
│   └── lib/
│       ├── projects.ts                    # Project file parsing utilities
│       ├── markdown.ts                    # Markdown → HTML renderer
│       └── utils.ts                       # Shared utilities
│
├── .env.local                             # RESEND_API_KEY, etc.
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 11. Deployment Instructions

### 11.1 Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account
- Vercel account (free tier is sufficient) — OR GitHub Pages enabled

---

### 11.2 Local Development Setup

```bash
# 1. Clone or initialize the project
git clone https://github.com/[your-username]/sadana-portfolio.git
cd sadana-portfolio

# 2. Install dependencies
npm install

# 3. Create local environment file
cp .env.example .env.local
# Edit .env.local and add:
# RESEND_API_KEY=re_xxxxxx (get from resend.com)
# CONTACT_EMAIL=sadana@youremail.com

# 4. Start development server
npm run dev

# 5. Open browser
# → http://localhost:3000
```

---

### 11.3 Option A: Deploy to Vercel (Recommended)

Vercel is the fastest and most reliable option. Free tier supports custom domains.

```bash
# Step 1: Push to GitHub
git add .
git commit -m "Initial portfolio build"
git push origin main

# Step 2: Connect to Vercel
# → Go to https://vercel.com/new
# → Click "Import Git Repository"
# → Select your GitHub repo
# → Click "Deploy"

# Step 3: Set environment variables in Vercel dashboard
# Project Settings → Environment Variables
# Add: RESEND_API_KEY, CONTACT_EMAIL

# Step 4: Add custom domain (optional)
# Project Settings → Domains → Add domain
# → sadanaerland.com (or any domain you own)
# → Follow DNS configuration instructions
```

**Every push to `main` will auto-deploy.** No further action needed.

---

### 11.4 Option B: Deploy to GitHub Pages

Use this option if you prefer a fully free, no-account-needed deployment.

```bash
# Step 1: Update next.config.js
# Set basePath to your repo name if not deploying to root:
# basePath: '/sadana-portfolio'

# Step 2: Install gh-pages
npm install --save-dev gh-pages

# Step 3: Add deploy script to package.json
# "scripts": {
#   "deploy": "next build && touch out/.nojekyll && gh-pages -d out"
# }

# Step 4: Build and deploy
npm run deploy

# Step 5: Enable GitHub Pages
# → GitHub repo → Settings → Pages
# → Source: Deploy from branch → gh-pages → / (root)
# → Save

# Your site will be live at:
# https://[your-username].github.io/sadana-portfolio
```

**Note:** GitHub Pages does not support Next.js API routes. If using GitHub Pages, replace the contact form with a Formspree or Netlify Forms endpoint instead.

---

### 11.5 Adding New Projects (Ongoing Maintenance)

```bash
# 1. Create a new markdown file
touch content/projects/my-new-project.md

# 2. Fill in the frontmatter and content (see §7.1 schema)

# 3. Add thumbnail image (optional)
cp ~/my-image.png public/images/projects/my-new-project.png

# 4. Commit and push
git add .
git commit -m "Add new project: My New Project"
git push origin main

# Vercel will auto-deploy within ~60 seconds.
```

---

### 11.6 Updating the CV

```bash
# Replace the PDF file
cp ~/downloads/sadana-erland-cv-2026.pdf public/cv/sadana-erland-cv.pdf

# Commit and push
git add public/cv/sadana-erland-cv.pdf
git commit -m "Update CV - March 2026"
git push origin main
```

---

### 11.7 package.json Scripts

```json
{
  "scripts": {
    "dev":    "next dev",
    "build":  "next build",
    "start":  "next start",
    "export": "next build",
    "lint":   "next lint",
    "deploy": "next build && touch out/.nojekyll && gh-pages -d out"
  }
}
```

---

## 12. Future Extensions

The following features are **not in scope for v1** but are designed to be addable without major refactoring.

### 12.1 Phase 2 Features

| Feature | Effort | Value |
|---|---|---|
| **Blog / Writing section** | Low | Medium — integrate with Medium RSS feed |
| **Dark mode** | Low | High — add `dark:` Tailwind classes + toggle |
| **Project filtering by tag** | Low | High — filter cards by tool or industry |
| **Search across projects** | Medium | Medium — use Fuse.js for client-side search |
| **Animated background (particles)** | Low | Medium — enhance hero section |
| **Analytics dashboard** | Low | High — embed a real Tableau/Power BI viz |

### 12.2 Phase 3 Features

| Feature | Effort | Value |
|---|---|---|
| **CMS integration** | High | High — connect to Sanity or Notion for no-code editing |
| **Password-protected projects** | Medium | High — for confidential client work |
| **Case study PDF export** | Medium | Medium — generate downloadable case study PDFs |
| **Interactive data upload** | High | High — allow visitors to upload their own CSV and explore |
| **Newsletter signup** | Low | Medium — connect to ConvertKit or Mailchimp |
| **Multi-language support** | High | Low (unless targeting non-English markets) |

### 12.3 Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.0s |
| Bundle Size (JS) | < 200KB gzipped |

### 12.4 Content Growth Path

```
Launch (v1):     3 projects, static content, playground widgets
Month 3 (v1.1):  Add 2 projects, enable Medium RSS blog feed
Month 6 (v1.2):  Real dashboard embed, dark mode
Year 1 (v2):     CMS-driven, filterable projects, search
```

---

## Appendix A: Environment Variables

```bash
# .env.local (never commit this file)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx     # From resend.com — for contact form
CONTACT_EMAIL=sadana@youremail.com     # Where contact form messages go
NEXT_PUBLIC_SITE_URL=https://sadanaerland.com
```

## Appendix B: Recommended npm Packages

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    "d3": "^7.9.0",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.0",
    "remark-html": "^16.0.1",
    "react-pdf": "^7.5.0",
    "react-hook-form": "^7.49.0",
    "lucide-react": "^0.383.0",
    "react-icons": "^5.0.0",
    "resend": "^3.0.0",
    "@tailwindcss/typography": "^0.5.10"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0",
    "@types/node": "^20.0.0",
    "@types/d3": "^7.4.0",
    "gh-pages": "^6.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

---

*End of PRD — Version 1.0*  
*Document ready for handoff to development.*
