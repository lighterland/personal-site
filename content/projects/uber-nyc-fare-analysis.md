---
title: "Analyzing Uber Fares in NYC"
slug: "uber-nyc-fare-analysis"
date: "2024-06"
status: "published"
featured: false
tags: ["Python", "SQL", "Linear Regression", "Hypothesis Testing", "Data Visualization"]
industry: "Ride-hailing / Urban Mobility"
impact: "Identified $213K H2 revenue target gap and proposed 3-pillar strategy to reverse Lyft-driven 7.3% booking decline"
tools: ["Python", "SQL", "Linear Regression", "Looker Studio", "Hypothesis Testing"]
---

## Problem

In Q3 2014, Lyft entered the New York City ride-hailing market — and Uber felt it immediately. Gross bookings fell 7.30% and trip growth dropped 6.58% quarter-over-quarter. A forward-looking revenue model projected that without intervention, full-year 2015 revenue would decline a further 4.87% from 2014 levels.

The business question was clear: **what exactly changed, and what should Uber do about it?** This project set out to decompose the revenue decline using historical trip data, benchmark Uber's position against Lyft, and produce a data-backed roadmap to hit H2 2015 targets.

## Dataset

- **Uber Fares Dataset** (Kaggle) — 200,000 Uber rides in New York City from January 2009 to June 2015. Filtered to May 2011 onwards (post-NYC launch) for analytical accuracy.
- **Uber and Lyft Dataset (Boston, MA)** (Kaggle) — Used for competitive benchmarking on retention and driver satisfaction metrics.
- **US Holiday Dates (2004–2021)** (Kaggle) — Merged to test whether holidays significantly affect fare or trip volume.

Key fields: pickup datetime, dropoff datetime, passenger count, trip distance, pickup location (lat/lng), fare amount.

## Method

1. **Define research questions** — What drives fare amount? How has Lyft's entry impacted trip volume? What revenue target must be hit in H2 2015?
2. **Data collection & merging** — Joined the core fare dataset with holiday dates and the Lyft comparison dataset.
3. **Data cleaning** — Removed null values, filtered geographic outliers (trips starting outside NYC), and capped fare outliers above the 99th percentile.
4. **Exploratory analysis** — Time-series decomposition by hour, day, and month. Distance segmentation. Holiday and weather correlation testing.
5. **Hypothesis testing** — Two-sample t-test to determine whether Lyft's market entry statistically correlates with the drop in Uber trips.
6. **Linear regression modeling** — Built a revenue forecasting model using trip count as the primary predictor.
7. **Competitive benchmarking** — Compared Uber vs. Lyft on customer retention and driver satisfaction.

## Analysis

**Peak Demand Patterns:**
The busiest hour for both revenue and trips is **19:00 (7 PM)**, generating $57,580 from 9,266 trips. The afternoon segment (12:00–18:00) captures the highest total trips (27,952), while late-night (00:00–05:59) is the weakest at 11,511 trips.

Weekend patterns diverge sharply from weekdays — late-night and early-morning trips spike on Saturday and Sunday, creating identifiable surge windows that were not being optimally priced.

Despite initial assumptions, **holidays and weather (snow, temperature, wind) showed no statistically significant effect** on trip count or average fare amount in this dataset.

**Distance and Fare Correlation:**
- 0–2 km: 52.3% of all rides, average fare $6.48
- 2–4 km: 34.6% of all rides, average fare $10.26
- Over 4 km: 13.1% of all rides, average fare $14.27

Distance is the strongest predictor of fare amount, with a high positive correlation confirmed in the correlation matrix.

**Competitive Position:**
After Lyft's NYC launch in Q3 2014, Uber's position deteriorated on two fronts. Lyft showed a **14-percentage-point lead in customer retention** (68% vs 54%) and a **4-point lead in driver satisfaction** (52% vs 48%). These gaps, while seemingly small, compound over time through referral effects and driver quality.

**Hypothesis Test:**
A two-sample t-test yielded **p = 0.014**, which is below the α = 0.05 threshold. The null hypothesis was rejected: Lyft's NYC market entry has a statistically significant relationship with the decline in Uber's trip volume.

**Revenue Regression:**
The linear regression model produced: `Revenue = −517.05 + 8.897 × (Trips)`

To hit the H2 2015 target of $213,862, Uber needs **12,324 trips** in the second half — requiring a combination of volume growth and improved average fare per trip.

## Visualization

Four charts tell this story at a glance: the quarterly trend that isolates the Lyft impact, the hourly demand profile that reveals surge pricing opportunities, the distance breakdown that shows product mix potential, and the competitive benchmark that quantifies the gap.

## Result

The analysis confirmed that Lyft's entry was the primary external cause of Uber's NYC decline — statistically and operationally. It also surfaced three internal levers that Uber under-optimised: pricing timing (no weekend surge), product mix (low share of premium rides), and retention (14-point loyalty gap vs Lyft).

The H2 2015 revenue target of $213,862 was quantified with a predictive model, giving the business a concrete trip-volume target to plan capacity around.

## Impact

- Statistically confirmed effect of Lyft's NYC entry (p = 0.014) — moved the hypothesis from assumption to evidence
- Identified 19:00 as the peak revenue hour; weekend late-night window as an untapped surge opportunity
- Quantified a 12,324-trip requirement for H2 2015 revenue target
- Benchmarked a 14% retention gap and 4% satisfaction gap vs. Lyft — framing the loyalty problem in competitor terms

## Lessons Learned

The most important methodological lesson: **correlation is not enough — you need to show the mechanism.** The t-test confirmed Lyft mattered, but the distance and hour analyses showed *how* Uber could respond (better pricing in surge windows, product mix toward higher-fare segments). A recommendation without a mechanism is just a guess. This project was practice in structured problem decomposition: observe the symptom, isolate the cause, model the target, then propose the lever.
