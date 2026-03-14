---
title: "TheLook eCommerce: Revenue & Retention Optimization"
slug: "thelook-ecommerce-analysis"
date: "2024-04"
status: "published"
featured: false
tags: ["SQL", "BCG Matrix", "Cohort Analysis", "BigQuery", "Retention Analysis"]
industry: "eCommerce / Retail"
impact: "Identified 7 underperforming 'Dog' categories and August–December seasonal retention window to guide 2023 resource reallocation"
tools: ["SQL", "BigQuery", "BCG Matrix", "Cohort Analysis", "Data Visualization"]
---

## Problem

Heading into 2023, the business was at a crossroads: a potential financial crisis loomed, and leadership needed to decide where to cut, where to invest, and how to protect revenue. Two questions drove the analysis:

1. **Which product categories are dead weight?** Resources spread too thin across low-growth, low-margin categories leave no room to double down on what actually works.
2. **Why is retention so low — and is it fixable?** An average retention rate of ~7% across cohorts suggested deep-seated churn, rather than seasonal dips. Finding the pattern was the first step to reversing it.

## Dataset

The **TheLook** dataset is a fictional eCommerce clothing store developed by the Looker/Google team. While synthetic, it mirrors real eCommerce operations: customers, products, orders, inventory, logistics, and web events — clean, representative data suitable for portfolio strategy modeling and cohort behavior analysis.

Data used: two full calendar years (2021–2022) of order and customer data, covering all product categories across revenue and profit dimensions.

## Method

Three parallel analytical tracks, each answering a different business question:

1. **BCG Matrix (Category Strategy)** — Calculated Relative Market Share (RMS) and Market Growth Rate (MGR) for revenue and profit per category (2021 vs 2022). Mapped categories into four strategic quadrants: Stars, Question Marks, Cash Cows, and Dogs.
2. **Category Retention Analysis** — Used SQL to compute the percentage of repeat unique buyers vs. total unique buyers per category in 2022. Identifies which categories retain customers vs. one-and-done purchases.
3. **Cohort Analysis** — Grouped users into monthly acquisition cohorts (first purchase in 2022) and tracked their purchasing behavior across 11 subsequent months. Isolates seasonal vs. structural retention trends.

## Analysis

**BCG Matrix Results:**

Not all categories earn their shelf space. Seven categories fell into the "Dog" quadrant — low revenue market share and low growth rate — making them candidates for deprioritization or exit:

- Jumpsuits & Rompers, Leggings, Maternity, Socks, Skirts, Suits, Blazers & Jackets

High-potential categories (Stars and Question Marks) that warrant increased investment: **Sweaters, Swim, Fashion Hoodies & Sweatshirts, Suit & Sport Coats**.

**Category Retention:**

Retention rates were remarkably consistent across categories — ranging from **47.0% (Blazers & Jackets)** to **51.2% (Dresses)**. This uniformity tells an important story: the retention problem is not category-specific. It is a platform-level issue. No category is significantly better at keeping customers, which means the solution must be structural (loyalty programs, re-engagement campaigns) rather than product-specific.

**Cohort Analysis — Seasonal Pattern:**

The cohort data revealed a clear behavioral signal: **retention consistently strengthens from August through December**. The festive season (Christmas, New Year) is the single most powerful re-engagement driver in this dataset.

Customers acquired in Q1–Q2 cohorts show steep retention decay by Month 6. However, those same cohorts exhibit a notable uptick in Month 7–11 activity — aligned to the Aug–Dec window — suggesting that seasonal promotions can reactivate even dormant customers.

## Visualization

Three visual layers tell this story: the BCG scatter plot classifies 20+ categories into actionable quadrants at a glance; the retention bar chart debunks the idea that certain categories are inherently "stickier"; and the cohort chart exposes the August cliff and December recovery as a repeatable pattern.

## Result

The BCG matrix gave leadership a clear product portfolio map: seven categories to de-invest, four to accelerate. The cohort analysis replaced vague seasonality intuition with a specific intervention window — August to December — where retention campaigns would have the highest ROI.

Combined, the analysis provided a framework for a 2023 resource reallocation plan: reduce overhead in Dog categories, increase marketing spend in Stars, and time loyalty initiatives to the proven August–December retention window.

## Impact

- Identified **7 "Dog" categories** for deprioritization — freeing budget for higher-growth segments
- Confirmed **4 Star/Question Mark categories** as investment priorities (Swim, Sweaters, Fashion Hoodies, Sport Coats)
- Found that retention is **platform-wide**, not category-specific — redirecting the loyalty strategy from SKU-level to customer-level
- Pinpointed **August–December** as the peak retention window — enabling more precise seasonal campaign timing

## Lessons Learned

The BCG matrix taught me that strategy frameworks are only as good as the data feeding them. The temptation is to draw the quadrant lines arbitrarily — but anchoring RMS and MGR calculations to real revenue deltas (2021 vs 2022) gave the quadrants actual meaning.

The retention analysis reinforced a counterintuitive truth: **uniformly bad numbers are actually more informative than mixed ones.** If one category had 70% retention and another had 20%, the strategy would target the low performer. When all categories sit at 47–51%, the data is telling you: the problem isn't in the product, it's in the platform. That distinction changed the direction of the recommendation entirely.
