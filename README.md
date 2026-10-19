# LinkedIn Job Scanner

Build your own local LinkedIn job scanner with your preferred AI assistant.
Start with the standalone [setup guide](linkedin-job-scanner-guide.md): it tells
your AI how to create and personalize the tool on your computer. This repository
provides the build instructions and an optional résumé skill; your AI builds
the scanner from the guide.

## Start with the job scanner

1. Download [linkedin-job-scanner-guide.md](linkedin-job-scanner-guide.md) into
   a new folder on your computer.
2. Open that folder in your AI coding assistant, or attach the file in a chat.
3. Send:

   > Read linkedin-job-scanner-guide.md and build my LinkedIn job scanner.
   > Help me confirm my profile, job titles, employer exclusions, and countries.
   > Offer the dashboard and résumé features, test what you build, and finish
   > by showing me a PDF user guide explaining how to use it.

Your AI checks the tools it can access and helps install what is needed. If it
cannot run a local browser, it provides the project files and local instructions.
Sign into LinkedIn yourself in the Chrome window opened by the scanner.

## What the scanner includes

The guide asks your AI to build:

- Visible Chrome sign-in with a reusable LinkedIn session.
- Profile review to suggest related job titles and exclude your current employer.
- Country and region selections, including Latin America and remote worldwide.
- Editable search filters, starting with jobs posted within seven days and
  a total limit of ten new jobs per run.
- Saved results, duplicate detection, fit analysis, and separate eligibility labels.
- An optional dashboard to save jobs and track applications.
- A verified PDF user guide covering the features actually built.

The suggested stack is Node.js, Puppeteer, and local JSON storage, with HTML,
CSS, and JavaScript for the optional dashboard. AI analysis can use the person's
chosen provider or manual export/import. See the guide for setup details,
LinkedIn's automation policy, and the manual collection alternative.

## Optional: tailor a résumé for a job

Once you find a posting you like, use the included `tailor-resume` skill to
create an editable draft and an ATS-readable PDF. It can also be used on its own.

From your résumé project folder, install it with:

```sh
npx skills add ja-valdepenas/tailor-resume --skill tailor-resume
```

Choose your coding assistant when prompted. The installer uses Node.js and npm;
see the [Skills CLI instructions](https://github.com/vercel-labs/skills).

Open a new chat in the same project folder and send:

> Use $tailor-resume for this job: PASTE_JOB_URL_HERE. Use my base résumé,
> show me the editable draft, and build the PDF after I approve it.

On first use, provide or help create your complete **base résumé**. Every new
application starts from a separate copy; the base stays unchanged unless you
explicitly request an update. Company names appear in application folders and
résumé filenames, with posting IDs to distinguish jobs at the same company.
You can request moves, renames, or archiving while preserving files and history.

Choose whether to include **Relevant Work Experience** or **Relevant Technical
Experience** immediately after Work Experience. All claims must come from your
confirmed experience. After reviewing the draft, say:

> I approve the saved draft. Build and verify the PDF, preserving my edits.

The starter PDF builder uses Pandoc and Puppeteer, with text extraction and
page rendering checks. The skill preserves manual edits and supports continuing
in a new chat. It does not submit applications or guarantee an ATS result.

If your assistant cannot load skills automatically, ask it to read
[SKILL.md](skills/tailor-resume/SKILL.md), keeping its `assets/` and `references/`
folders alongside it. In a chat-only tool, attach the skill, base résumé, and
job description; local build steps may need to be run on your computer.

## Files

```text
linkedin-job-scanner-guide.md     Start here to build the scanner
skills/tailor-resume/SKILL.md     Optional résumé tailoring skill
skills/tailor-resume/assets/      Starter PDF builder, template, and styles
skills/tailor-resume/references/  PDF setup and verification instructions
```
