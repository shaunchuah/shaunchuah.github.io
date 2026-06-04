---
title: 'Building the Research Operating System We Needed'
date: 2026-06-04T09:00:00Z
tags: ["agentic ai", "translational research", "data engineering", "llms", "foundry120"]
draft: false
description: ""
---

A while ago I wrote about the challenge of [orchestrating multi-omic data](/posts/multiomic-data-orchestration/) in translational research. That post described the problem. This one is about what we did next - we built [Foundry120](https://www.foundry120.com), a research operating system for translational science.

## The Problem, Restated

In modern translational research, the hard part is no longer generating data. Sequencing is cheap. Assays are routine. You can now do 6000 genes at subcellular resolution and pin their x,y coordinates?! Most groups are drowning in data, not starved of it.

The hard part is knowing what you actually have. What samples exist? What clinical data do they link to? What clinical phenotype/treatment outcome are you looking for? Who is allowed to use them? Are they ready for the next research question, or do they need cleaning first, or do we need to recruit more participants?

In practice, the answers to these questions live in too many places. Samples are tracked in one spreadsheet, clinical data sits in RedCap or even more excel files, omics outputs are scattered across different computers and hard drives, and the protocols and consent documents are in a shared drive somewhere. As I said in the earlier post, these files tend to be spread over multiple computers and held by different individuals. When you want to ask a simple question - 'how many UC patients with anti-TNF failure have both microbiome data and biopsy samples?' - you end up hunting multiple individuals down.

This is the gap Foundry120 was built to close. It came out of years of running multi-site studies and the pain of experiencing the same problems over and over again.

## Three Layers

The earlier post ended on a principle I keep coming back to: embrace the complexity rather than fight it. You cannot force genomics, clinical records, proteomics, and histology into one tidy schema without losing something important. So instead of flattening everything, Foundry120 just accepts the complexity.

**Organise.** Sample and study tracking across multiple sites. This is foundational - knowing what physically exists. We now track over 30,000 samples, supporting six clinical studies as of writing, and seventeen sample types. Get this layer wrong and nothing above it can be trusted.

**Centralise.** This layer, which I have spent years thinking about, links clinical datasets, omics outputs, and documents together while preserving the data structures that already exist.  Let's be honest, nobody has the time to make every file/folder structure the same.

**Accelerate.** This is the layer that turns a well-organised data estate into answers. This is where the agentic AI unlock is.

## Agentic AI as a Unifying Force

This is the part I find most exciting, and it changes how I think about the whole problem. Helix is our AI agent, and building it is where my [thinking about agentic AI in medicine](/posts/agentic-ai-and-the-future-of-medicine/) stopped being a thought experiment.

The idea is simple to state and hard to do well: a researcher asks a question in plain English, and Helix turns it into an approved query over governed data, returning charts and cohort summaries. 'Show me samples belonging to patients with a particular genotype we are investigating' should be a sentence, not a data request that takes a fortnight.

In my agentic AI post I mentioned that the real unlock is tool calling - connecting probabilistic models to deterministic systems so an LLM can perform specific, reliable tasks. Helix is exactly that pattern applied to research data. It calls into a governed query layer that knows what data exists, what is allowed, and what links to what. The intelligence is in translating intent into the right query; the safety is in the deterministic layer underneath. 

We implemented a huge amount of context engineering/tool design given current model performance, which is extremely interesting and I have no doubt that as more capable models arrive, we can hopefully simplify some of these things we do to optimise LLM context windows.

For decades, the only way to integrate inconsistent datasets was to standardise them first. You agreed on a schema (if you even manage to), then forced every source to conform to it (almost impossible) - the classic data warehouse approach. In the [orchestration post](/posts/multiomic-data-orchestration/) I explained why that breaks down for research: the data is dynamic and unstructured, the analysis requirements keep changing, and you cannot even define the 'grain' the way a retailer can for sales data. So you were left with a bad choice. Either expend an enormous amount of effort to harmonise the data, or leave everything fragmented and pay the cost every time you ask a question. In fact, it was totally unworkable.

Agentic AI offers a third option, and this is the genuinely new thing. An LLM agent is comfortable with messiness in a way that traditional programming is not. It can all sorts of data (within certain limits and design choices), and reason about how they relate - even when one study calls a field `dob`, another calls it `date_of_birth`, and a third buried it in free text. The reconciliation that used to demand a fixed, upfront schema can now happen at query time, semantically, on demand.

In other words, the agent becomes the integration layer. Not by forcing every dataset into one shape, but by understanding many shapes at once and bridging between them. This is exactly what lets the Centralise layer keep its promise of preserving existing structures. You no longer have to choose between standardisation and flexibility - the AI absorbs the inconsistency so the humans do not have to.

I want to be careful not to oversell this. This is still extremely early. The agent still needs the deterministic layer underneath to ground it (and for heavier bioinformatic workflows we have to specify the parameters properly), and it still needs evals - a flexible reasoner over wrong data is just a faster way to be confidently wrong. But the direction is clear. For the first time, heterogeneity is not purely a tax to be paid. Handled well, agentic AI turns a pile of disparate, inconsistent datasets into something you can actually interrogate as a whole.

## What 30,000 Samples Taught Me

A few lessons stand out from building this for real rather than in theory.

The boring layer is the most important one. Sample tracking is unglamorous, but it is the bedrock - an AI query layer sitting on messy provenance just produces confident wrong answers faster. Most of the value of Helix comes from the Organise and Centralise layers being right first.

Meeting people where they are beats forcing a migration. The fastest way to kill adoption is to tell a research group that their existing workflow was wrong. Preserving existing structures and linking across them, rather than replacing them, is what made this usable.

And governance is critical. In clinical research the audit trails, queries, tool calls and reasoning chain are needed to analyse how an answer was generated and importantly, to debug and improve the system when the agent gets it wrong.

## Where This Goes

In the agentic AI post I imagined 'software-defined' hospitals - data-sharing, AI integration, and rapid iteration as core principles rather than afterthoughts. Research infrastructure is the same story one step upstream. If we want AI agents that can reason over clinical and molecular data, they need a governed, well-organised substrate to reason over. That substrate does not build itself and is probably the most challenging issue preventing AI from achieving its promised benefits.

Foundry120 is my attempt at building it. It is still early, but we are gaining huge value, time savings, and we see our team members spend more time focusing on fun and interesting research questions instead of trudging through tedious spreadsheets.

And a sign of how fast this all moves: in my [last post](/posts/agentic-ai-and-the-future-of-medicine/) I was discussing Grok Code Fast 1 and GPT-5-Codex. Both have already aged like milk - at this point of writing, we're on Opus 4.8 and GPT-5.5.
