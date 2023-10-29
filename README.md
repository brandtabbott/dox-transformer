# dox-transformer

`dox-transformer` is a versatile command-line utility for transforming code comments from one file type to another using a custom ECMAScript module (transformer). It's designed to extract and manipulate code comments for various purposes, such as generating documentation or converting comment styles.

## Installation

Install `dox-transformer` globally via npm:

```bash
npm install -g dox-transformer
```

Now you're ready to use code comment transformation.

## Motivation

The inspiration behind `dox-transformer` was to offer a flexible solution for transforming code comments in any file type into another. This project aims to facilitate the extraction of valuable information from codebase comments and present it in a format that suits your specific needs. Whether you're generating markdown documentation, translating comments into different languages, or customizing your comment style, the possibilities are virtually limitless.

## Usage

To use `dox-transformer`, create a custom ECMAScript module (transformer) that defines how code comments should be transformed. Configure your transformation using these options:

- `-t, --transformer <file>`: Specify the path to your custom ECMAScript module (transformer).
- `-f, --files <files>`: Define a glob pattern for input files.
- `-o, --output <directory>`: Choose the output directory for transformed files.
- `-e, --extension <extension>` (optional): Select the file extension for the transformed files. If not provided, `dox-transformer` will attempt to retrieve the extension from the module or leave it blank.

## Example

Here's an example of using `dox-transformer`:

```bash
dox-transformer -t examples/example-transformer.js -f "examples/**/*.vue" -o docs -e ".md"
```

This command uses `example-transformer.js` to process code comments in `example-component.vue` within the `examples` directory. The transformed file is saved in the "docs" directory with the ".md" extension.

## Ignored Files

`dox-transformer` currently ignores:

- Files with no comments
- Files with no "tags" in the first comment
- Files where `@dox-transformer-ignore` exists in the first comment

## Special Thanks

Acknowledgment to the developers of the [`dox` npm package](https://www.npmjs.com/package/dox) for their contribution to code documentation. `dox` is a key component in `dox-transformer`, handling code comment parsing.

## Support and Issues

For support, issues, or contributions, visit the [GitHub repository](https://github.com/brandtabbott/dox-transformer) of `dox-transformer`. Open issues or get involved in the project.
