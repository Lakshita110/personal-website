---
external: false
title: 🤖 What I Learned Building AI Agents at Remark
description: Reflections on building production AI agents — what's actually hard, what surprised me, and how I think about reliability now.
date: 2026-05-15
---

Last fall I joined [Remark](https://remark.ai) as a SWE co-op, working on a product that turns browsers into buyers. On paper that sounds like a growth/conversion problem. In practice, it meant I spent a significant chunk of my time building AI agents — and I came out the other side with a very different mental model of what makes agents hard.

This is what I'd tell myself before I started.

#### Agents are not just "LLM + tools"

The naive model of an agent is: give an LLM a goal, give it some tools, let it figure out the steps. That works in demos. In production, the failure modes are almost entirely about the seams — between the model's understanding and the real state of the world, between what a tool returns and what the model expected, between the prompt you wrote last week and the edge case that showed up today.

The model itself is rarely the problem. The orchestration is.

<!-- Add a diagram or screenshot here if you have one -->

#### Reliability is a systems problem, not a prompting problem

Early on I thought prompt engineering was the main lever. Write clearer instructions → get better behavior. That's true up to a point, but it hits a ceiling fast.

What actually moved the needle was:
- **Structured outputs over free-form text.** Every time an agent had to parse something it had written itself, there was a failure path. Constraining outputs to a schema eliminated a whole class of errors.
- **Short feedback loops.** Agents that could observe the result of each action and adjust beat agents that planned upfront and executed blindly. The plan-then-execute pattern sounds cleaner but it's brittle.
- **Graceful degradation.** Defining what "good enough" looks like when the ideal path fails. An agent that knows how to bail cleanly is much safer than one that keeps retrying into a bad state.

#### Evaluation is the hardest part

You can't stare at outputs forever. At some point you need a way to know, systematically, whether a change made things better or worse. Building evals for agents is genuinely hard because:

1. The task is often open-ended — there's no single right answer
2. Runs are slow and sometimes expensive
3. Success criteria depend on context that's hard to encode

What I found useful was building a small golden set of cases — scenarios where I knew exactly what good behavior looked like — and running every prompt change against those before shipping anything. It's not perfect coverage, but it makes regressions visible.

#### What surprised me most

The hardest problems weren't technical. They were about ambiguity.

When a user gives an agent a task, they have an intent that's often only partially specified. The agent has to infer the rest — and when it infers wrong, the failure is confusing because the agent did technically do what was asked, just not what was meant.

Spending time clarifying what the agent *shouldn't* do turned out to be just as valuable as specifying what it should. Negative constraints are underrated.

#### What I'd do differently

If I were starting over, I'd instrument everything from day one. Log every tool call, every model response, every decision point. Not because you'll need it immediately — but because when something goes wrong in production (and it will), you want the ability to replay exactly what happened and understand why.

Agents fail in ways that are hard to reproduce. Good observability is the difference between "I think I fixed it" and "I know I fixed it."

---

Building agents at Remark was the most intellectually engaging work I've done in an internship. The field is moving fast, and a lot of the best practices are still being figured out in public. If you're working on something in this space, I'd love to talk — feel free to reach out.
