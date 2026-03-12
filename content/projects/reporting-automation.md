---
title: "Automated Reporting Pipeline"
slug: "reporting-automation"
date: "2023-01"
status: "published"
featured: false
tags: ["Python", "SQL", "Power BI", "Automation"]
industry: "Logistics"
impact: "Cut weekly report creation time from 4 hours to 15 minutes — built during my role at Laku6"
tools: ["Python", "SQL", "Power BI", "Task Scheduler"]
---

## Context

This automation was built during my time as **Operations Data Analyst at Laku6 (Carousell Group)**. The operations analytics team was spending 4+ hours every Monday manually pulling data from 6 different systems, cleaning it, and assembling the weekly KPI summary for senior management. Across a lean team, this was a significant recurring cost — and it was entirely eliminatable.

## Dataset

- **Source:** 6 data sources — ERP export, two Excel trackers, a Tableau extract, a Google Sheets dashboard, and a manual email summary from finance
- **Volume:** ~50K rows per week across all sources
- **Challenge:** No single source of truth; each source used different regional codes, date formats, and KPI definitions

## Method

1. **Audit phase:** Mapped all data sources, identified overlapping fields, and built a unified data dictionary
2. **Extraction scripts:** Python (pandas + openpyxl + gspread) to pull from each source automatically
3. **Standardization layer:** Lookup tables to resolve conflicting regional codes and metric definitions
4. **Transformation:** Single SQL-style transformation script using pandas to produce a clean, analysis-ready table
5. **Output:** Auto-generated Power BI report (via Power BI REST API push dataset)
6. **Scheduling:** Windows Task Scheduler to run the pipeline every Monday at 6:00 AM

## Analysis

The key insight from auditing the manual process was that 70% of the time wasn't in the analysis — it was in the *data collection and cleaning*. The "4 hours" was almost entirely copy-paste and reformatting, not thinking.

By standardizing at the extraction layer, every downstream step became trivial.

```python
# Regional code standardization
REGION_LOOKUP = {
    'JKT': 'Jakarta', 'jkt': 'Jakarta', 'Jakarta Pusat': 'Jakarta',
    'SBY': 'Surabaya', 'sby': 'Surabaya',
    'BDG': 'Bandung', 'bdg': 'Bandung',
    # ... 40+ mappings
}

def standardize_region(code: str) -> str:
    return REGION_LOOKUP.get(str(code).strip(), 'Unknown')

df['region_clean'] = df['region_raw'].apply(standardize_region)
```

## Visualization

Before/after comparison:
- **Before:** Static 15-slide PowerPoint manually assembled each week
- **After:** Dynamic Power BI report with 4 pages, drill-through capability, and auto-refresh each Monday morning

Key report pages: Executive KPI overview, Regional Performance, Route Efficiency, Exception Alerts.

## Result

Pipeline went live in January 2023. From week 2 onward, zero manual data collection. The Monday report was ready in the inbox by 6:15 AM — before anyone arrived at the office.

The analyst team reclaimed an estimated 200+ hours per year previously spent on manual reporting.

## Impact

- Weekly report creation time: **4 hours → 15 minutes** (94% reduction)
- Error rate in KPI figures: **reduced to near-zero** (human handling eliminated)
- 200+ analyst hours per year reclaimed for actual analysis work
- Pipeline adopted as the standard reporting framework for 2 additional weekly reports

## Lessons Learned

The hardest part wasn't the code — it was getting agreement on *which* version of each metric was "correct." Building the data dictionary with stakeholders first saved weeks of downstream confusion. Documentation is not optional; it's the product.
