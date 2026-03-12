---
title: "Indonesia's Macroeconomic Journey: GDP, Inflation & Unemployment (2000–2025)"
slug: "indonesia-macro-analysis"
date: "2025-03"
status: "published"
featured: true
tags: ["Python", "OLS Regression", "Econometrics", "Statistics", "Chart.js"]
industry: "Academic Research / Economics"
impact: "25-year macroeconomic study revealing inflation as the dominant driver of unemployment — R² = 0.596 — with policy implications for emerging market stability"
tools: ["Python", "Pandas", "OLS Regression", "Chart.js", "World Bank Open Data", "BPS Indonesia"]
---

## The Question

Indonesia has lived through more macroeconomic shocks in 25 years than most countries experience in a generation: the tail end of the 1998 Asian Financial Crisis, aggressive fuel subsidy cuts in 2005, the 2008 Global Financial Crisis, and a COVID-19 recession in 2020. Yet through most of it, the economy kept growing.

This raises a genuinely interesting analytical question: **what actually drives unemployment in Indonesia — is it GDP growth, inflation, or something else entirely?**

This project set out to answer that question empirically, using publicly available macroeconomic data from 2000 to 2025.

---

## The Data

Two primary sources were used, for deliberate reasons:

| Variable | Source | Rationale |
|---|---|---|
| GDP Growth (%) | World Bank Open Data | International consistency, comparable baseline |
| Inflation Rate (%) | World Bank Open Data | CPI-based, widely used for cross-country analysis |
| Unemployment Rate (%) | Statistics Indonesia (BPS) | Sakernas national labour survey; accounts for Indonesia's large informal sector |

The choice to use **BPS unemployment data** over World Bank/ILO estimates was deliberate. Indonesia's informal economy is substantial — street traders, smallholder farmers, gig workers — none of whom appear in standard payroll-based unemployment models. *Sakernas* captures this reality. The result is a higher, more accurate unemployment figure that reflects what's actually happening in the labour market.

---

## Descriptive Statistics

Before modelling, the data told its own story.

| Indicator | Mean | Std. Deviation | Key Observation |
|---|---|---|---|
| GDP Growth | 4.88% | 1.57 | Remarkable consistency; only one negative year (2020) |
| Inflation | 5.66% | 3.25 | High volatility — external shocks dominate |
| Unemployment | 7.08% | 1.85 | Structural decline from ~10% to under 5% over the period |

The standard deviations tell the story in miniature. GDP growth was relatively stable. Inflation was erratic — driven by external shocks, subsidy policy swings, and supply-side disruptions. Unemployment moved slowly but steadily downward, suggesting a structural transformation in the economy rather than short-term cyclical dynamics.

---

## Key Economic Periods

### 2000–2007 — Recovery and Reform

GDP bounced from 4.9% back to 6.3% as Indonesia rebuilt from the 1998 crisis. But the decade's defining event came in 2005–2006: the government slashed fuel subsidies. The result was a cost-push inflation shock, with CPI hitting approximately **13% in 2006**. Unemployment remained stubbornly high, peaking around 11% in 2005.

> **Insight:** Strong GDP growth did not prevent high unemployment when supply-side inflation was active. The two variables were largely independent in this period.

---

### 2008–2009 — Resilience During the Global Crisis

When the Global Financial Crisis hit, Indonesia's response surprised analysts. GDP only slowed to around **4.6% in 2009** — the economy never contracted. Inflation dropped sharply as commodity prices fell, and unemployment declined gradually.

The reason: unlike export-dependent economies in East Asia, Indonesia's GDP was anchored by **domestic consumption**. The global demand collapse hit Malaysia and Vietnam; Indonesia absorbed the shock domestically.

> **Insight:** Economic structure matters more than macroeconomic conditions for crisis resilience. Domestic consumption was a natural hedge.

---

### 2010–2019 — The Stable Decade

This was macroeconomic normalcy, rarely commented on because nothing dramatic happened. GDP held at 5–6%. Inflation declined steadily toward around 3% by 2019. Unemployment fell from roughly 7% to just over 5%. Bank Indonesia's inflation targeting framework had matured, and the labour market was benefiting from it.

> **Insight:** Credible monetary policy, sustained over a decade, visibly reduced both inflation volatility and unemployment.

---

### 2020 — COVID-19 Shock

The sharpest single inflection in the dataset. GDP collapsed to approximately **-2%** — Indonesia's first recession since 1998. Unemployment spiked as business closures swept through the service sector. Simultaneously, inflation fell — a demand shock rather than a supply shock.

> **Insight:** The pandemic revealed the service sector's structural vulnerability. GDP decline and unemployment rise were nearly instantaneous and severe.

---

### 2021–Present — Post-Pandemic Recovery

GDP returned to approximately 5%, inflation settled into the 2–2.5% range, and unemployment declined toward around 5% by 2024. Recovery was supported by fiscal stimulus, commodity export revenue, and Bank Indonesia's measured policy response.

> **Insight:** Indonesia's macroeconomic fundamentals proved durable. The 2020 shock was large but the recovery was orderly.

---

## The Regression Model

To formally test which variables predicted unemployment, I ran an OLS regression:

**Model:** `Unemployment = β₀ + β₁·GDP + β₂·Inflation + ε`

### Results

| Variable | Coefficient | p-value | Significance |
|---|---|---|---|
| Constant | 5.34 | 0.000 | Significant |
| GDP Growth | -0.165 | 0.313 | Not significant |
| Inflation | +0.450 | 0.000 | Strongly significant |

**R² = 0.596** — the model explains approximately 60% of unemployment variation across the 25-year period.

---

## The Correlation Matrix

| | GDP | Inflation | Unemployment |
|---|---|---|---|
| GDP | 1 | 0.23 | 0.04 |
| Inflation | 0.23 | 1 | 0.76 |
| Unemployment | 0.04 | 0.76 | 1 |

The **0.76 correlation between inflation and unemployment** was the finding that reframed the entire analysis. Higher inflation — particularly cost-push inflation driven by fuel prices, supply shocks, and subsidy policy — was consistently associated with higher unemployment.

The near-zero **0.04 correlation between GDP growth and unemployment** is the counterintuitive result. Indonesia's GDP grew steadily for most of the period, but much of that growth was capital-intensive and concentrated in sectors that didn't generate proportional employment.

---

## What the Data Says

Three conclusions emerge clearly:

**1. Inflation control is the most direct lever for employment.** Every percentage point increase in inflation was associated with roughly a 0.45 percentage point increase in unemployment, with statistical significance. Central bank credibility is not just a financial stability concern — it is a labour market policy.

**2. GDP growth alone is an unreliable employment signal.** The near-zero coefficient and non-significant p-value suggest that growth without distributional breadth does not reliably reduce unemployment in the Indonesian context.

**3. Indonesia's macroeconomic trajectory is a genuine success story.** From an economy with unemployment above 10% and double-digit inflation in the early 2000s, to one with inflation anchored around 2–3% and unemployment approaching 5% by the mid-2020s, the 25-year arc represents meaningful structural improvement.

---

## Reflection

Working with 25 years of Indonesian macroeconomic data forced me to think carefully about **what numbers actually represent**. Choosing BPS over World Bank unemployment figures wasn't a methodological technicality — it was a decision about what kind of economy I was actually analysing. Getting that right shaped every conclusion that followed.

The clearest analytical lesson: correlation matrices are often more revealing than regression coefficients. The 0.76 between inflation and unemployment told a richer story than the model's R² alone.
