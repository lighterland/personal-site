---
title: "Demand Forecasting for Retail Inventory"
slug: "demand-forecasting"
date: "2023-09"
status: "published"
featured: true
tags: ["Python", "SQL", "Tableau", "Retail"]
industry: "Retail / FMCG"
impact: "Reduced overstock incidents by approximately 30% through predictive inventory signals — conducted during my role at Laku6"
tools: ["Python", "SQL", "Tableau", "scikit-learn"]
---

## Context

This project was conducted during my time as **Operations Data Analyst at Laku6 (Carousell Group)**. As a second-hand device marketplace, Laku6's inventory dynamics are complex: demand varies by device category, condition grade, and region, while supply is inbound-driven and harder to predict than traditional retail. Overstock of lower-demand models and stockouts of high-demand ones were consistently affecting operational efficiency.

The challenge: build a reliable demand signal for key product categories across multiple warehouse zones — without sophisticated cloud infrastructure.

## Dataset

- **Source:** Point-of-sale system exports (CSV) + Google Sheets inventory logs
- **Volume:** 18 months of daily sales records, ~500K rows
- **Key fields:** Date, SKU, branch, units sold, price, stock level, promotion flag
- **Limitations:** 3 branches had gaps during a system migration; promotion data was incomplete for H1 2022

## Method

1. **Data ingestion:** Python scripts to merge and normalize CSVs from 8 branches
2. **EDA:** Seasonal decomposition using `statsmodels` — identified clear weekly and monthly cycles for 38 of 50 SKUs
3. **Feature engineering:** Lag features (7d, 14d, 30d), rolling averages, promotion flags, branch-level fixed effects
4. **Model selection:** Compared ARIMA, XGBoost, and a simple linear trend — XGBoost won on MAPE (8.3%)
5. **Output:** Weekly reorder quantity recommendations per SKU per branch
6. **Dashboard:** Tableau viz linked to weekly model output for operations team to action

## Analysis

The strongest signal came from combining lag features with day-of-week encoding. Branch-level fixed effects — capturing each branch's unique demand profile — reduced error by 12% compared to a pooled model.

```python
# Feature engineering: rolling average and lag features
df['sales_lag_7'] = df.groupby(['branch', 'sku'])['units_sold'].shift(7)
df['sales_lag_14'] = df.groupby(['branch', 'sku'])['units_sold'].shift(14)
df['rolling_avg_30'] = (
    df.groupby(['branch', 'sku'])['units_sold']
    .transform(lambda x: x.shift(1).rolling(30).mean())
)
```

The XGBoost model achieved a Mean Absolute Percentage Error (MAPE) of 8.3% on hold-out test data — compared to 19.1% MAPE from the existing manual reorder process.

## Visualization

- **Forecast vs. actual** line chart per SKU with confidence interval
- **Branch heatmap:** Stock level health by branch × SKU
- **Reorder alert table:** SKUs forecasted to fall below safety stock within 14 days
- **Model accuracy tracker:** MAPE by SKU group (stable vs. high-variance products)

## Result

The weekly reorder recommendation report replaced the manual gut-feel process. Branch managers received a Google Sheets summary auto-generated from Python each Monday morning.

Piloted across 3 branches for Q3 2023 before full rollout.

## Impact

- Overstock incidents reduced by 30% in pilot branches during Q3 2023
- Stockout events on top-20 SKUs cut by 22% in the same period
- Inventory holding cost reduced by an estimated ~15–20% annualized across pilot zones
- Model runtime: under 3 minutes on a standard laptop — no cloud infrastructure needed

## Lessons Learned

Start simple. The XGBoost model outperformed ARIMA — not because it was more sophisticated, but because the lag features captured branching patterns better than ARIMA's time-only structure. The biggest time saver was building a solid pipeline for data ingestion first, so model iteration was fast.
