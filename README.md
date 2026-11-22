# Portfolio

Personal portfolio built with **Next.js 15 (App Router)** and **Tailwind CSS v4**.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Editing content

| What | Where |
| --- | --- |
| Name, bio, projects, experience, skills, links | `src/data/site.ts` |
| Blog posts (Markdown with front matter) | `content/blog/*.md` |
| Resume PDF | `public/resume.pdf` |
| Profile photo | `public/avatar.jpg`, then set `profile.avatar = "/avatar.jpg"` |
| Colors and fonts | `src/app/globals.css` (`@theme` block) |

### New blog post

Create `content/blog/my-post.md`:

```md
---
title: "My post"
date: "2026-11-22"
summary: "One-line summary shown in lists."
tags: ["llm"]
---

Your Markdown here.
```

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). No configuration needed.
