# Tailor Resume

A reusable AI skill for turning a job posting and your existing résumé into a
truthful, tailored résumé. Review the editable Markdown draft, then get an
ATS-readable PDF checked for text extraction and page layout.

## Install

From the folder where you keep your résumé, run:

```sh
npx skills add ja-valdepenas/tailor-resume --skill tailor-resume
```

Choose your coding assistant when prompted. The installer uses Node.js and npm;
see the [Skills CLI instructions](https://github.com/vercel-labs/skills).

If your assistant cannot install skills, download
[SKILL.md](skills/tailor-resume/SKILL.md) and its `assets/` and `references/`
folders, then ask the assistant to read the skill. In a chat-only tool, attach
the skill, your résumé, and the job description; local build steps may need to
be run on your computer.

## Use

Open a chat in your résumé folder and send:

> Use $tailor-resume for this job: PASTE_JOB_URL_HERE. Use my existing résumé,
> show me the editable draft, and build the PDF after I approve it.

If `$` commands are unavailable, ask the assistant to follow the installed
`tailor-resume` skill by name or read its `SKILL.md` directly.

On first use, provide your complete **base résumé**. The assistant helps you
review and save it as the master, normally `src/resume.md`. If you do not have
one, it helps create and confirm one before tailoring. Every new application
starts from a copy of that base; tailoring never changes the base itself or
uses a previous tailored résumé as the new base. You must explicitly ask to
update the base when your experience changes.

The assistant also sets up a builder if needed. The starter builder uses
Node.js, Pandoc, and Puppeteer;
PDF checks also need a text extractor and page renderer, such as Poppler.
The assistant checks dependencies and explains any installation needed.

You can choose a separate **Relevant Work Experience** or **Relevant Technical
Experience** section immediately after Work Experience. Your preference is
remembered. Every claim must come from your actual experience or your explicit
confirmation.

After editing the draft, say:

> I approve the saved draft. Build and verify the PDF, preserving my edits.

Each application gets a company-named folder and résumé files, for example:

```text
src/resume.md                                   # Your unchanged base
src/applications/example-company-1234567890/
  Your-Name-Example-Company-Resume.md             # Tailored editable copy
  application-notes.md
dist/applications/example-company-1234567890/
  Your-Name-Example-Company-Resume.html
  Your-Name-Example-Company-Resume.pdf
```

The posting ID distinguishes different jobs at the same company. Ask the
assistant to move, rename, or archive an application when needed; it preserves
that application's files and history, updates their references, and leaves
the base and other applications alone.

New chats continue from saved files and notes. The skill does not submit applications.
Text and visual checks improve readability; they do not guarantee an ATS result.

## Also build a job scanner

Give your AI the standalone
[LinkedIn scanner setup guide](docs/linkedin-job-scanner-guide.md). It explains
browser sign-in, profile-based searches, country filters, an optional dashboard,
résumé workflows, and delivery of a PDF user manual for the finished tool.
