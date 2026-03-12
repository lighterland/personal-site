---
title: "Supply Chain Optimization: Reducing Late Deliveries from 57% to 19%"
slug: "supply-chain-optimization"
date: "2024-10"
status: "published"
featured: true
tags: ["SQL", "Python", "Tableau", "Supply Chain", "Logistics"]
industry: "Logistics / Supply Chain"
impact: "Self-initiated analysis using public DataCo dataset — proposed a strategy to reduce late delivery rate from 57% to 19%"
tools: ["SQL", "Python", "Pandas", "Tableau", "Chart.js"]
---

## Overview

This is a self-initiated analytical case study built on the publicly available **DataCo Smart Supply Chain Dataset** (Kaggle). The goal was to take a real-world enterprise logistics dataset and practice end-to-end problem diagnosis — from identifying root causes to producing a concrete operational roadmap.

The dataset covers 180,000+ order records from a global retail operation (2015–2017). During this period, **57% of all shipments were delayed**, correlated with a 15% decline in transactions in 2017. The analytical question: what's actually driving the delays, and what would it take to get to 19%?

---

## The Dataset

| Attribute | Detail |
|---|---|
| Source | DataCo Smart Supply Chain Dataset (Kaggle) |
| Records | 180,000+ order transactions |
| Period | 2015–2017 |
| Fields | Shipping mode, order status, stock status, scheduled vs. actual delivery |

---

## The Investigation

### Finding 1 — The Inventory Problem

Only **17% of orders** had product physically in stock at order time. The other 83% required production or backordering — adding unavoidable lead time before a shipment could even be dispatched.

This single factor accounted for an estimated **46% of all observed delays**. Orders weren't failing in transit — they were failing before the box was packed.

### Finding 2 — Shipping Mode Trap

**93% of shipments** used Standard Class (2–4 day transit). Combined with a production backlog, hitting the promised delivery date became mathematically impossible for most orders.

### Finding 3 — Planning Errors

Around **11% of shipments** that were physically capable of arriving on time were still classified as late — due to scheduling misalignment between production planning and logistics. A process error, not an operational one.

### Seasonality Signal

Order volume peaked in Q1–Q3, then fell sharply in Q4. Stock availability remained flat year-round — meaning inventory was most constrained exactly when demand was highest.

---

## The Strategy

Three interventions targeting each root cause:

**01 · Forecast-Based Inventory Loading** — shift to predictive stocking for top-volume subcategories, targeting Ready Stock from 17% → 46%.

**02 · Dynamic Logistics Upgrade** — auto-escalate shipping to Same Day / First Class when stock is unavailable at order time, compensating for production lead time.

**03 · PPIC Scheduling Reform** — align production planning and logistics lead-time assumptions, eliminating the 11% false-late classification.

---

## Projected Outcome

| Metric | Baseline | Target |
|---|---|---|
| Late Delivery Rate | 57% | 19% |
| Ready Stock Rate | 17% | 46% |
| Scheduling Error Rate | ~11% | < 2% |

The 57% → 19% reduction represents a 67% improvement in delivery reliability — the kind of shift that directly restores customer trust.

---

## Reflection

This project sharpened a specific analytical instinct: **the bottleneck is rarely where the symptom appears.** Late deliveries looked like a logistics problem. The data showed they were an inventory and planning problem. That distinction — invisible without the data — is what makes the recommendations credible rather than generic.
