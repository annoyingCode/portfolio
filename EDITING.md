# How to edit your portfolio

You don't need to know Next.js. Almost everything on the site is plain text in a few
files. You change the text, save, and the site updates.

---

## 1. One-time setup

1. Install **VS Code** (free): <https://code.visualstudio.com>
2. Open VS Code → **File → Open Folder…** → choose `C:\Portfolio`.

## 2. See your changes live

1. In VS Code, open the terminal: **View → Terminal** (or press `` Ctrl+` ``).
2. Type this and press Enter:

   ```
   npm run dev
   ```

3. Open <http://localhost:3000> in your browser.
4. Edit a file and **save it (Ctrl+S)**. The browser updates by itself in a second or two.
5. When you're done, click in the terminal and press **Ctrl+C** to stop it.

---

## 3. Where everything lives

| What you want to change | File to open |
| --- | --- |
| Name, headline, typing roles, location, email, "open to work" badge | `src/data/site.ts` → `profile` |
| Social links (GitHub, LinkedIn…) | `src/data/site.ts` → `socials` |
| About text and the four stat boxes | `src/data/site.ts` → `about` |
| Work experience, education, certifications | `src/data/site.ts` → `experience`, `education`, `certifications` |
| Skills | `src/data/site.ts` → `skills` |
| Projects | `src/data/projects.ts` |
| Blog posts | `content/blog/` (one `.md` file per post) |
| Resume PDF | put it at `public/resume.pdf` |
| Profile photo | put it at `public/avatar.jpg`, then set `avatar: "/avatar.jpg"` in `site.ts` |
| Colors | `src/app/globals.css` (see section 6) |
| Section titles and fixed sentences (like the Contact text) | `src/components/` (see section 7) |

---

## 4. The few rules to follow

The data files look like code, but you only touch the **text inside quotes**.

```ts
location: "Islamabad, Pakistan",
```

- ✅ Change what's between the `"` quotes.
- ✅ Keep the comma `,` at the end of the line.
- ❌ Don't change the word before the colon (`location:`).
- Apostrophes are fine inside double quotes: `"I'm a teacher"`.
- To put a double quote inside text, add a backslash before it: `"I said \"hello\""`.

**Lists** use square brackets, with items separated by commas:

```ts
roles: ["Software Engineer", "Educator", "Aspiring Scientist"],
```

To add a role, add `, "New Role"` before the `]`.

**Yes/no settings** use `true` or `false` with no quotes:

```ts
openToWork: true,
```

### If something breaks

If the browser shows a red error screen after you save:

1. Read the error. It names the file and the line number.
2. The cause is almost always a missing comma, a missing quote, or a missing bracket.
3. Not sure? Press **Ctrl+Z** in VS Code until it works again, then save.

---

## 5. Common tasks

### Add a project

Open `src/data/projects.ts`, copy a whole block from `{` to `},`, paste it below the
others and edit it:

```ts
  {
    title: "My New Project",
    description: "One or two sentences about what it does.",
    status: "building",        // "planned", "building" or "live"
    tags: ["Python", "AI"],
    github: "https://github.com/annoyingCode/my-new-project",
    demo: "",                  // leave "" to hide the button
  },
```

### Mark a project as live

Change `status: "building"` to `status: "live"` and fill in `demo` and `github`.

### Write a blog post

Create a new file in `content/blog/`, for example `my-first-post.md`. The file name
becomes the web address: `/blog/my-first-post`. Start it like this:

```md
---
title: "My first post"
date: "2026-11-22"
summary: "One sentence that shows in the post list."
tags: ["teaching", "ai"]
---

Write your post here. **Bold**, *italic*, [links](https://example.com),
lists and code blocks all work.
```

To remove a post, delete its file. The three posts there now are samples.

### Add your social links

In `src/data/site.ts`, fill in the links. Any link left as `""` hides its icon.

```ts
github: "https://github.com/annoyingCode",
```

### Hide the "Open to new opportunities" badge

Set `openToWork: false,` in `src/data/site.ts`.

---

## 6. Change colors

Open `src/app/globals.css`. Find the dark theme block (`[data-theme="dark"]`) and the
light theme block (`[data-theme="light"]`). The main color is `--accent`:

```css
--accent: #60a5fa;     /* buttons, links, highlights */
--accent-2: #a78bfa;   /* second color in gradients */
```

Replace the code with any color code from <https://htmlcolorcodes.com>.

---

## 7. Changing fixed wording

Some sentences are written directly in the page pieces in `src/components/`:

| Section | File |
| --- | --- |
| Top of the page (buttons, "hello, world") | `Hero.tsx` |
| Section titles like "What I'm building" | `Projects.tsx`, `About.tsx`, `Experience.tsx`, `BlogPreview.tsx`, `Contact.tsx` |
| Footer | `Footer.tsx` |

These files have more code in them. Search for the sentence (**Ctrl+F**), change only
the words, and leave the `<...>` tags and `{...}` around them as they are.

---

## Still placeholder

These still contain sample content to replace:

- `about.highlights` (the four stat boxes)
- `experience`, `education`, `certifications` and `skills`
- the sample blog posts in `content/blog/`
- `public/resume.pdf` (doesn't exist yet, so the Resume buttons don't work)
