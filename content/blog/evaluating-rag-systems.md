---
title: "How I Evaluate RAG Systems Before Shipping"
date: "2026-10-28"
summary: "A practical checklist for measuring retrieval quality, answer faithfulness, and latency before a RAG app reaches users."
tags: ["rag", "llm", "evaluation"]
---

> **Placeholder post.** Replace this with your own writing — this file lives in `content/blog/`.

Retrieval-augmented generation looks easy in a demo and gets hard in production. Here's the evaluation loop I run before anything ships.

## 1. Build a golden dataset

Start with 50–200 real questions, each paired with the documents that *should* be retrieved and a reference answer. Small and curated beats large and noisy.

## 2. Measure retrieval separately

If retrieval is wrong, generation can't save you. Track:

- **Recall@k** — did the right chunk show up at all?
- **MRR** — how high did it rank?
- **Context precision** — how much of the context was actually useful?

## 3. Score the answers

```python
def faithfulness(answer: str, contexts: list[str]) -> float:
    claims = extract_claims(answer)
    supported = [c for c in claims if is_supported(c, contexts)]
    return len(supported) / max(len(claims), 1)
```

Use an LLM judge, but calibrate it against a handful of human labels first.

## 4. Watch latency and cost

A correct answer in 9 seconds is a bad answer. Set a p95 budget and fail CI when you blow it.

## Takeaway

Treat evaluation as a product feature, not a one-off notebook. The teams that ship reliable LLM apps are the ones that can *measure* reliability.
