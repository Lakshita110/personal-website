---
external: false
title: Co-Op @ Remark
description: What I built, what I learned, and what got me excited about AI infrastructure while spending a semester at an AI startup.
date: 2026-05-01
---

From January to May 2026, I was a software engineering co-op at [Remark](https://remark.ai), an AI-powered customer support platform for e-commerce brands. Over four months I worked across the full stack — backend GraphQL APIs, webhook infrastructure, AI pipelines, and React frontends. This is what I worked on, what it taught me, and where it's got me thinking.

---

#### What I Worked On

**Third-party integrations.** The biggest part of my co-op was building Gorgias and Freshdesk support from scratch — both end-to-end. For each: webhook controllers to receive and authenticate ticket events, a CS ticket automation adapter that translates platform-specific payloads into Remark's internal format, and then the full frontend surface — conversation filters, automation settings, integration modals, playground support.

Getting to feature parity with existing integrations meant understanding not just the API but the edge cases — Gorgias encodes message bodies differently when the message contains inline images, which caused a silent extraction bug that only showed up in real tickets.

The most memorable bug I introduced (and fixed) was an auto-reassignment loop: the AI would detect it needed to hand off to a human, transfer the conversation — then immediately re-assign itself back. Fixing it meant getting comfortable with tools like Hookdeck to inspect live webhook payloads, and figuring out how to construct realistic test scenarios — because the bug only surfaced under real event timing, not in unit tests.

**Shopper context for AI.** When a known shopper starts a conversation, the AI now has their name, tenure, order count, buying intent, and top interests available. I built the context injection pipeline on the backend and a playground shopper picker on the frontend so staff could simulate personalized conversations for testing.

**Feature flag infrastructure.** I built the Staff Settings page in the admin dashboard — a frontend for managing feature flags, rollout percentages, and user overrides across the product.

---

#### What I Learned

**Webhook integration is a craft.** I came in thinking webhooks were simple: receive event, process it, done. In practice, authentication, idempotency, event normalization, and the subtle differences in how platforms represent the same concept (a ticket, a message, a user) are where most of the complexity lives. Doing it twice made the patterns much clearer — and made me appreciate how much implicit knowledge is baked into "it just works."

**AI actions need the right granularity.** When building the Gorgias action set I had to think carefully about how to slice them. Too coarse and the AI can't navigate complex scenarios; too fine and the context window fills up with tool noise. The right level of abstraction has a direct effect on how well the AI performs — it's more of a product design decision than a technical one.

**Own the whole feature.** Almost everything I shipped had a backend PR and a frontend PR. Owning both ends made me much faster at understanding my own bugs. I didn't have to wait for someone else to tell me what the API was returning or why the UI was behaving unexpectedly — I already knew, because I'd built it.

**Systems fail in boring ways.** The bugs I spent the most time on weren't exotic. They were race conditions in webhook flows, a config key being silently overwritten during form submission, a flag applying at the wrong scope. The common thread: failures that only appeared with real data, in production timing, across services. Good observability — logging every event, every decision point — was the difference between "I think I fixed it" and "I know I fixed it."

---

#### What's Got Me Excited

Working on Remark's AI pipeline gave me a much closer view of what production agents actually look like versus what they look like in demos. The reliability gap is real and interesting.

In demos, an agent picks the right tool, executes cleanly, and the result is what you'd expect. In production, the failures are almost entirely in the seams — between what the model inferred and what was actually true, between what a tool returned and what the model expected, between the prompt you wrote last week and the edge case that showed up today. The model itself is rarely the problem. The infrastructure around it is where the work is.

What I find exciting isn't just making individual agents more capable — it's the infrastructure layer that makes them reliable and observable at scale. Feature flags that let you roll out new AI behaviors gradually. Evaluation frameworks that catch regressions before they hit users. Tooling that lets you replay exactly what an agent did and understand why. That's the engineering problem I want to keep working on.

I left Remark more curious about AI systems than when I arrived, which felt like the right outcome.
