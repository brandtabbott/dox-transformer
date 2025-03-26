#!/usr/bin/env -S node --no-warnings
import { Command } from "commander";
import { parseComments } from "dox";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import * as glob from "glob";
import * as pkg from "../package.json" with { type: "json" };
import * as path from "path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";
register(pathToFileURL("./bin/https-hooks.mjs"));

const program = new Command();
program.version(pkg.version);
program.on("--help", () => {
  console.log("\nExample:");
  console.log('  $ dox-transformer -t examples/example-transformer.js -f "examples/**/*.vue" -o docs -e ".md"');
});
program
  .requiredOption("-t, --transformer <file>", "Transformer (ECMAScript Module)")
  .requiredOption("-f, --files <files>", "Input file(s) glob pattern")
  .requiredOption("-o, --output <directory>", "Output directory")
  .option("-e, --extension <extension>", "Output file extension")
  .option("-r, --remove <remove>", "Remove string from file path")
  .parse(process.argv);

const options = program.opts();

(async () => {
  // Load the module
  const m = await import(process.cwd() + "/" + options.transformer);

  // Process each file in glob pattern
  glob.sync(options.files).forEach((file) => {
    try {
      // Parse the input file
      const inputFile = readFileSync(file, "utf8");
      const parsedComments = parseComments(inputFile, { raw: true });

      // Ignore empty parsed comments OR empty tags OR files with @dox-transformer-ignore in the first comment
      if (
        parsedComments.length === 0 ||
        parsedComments[0].tags.length === 0 ||
        parsedComments[0].tags.find((tag) => tag.type === "dox-transformer-ignore")
      )
        return;

      // Remove desired string from file path
      file = file.replace(options.remove || "", "");

      // Create the output directory if it doesn't exist
      let fullDirectory = "";

      if (file.split("/").length > 0) {
        fullDirectory = options.output + "/" + path.dirname(file);
      } else {
        fullDirectory = options.output;
      }

      !existsSync(fullDirectory) && mkdirSync(fullDirectory, { recursive: true });

      // Write the output file using the transformer
      writeFileSync(
        options.output + "/" + file.replace(/\..*$/, options.extension || m.fileExtension || ""),
        m.default(parsedComments),
      );
    } catch (e) {
      console.error(`dox-transformer: Error processing ${file}: ${e.message}`);
    }
  });
})();
