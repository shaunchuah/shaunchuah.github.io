---
title: 'Agentic AI and the Future of Medicine'
date: 2025-10-06T09:54:00Z
tags: []
draft: false
description: ""
---

Generative AI has rewritten how we build, code, and think today. In the coding sphere, it has heavily impacted my workflows this year in particular. Two models in particular have fundamentally reshaped how I work: Grok Code Fast 1 and GPT-5-Codex. Grok Code Fast 1 is really fast and helpful for small refactors such as renaming the many poorly named variables I've written by myself, whereas complex end-to-end features are delivered amazingly well by GPT-5-Codex (for example, implement a speech input using the Web Speech API).

These demonstrate new capabilities as 'agentic AI', models that can autonomously reason and implement changes. What used to take me a few weeks to implement is now done in hours, freeing up some time for me to write posts like this (a rarity lately!). It is hard to describe how revolutionary this feels, particularly now that I have been running and maintaining quite a few software projects over the last few years. When returning to an old project, it takes some time to get the context of the project back in my head. Now, I can simply ask these models to provide me a quick summary, and implement new features, almost like having a very patient junior dev on hand to help out.

Boring but necessary tasks such as writing unit and integration tests, refactoring code to improve readability and maintainability, and updating dependencies are now easily handled by these models. This has significantly improved my productivity and allowed me to transition my focus to more complex and creative aspects such as architecture and design.

## Thinking about LLMs in Medicine

Watching these agentic agents evolve over the past year naturally leads me to think about the future of LLMs in medicine, particularly in the field of inflammatory bowel disease. Two ideas stand out: **tool calling** and **agentic architectures**. These allow the coupling of probabilistic systems with deterministic systems, therefore allowing LLMs to call on external tools (which are deterministic) to perform specific tasks. This is a real game changer - it means that automating complex workflows is now possible.

But before we get too far ahead of ourselves, I think the first step for any potential applications is learning to ground an LLM in up-to-date and reliable medical knowledge. Just a few years ago, when ChatGPT first came onto the scene, much criticism was levelled at its hallucinations and inaccuracies. Fast-forward to today, and things are very different. I thought it'd be interesting to see if we can ground an LLM like ChatGPT in robust medical knowledge - therefore leading to the launch of [ChatIBD](https://www.chatibd.com), which is really a fun, learning project to see how well this tech works. Although it is not by any means perfect, I think it is surprisingly good. It’s also a glimpse into what future clinician-AI partnerships might look like.

If we can reliably ground LLMs in medical knowledge, we can then think about applying tool calling and agentic architectures next.

## Thought Experiment - The IBD Surveillance AI Agent

Let's consider a concrete example. Imagine an AI agent that sorts out IBD surveillance scopes. I think this is technically feasible today. Here's how it would work:

1. The trigger - for example, in an outpatient IBD clinic, opening the EPR of a patient triggers the workflow.
2. The AI agent uses the patient identifier to perform a lookup - analysing endoscopy/pathology reports and clinic letters to understand the patient context first - e.g. disease duration, extent, presence of PSC etc.
3. Following that, we inject the relevant/up-to-date guidelines in its reasoning chain.
4. Using all the right context, the agent then works out the appropriate interval for the next colonoscopy.
5. It interfaces with the endoscopy booking system to find suitable slots.
6. It presents a summary of this to the clinician and patient for review and approval - accounting for things like the patient's planned holidays etc.
7. Once confirmed, the appointment is booked.

Done right, this can improve adherence to surveillance guidelines, reduce the workload on clinicians and administrative staff, and improve patient outcomes. In addition, when guidelines change, a single context update to the AI agent will propagate the changes across the entire system, ensuring that all patients receive care based on the latest evidence.

The biggest challenge here isn't AI but the existing software infrastructure of the hospital. Hospitals need sandbox environments for experimentation and integration with existing EPRs, which most large systems simply don’t have or are hidden behind a wall of bureaucracy. EPR systems have to become more open and interoperable, but current vendor incentives rarely align with open interoperability.

## The 'Software-Defined' Hospital

Smaller, more agile hospital systems will likely be the first to implement these AI workflows. Large hospital systems are likely to be hampered by legacy systems and procurement processes that are not agile enough to keep up with the rapid pace of AI development. These smaller hospital systems will be able to experiment and iterate quickly, implementing new AI-driven workflows that can significantly enhance patient care and operational efficiency.

Much like how Tesla, BYD and other new automotive manufacturers came up with the idea of the 'software-defined' vehicle, so we are likely to see this happen in healthcare too. We’re heading toward a software-defined hospital, where data interoperability, AI integration, and rapid iteration are core principles that enable future AI workflows.

Interestingly, I think developing countries may actually leapfrog here. With fewer legacy constraints, bureaucracy, and stronger incentives for cost efficiency, they can iterate and adopt next-gen EPR systems purpose-built for AI workflows much faster.

A quick word on over-regulation - excessive regulation certainly risks slowing progress here. These systems are already complex enough; too much bureaucracy could push the best builders elsewhere. What we need are people who thoroughly understand the tech stack to find the right balance that enables innovation and iteration while maintaining robust mechanisms for monitoring, debugging, and ensuring safety.

## Conclusion

That said, we're in an exciting time for medicine, where scalable efficiencies and transformative workflows are going to take away tedious tasks and make being a doctor much more enjoyable. These technologies will lead to solutions that amplify the productivity of every single doctor, so we can focus on the million other things that actually make up the job. I look forward to seeing how this space develops over the next few years.
