---
external: false
title: FlipperFinance — Personal Finance Automation
description: A personal finance automation that pulls transactions from my bank, Venmo, and Splitwise into Notion every morning, categorizes them with AI, and emails me a weekly digest.
date: 2026-03-01
---

#### The Problem

I already tracked my finances in Notion, but I was doing it manually — logging into Bank of America once a week, copying transactions over, guessing at categories, and trying to reconcile whatever was in Splitwise. It took long enough that I'd procrastinate it, which defeated the point.

The other headache was Splitwise. When I paid for dinner and split it with a friend, both the full card charge and my share of the expense showed up separately — double-counting every split. I had a manual color-coded system for handling this. It was not a good system.

#### What It Does Now

Every morning at 7 AM, a GitHub Actions cron job pulls transactions from Bank of America and Venmo via [Plaid](https://plaid.com), fetches shared expenses from Splitwise, runs each one through GPT-4o mini to categorize it, and upserts everything into my Notion database. New transactions appear, duplicates get updated — I don't touch any of it.

The Splitwise reconciliation was the most satisfying part to solve. When I paste a Splitwise expense ID onto a Bank of America row, the next sync fetches my actual share and writes it into a `My Share` column. Budget views use that instead of the full amount. Double-counting solved.

Every Monday I get an email with a week-over-week spending comparison, an AI-written summary of notable trends, and a month-to-date breakdown by category. I actually read it now.

#### Tech Stack

- **Bank data:** Plaid API (Bank of America + Venmo)
- **Shared expenses:** Splitwise API
- **Storage + UI:** Notion API
- **AI categorization:** OpenRouter → GPT-4o mini
- **Email digest:** Nodemailer + Gmail
- **Scheduling:** GitHub Actions cron
- **Language:** TypeScript + ts-node
