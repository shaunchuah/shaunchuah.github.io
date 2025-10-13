---
title: 'Agentic AI and the Future of Medicine'
date: 2025-10-06T09:54:00Z
tags: []
draft: false
description: ""
---

I didn’t expect AI to change the way I code this much. This year alone, two models — Grok Code Fast 1 and GPT-5-Codex — have transformed how I work. Grok handles the small stuff, like fixing my poorly named variables. GPT-5-Codex, on the other hand, can build entire features on its own — for example, adding speech input with the Web Speech API.

These tools show what’s now possible with “agentic AI” — models that can think and act for themselves. What once took weeks now takes hours, freeing up time to write posts like this (a rarity lately!). It’s hard to describe how revolutionary this feels. After years of managing several software projects, I finally have real help.

When I return to an old project, I can just ask these models for a quick summary or even to add new features, instead of spending hours catching up. Boring but necessary jobs — like writing tests, cleaning up code, and updating dependencies — are now handled automatically. That’s made me far more productive and lets me focus on the creative work: architecture and design.

## Thinking about Large Language Models (LLMs) in Medicine

Watching these AI agents evolve makes me think about the future of LLMs in medicine, especially in inflammatory bowel disease. Two ideas stand out: **tool calling** and **agentic architectures**. Tool calling connects probabilistic and deterministic systems, so LLMs can perform specific tasks. Agentic architectures allow LLMs to decide which tools to use. This is a real game changer - it means we can automate complex workflows.

But before that, the first step for medical applications is learning to ground an LLM in up-to-date and reliable medical knowledge. Just a few years ago, when ChatGPT first appeared, many criticised its hallucinations and inaccuracies. Fast-forward to today, and things are very different. I thought it'd be interesting to see if we can ground an LLM like ChatGPT in robust medical knowledge, which led to the launch of [ChatIBD](https://www.chatibd.com) - a fun project to test how well this tech works in practice. Although it is not perfect, I think it is surprisingly good. It’s also a glimpse into what future clinician-AI partnerships might look like.

Once LLMs are grounded in reliable medical knowledge, we can then apply tool calling and agentic architectures.

## Thought Experiment - The IBD Surveillance AI Agent

Let's take a concrete example: an AI agent that manages IBD surveillance scopes. This feels technically feasible today. Here's how it would work:

1. The trigger - for example, in an outpatient IBD clinic, opening the EPR of a patient triggers the agent to begin.
2. The AI agent uses the patient ID to lookup endoscopy/pathology reports and clinic letters, understanding the patient context - things like disease duration, extent, presence of PSC etc.
3. Next, we add the relevant/up-to-date guidelines into its reasoning chain.
4. Using all the right context, the agent then works out the appropriate interval for the next colonoscopy.
5. It interfaces with the endoscopy booking system to find suitable slots.
6. It presents a summary to the clinician and patient for review - allowing humans to account for things like holidays etc.
7. Once confirmed, the appointment is booked.

Done right, this can improve adherence to surveillance guidelines, reduce the workload on clinicians and administrative staff, and improve patient outcomes. In addition, when guidelines change, updating the AI agent's information will immediately send the change everywhere, ensuring that all patients receive care based on the latest evidence.

The biggest challenge here isn't AI, it's the hospital's existing software setup. Hospitals need sandbox environments to test and connect with existing EPRs (electronic patient records), which most large systems simply don’t have or are hidden behind a wall of bureaucracy. Hospitals will also need to build specific APIs (application programming interfaces) that allow AI systems to retrieve data from current databases. EPR systems have to become open and interoperable, but current vendor incentives rarely align with that.

## The 'Software-Defined' Hospital

Smaller, more agile hospital systems will likely be the first to adopt these AI workflows. Large hospital systems are likely to be hampered by legacy systems and procurement processes that are not agile enough to keep up with the rapid pace of AI development. Smaller hospitals can try and test new AI tools faster - much like how startups move quicker than large corporations. These changes could improve patient care and cut costs.

Just like how Tesla, BYD and other new car manufacturers came up with the idea of the 'software-defined' vehicle, we'll likely see 'software-defined' hospitals too. Data sharing, AI integration, and rapid iteration are going to be the core principles that enable future AI workflows.

Interestingly, I think developing countries may actually leapfrog here. With fewer legacy constraints, bureaucracy, and stronger incentives for cost efficiency, they can iterate and adopt next-gen EPR systems purpose-built for AI workflows much faster.

A quick word on regulation - too much could slow progress here. These systems are complex and too much bureaucracy could push the best builders elsewhere. We need people who understand the tech to strike the right balance - encouraging innovation while maintaining robust systems for safety and oversight.

## Conclusion

That said, we're in an exciting time for medicine. Scalable tools and smarter workflows will take away tedious tasks and make being a doctor much more enjoyable. These technologies will boost every doctor's productivity, letting us focus on the many other parts of the job that matter most. I look forward to seeing how this space develops over the next few years.
