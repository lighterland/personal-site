---
title: "Logistics Cost Optimization Analysis"
slug: "logistics-cost-optimization"
date: "2024-03"
status: "published"
featured: true
tags: ["Python", "SQL", "Power BI", "Logistics"]
industry: "Supply Chain"
impact: "Identified ~$68K in potential annual cost savings across carrier contracts and route optimization — conducted during my role at Laku6"
tools: ["Python", "SQL", "Power BI", "Excel"]
---

## Context

This analysis was carried out during my time as **Operations Data Analyst at Laku6 (Carousell Group)**, Indonesia's leading second-hand electronics distribution platform. Laku6 handles the full lifecycle of pre-owned devices — acquisition, grading, refurbishment, and redistribution — making logistics cost control a critical part of the business. Rising operational costs across the delivery network were eroding margins, and regional decisions were being made without a unified data view.

## Dataset

- **Source:** Internal ERP system (SAP) + manual weekly reports
- **Volume:** 1.2M+ shipment records over 24 months
- **Key fields:** Route ID, origin/destination region, shipment weight, cost per kg, delivery time, carrier, fuel surcharge, handling fee
- **Limitations:** 8% of records had incomplete cost data; regional reporting formats were inconsistent

## Method

1. **Data extraction:** Queried SAP using custom SQL scripts, joining 4 operational tables
2. **Data cleaning:** Python (pandas) to standardize regional codes, fill gaps using median imputation by route group
3. **Feature engineering:** Calculated cost-per-km, cost-per-kg, on-time rate, and carrier efficiency score per route
4. **Exploratory analysis:** Compared regional cost distributions using box plots and correlation matrices
5. **Pattern detection:** Flagged routes where cost exceeded regional median by >30% (anomaly detection)
6. **Visualization:** Built Power BI dashboard with drill-down capability by region, carrier, and time period

## Analysis

The analysis revealed that 14% of routes were responsible for 41% of total cost overruns. Three root causes emerged:

- **Carrier concentration risk:** Two carriers held 60% of volume on high-cost routes with no renegotiation in 3 years
- **Empty return trips:** 22% of outbound deliveries had no matching return load, generating pure overhead
- **Route redundancy:** 8 city pairs were served by overlapping routes from different depots

```python
# Cost distribution by carrier and region
cost_summary = (
    df.groupby(['region', 'carrier'])
    .agg(
        avg_cost_per_kg=('cost_per_kg', 'mean'),
        total_spend=('total_cost', 'sum'),
        shipment_count=('shipment_id', 'count'),
        on_time_rate=('on_time', 'mean')
    )
    .reset_index()
    .sort_values('total_spend', ascending=False)
)
```

## Visualization

The Power BI dashboard included:
- **Heatmap:** Cost per kg by region and carrier
- **Trend line:** Monthly cost vs. volume ratio (efficiency trend)
- **Anomaly table:** Top 20 route outliers with cost deviation and recommended action
- **Executive summary page:** 4 KPI cards + drill-through to granular data

## Result

- Dashboard deployed to 5 regional operations teams within 4 weeks
- Finance team used analysis to renegotiate carrier contracts — rate reduction of 8–12% on 3 key routes
- Empty return trip initiative launched, targeting 15% reduction in overhead

## Impact

- ~$68K in potential annual savings identified across carrier contracts and route optimization
- 15% projected reduction in average cost per shipment
- Dashboard adopted by 5 regional teams as primary operational reporting tool
- Reduced ad-hoc data requests to finance team by 60% (self-serve dashboard)

## Lessons Learned

Data quality was the biggest challenge. Investing 2 weeks in a robust cleaning pipeline early saved significant rework later. The breakthrough came from a simple question: *"What do our most efficient routes have in common?"* — which reframed the analysis from cost-cutting to best-practice replication.
