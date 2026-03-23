---
title: "Fraud Detection System at NovaPay"
slug: "novapay-fraud-detection"
date: "2025-02"
status: "published"
featured: false
tags: ["Python", "Random Forest", "Chi-Square Test", "Mann-Whitney U", "Feature Engineering", "EDA"]
industry: "Fintech / Digital Payments"
impact: "Built an end-to-end fraud detection system — from statistical EDA proving behavioral velocity is the true fraud signal, to a Random Forest model achieving 89% precision and 100% recall"
tools: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Chi-Square Test", "Mann-Whitney U Test"]
---

## Problem

NovaPay's fraud monitoring system flagged **32% of all transactions** as potentially fraudulent throughout 2023. With **USD 1.6 million** in confirmed fraud out of $4.9M total, the team needed answers: which signals actually drive fraud, which features are adding noise, and can a predictive model replace the static rule-based system — achieving >80% precision while maintaining near-perfect recall?

This project covers the full journey: from statistical decomposition of the fraud signal to production-ready machine learning deployment with adaptive monitoring.

## Dataset

- **50,000 transaction records** across 5 global cities (London, Mumbai, New York, Sydney, Tokyo)
- **8,963 unique users** with 21 features per transaction
- Key fields: transaction amount, device type, location, transaction type, failed transaction count (7-day window), risk score, authentication fraud rate, distance, time of day

## Method

1. **Data profiling** — Assessed distributions, null rates, and cardinality across all 21 features
2. **Temporal analysis** — Plotted monthly fraud flag rates to detect trends or seasonality
3. **Chi-Square testing** — Applied to categorical features to test independence from fraud status
4. **Mann-Whitney U testing** — Compared numerical feature distributions between fraud and non-fraud groups
5. **Feature engineering** — Created `risk_score_bin` to replace raw risk scores, reducing outlier sensitivity
6. **Random Forest modeling** — Built two model variants and compared precision, recall, and accuracy
7. **Adaptive threshold design** — Created quarterly monitoring system to detect silent model drift

## Result

Proved that behavioral velocity (failed transaction attempts, risk scores) — not demographics — drives fraud detection. Built a Random Forest model (Model 2) with 89% precision and 100% recall, selected over an overfit 99%-precision Model 1. Designed a quarterly adaptive threshold system for production monitoring.

## Impact

- Statistically confirmed 3 of 6 monitored features provide **no fraud discrimination** (p > 0.05)
- Identified `failed_transaction_count_7d` as the strongest behavioral signal (**3× gap**)
- Delivered a model exceeding the >80% precision target (**89% precision, 100% recall**)
- Eliminated false negatives: **zero missed fraud cases**
- Designed **quarterly adaptive threshold** monitoring to prevent model drift

## Lessons Learned

Two key takeaways: First, the features that seem most intuitive (location, device, time) were statistically useless — evidence-driven monitoring always outperforms intuition. Second, a 99% model isn't always better than an 89% one. Model 1 was brittle despite its metrics; Model 2 sacrificed 10 points of precision for dramatically better generalization. In production ML, robustness beats perfection.
