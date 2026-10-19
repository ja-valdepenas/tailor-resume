# Set up the starter PDF workflow

Use this only when the user's résumé project has no agreed builder. The skill
package contains build assets; installing the skill does not install Node.js,
Pandoc, Puppeteer, or a PDF validation tool.

1. Check the user's OS, Node.js/npm, and Pandoc. Use a supported Node.js LTS
   version compatible with the selected Puppeteer release. Use official setup
   instructions for [Node.js](https://nodejs.org/en/download) and
   [Pandoc](https://pandoc.org/installing.html).
2. Copy `assets/build-resume.js` from this skill to `scripts/build-resume.js`
   in the user's résumé project, `assets/resume.css` to `src/resume.css`, and
   `assets/resume-template.md` to `templates/resume-template.md`. Resolve the
   assets relative to the loaded skill, not the user's current directory. Do
   not overwrite any existing destination. Use the blank template only to help
   draft a new master; never replace an existing master with it.
3. In that project, create a minimal `package.json` only if absent, then install
   Puppeteer with `npm install puppeteer`. Preserve other dependencies and the
   lockfile. Puppeteer normally downloads compatible Chrome; see its
   [installation guide](https://pptr.dev/guides/installation) if the browser is
   missing. PDF rendering uses a fresh browser, never LinkedIn login cookies.
4. Confirm the person's complete base content, then save it in `src/resume.md`
   or retain their established base path. For each new job, copy that unchanged
   base to `src/applications/<company-job-id>/<Candidate>-<Company>-Resume.md`.
   Tailor that copy only; do not use a previous application's résumé as the base.
   Keep existing application drafts and manual edits when continuing a job.

From the user's project root, use the following examples with real application
paths. These commands assume the starter assets have been copied and dependencies
installed. Add `--style` for an application-specific stylesheet.

```sh
node scripts/build-resume.js html --source src/applications/example-company-123/Candidate-Example-Company-Resume.md --out-dir dist/applications/example-company-123 --html-name Candidate-Example-Company-Resume.html --embed-style
node scripts/build-resume.js all --source src/applications/example-company-123/Candidate-Example-Company-Resume.md --out-dir dist/applications/example-company-123 --html-name Candidate-Example-Company-Resume.html --pdf-name Candidate-Example-Company-Resume.pdf --embed-style
```

The first command provides draft review. Run the second after approval. The
builder supports `html`, `pdf`, and `all`; `pdf` prints already generated HTML.
It also supports `--source`, `--style`, `--out-dir`, `--html-name`, `--pdf-name`,
and `--embed-style`. Default paths come from the project containing the copied
builder; supplied paths resolve from the command's current directory. Defaults
build the master into `dist/`, so always pass application paths when tailoring.
Keep the company name in the source, HTML, and PDF filenames, and record their
exact paths in the application notes. A posting ID distinguishes roles at the
same company. If an application is moved or renamed, preserve its source and
deliverables together, update references, and rebuild any broken preview links.
Do not overwrite the base, another application's files, or earlier versions.
Verify the base checksum before and after application work.

Keep the default single-column layout and main-flow contact details. Use
standard section headings, selectable text, and no essential content hidden
in graphics, text boxes, page headers, or footers. The supplied CSS uses A4;
adjust its `@page` rule for Letter if the user prefers it. Do not shrink text
to force one page or add hidden keyword text.

Use Poppler's `pdftotext` and `pdftoppm`, or the environment's PDF extraction
and rendering tools, to check the approved output. For example:

```sh
pdftotext dist/applications/example-company-123/Candidate-Example-Company-Resume.pdf -
pdftoppm -png dist/applications/example-company-123/Candidate-Example-Company-Resume.pdf dist/applications/example-company-123/page
```

Compare extracted facts and reading order with the draft, then inspect every
rendered page. Fix Markdown or CSS and rebuild if needed. If tools are missing,
resolve them or describe the pending verification. A successful print command
alone is not verification, and text extraction is not a universal ATS test.
