---
title: "Five Lessons from Fine-Tuning Open-Weights Models"
date: "2026-09-14"
summary: "What I wish I'd known before my first LoRA run: data quality, eval baselines, and when not to fine-tune at all."
tags: ["fine-tuning", "lora", "llm"]
---

> **Placeholder post.** Replace this with your own writing.

1. **Try prompting and retrieval first.** Fine-tuning changes *behavior*, not *knowledge*.
2. **Data quality dominates.** 1,000 clean examples beat 50,000 scraped ones.
3. **Lock your eval before you train.** Otherwise you'll unconsciously pick the run that looks best.
4. **Start with LoRA.** Cheap, fast, and easy to roll back.
5. **Log everything.** Hyperparameters, data versions, and seeds — future you will thank you.
