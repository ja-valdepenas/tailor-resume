const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawnSync } = require("node:child_process");
const puppeteer = require("puppeteer");

const projectRoot = path.resolve(__dirname, "..");

function parseArguments(argv) {
  const options = {
    command: "all",
    source: path.join(projectRoot, "src", "resume.md"),
    style: path.join(projectRoot, "src", "resume.css"),
    outputDirectory: path.join(projectRoot, "dist"),
    htmlName: "resume.html",
    pdfName: "Resume.pdf",
    embedStyle: false,
  };

  const argumentsToParse = [...argv];
  if (argumentsToParse[0] && !argumentsToParse[0].startsWith("--")) {
    options.command = argumentsToParse.shift();
  }

  const optionNames = {
    "--source": "source",
    "--style": "style",
    "--out-dir": "outputDirectory",
    "--html-name": "htmlName",
    "--pdf-name": "pdfName",
  };

  while (argumentsToParse.length > 0) {
    const flag = argumentsToParse.shift();
    if (flag === "--embed-style") {
      options.embedStyle = true;
      continue;
    }

    const optionName = optionNames[flag];
    if (!optionName) {
      throw new Error(`Unknown option: ${flag}`);
    }

    const value = argumentsToParse.shift();
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for ${flag}`);
    }

    options[optionName] = ["htmlName", "pdfName"].includes(optionName)
      ? value
      : path.resolve(process.cwd(), value);
  }

  if (!["all", "html", "pdf"].includes(options.command)) {
    throw new Error(`Unknown command: ${options.command}. Use all, html, or pdf.`);
  }

  return options;
}

function assertFileExists(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} was not found: ${filePath}`);
  }
}

function buildHtml(options) {
  assertFileExists(options.source, "Markdown source");
  assertFileExists(options.style, "Stylesheet");

  fs.mkdirSync(options.outputDirectory, { recursive: true });

  const htmlPath = path.join(options.outputDirectory, options.htmlName);
  let stylesheetReference = options.style;
  if (!options.embedStyle) {
    const outputStylePath = path.join(
      options.outputDirectory,
      path.basename(options.style),
    );
    fs.copyFileSync(options.style, outputStylePath);
    stylesheetReference = path.basename(outputStylePath);
  }

  const pandocArguments = [
    options.source,
    "-f",
    "markdown",
    "-t",
    "html",
    "-c",
    stylesheetReference,
    "-s",
    "-o",
    htmlPath,
  ];
  if (options.embedStyle) {
    pandocArguments.push("--embed-resources");
  }

  const result = spawnSync(
    "pandoc",
    pandocArguments,
    { cwd: options.outputDirectory, encoding: "utf8", shell: false },
  );

  if (result.error) {
    if (result.error.code === "ENOENT") {
      throw new Error("Pandoc is required but was not found on PATH.");
    }
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(result.stderr.trim() || "Pandoc failed to generate HTML.");
  }

  console.log(`HTML: ${htmlPath}`);
  return htmlPath;
}

async function buildPdf(options) {
  const htmlPath = path.join(options.outputDirectory, options.htmlName);
  assertFileExists(htmlPath, "Generated HTML");

  const pdfPath = path.join(options.outputDirectory, options.pdfName);
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm",
      },
    });
  } finally {
    await browser.close();
  }

  console.log(`PDF:  ${pdfPath}`);
  return pdfPath;
}

async function main() {
  const options = parseArguments(process.argv.slice(2));

  if (options.command === "all" || options.command === "html") {
    buildHtml(options);
  }
  if (options.command === "all" || options.command === "pdf") {
    await buildPdf(options);
  }
}

main().catch((error) => {
  console.error(`Build failed: ${error.message}`);
  process.exitCode = 1;
});
