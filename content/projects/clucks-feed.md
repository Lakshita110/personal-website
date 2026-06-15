---
external: false
title: Cluck's Feed — AI-Powered RSS Reader
description: A calm, keyboard-friendly RSS reader and newsletter inbox with AI-powered personalization.
date: 2026-05-01
---

![Cluck's Feed inbox view](/images/projects/clucks-feed.png)

#### Overview

Cluck's Feed is a focused reading app that consolidates Gmail newsletters and subscribed RSS feeds into one distraction-free inbox. Instead of digging through your email for the newsletters you actually want to read, you get a clean reading interface with consistent formatting across all your sources.

The app generates a daily personalized recommendation set using a deterministic ranking algorithm, with an optional AI ranking layer (via OpenRouter) that learns your reading preferences over time. Read progress and saved items are tracked across both newsletters and RSS feeds.

#### Features

- Sign in with Google and read newsletter emails in a clean app UI instead of your mailbox
- Subscribe to RSS sources and sync recent articles into the same reading flow
- AI-powered daily recommendations with deterministic fallback when unavailable
- Track read progress and saved items across newsletters and RSS feeds
- Keyboard-friendly navigation for distraction-free reading

#### Tech Stack

- **Framework:** Next.js (App Router) + React
- **Auth:** NextAuth (Google OAuth)
- **Database/ORM:** PostgreSQL + Prisma
- **Integrations:** Gmail API, RSS feeds, OpenRouter (AI ranking)
- **Deployment:** Vercel
