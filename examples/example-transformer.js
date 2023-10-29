import * as fs from "fs";
import Handlebars from "https://cdn.jsdelivr.net/npm/handlebars@4.7.8/+esm";
import H from "https://cdn.jsdelivr.net/npm/just-handlebars-helpers@1.0.19/+esm";

export default function transform(context) {
  // Register just-handlebars-helpers
  H.registerHelpers(Handlebars);

  // Register custom helpers
  Handlebars.registerHelper("filter", function (arr, key, value) {
    return arr.filter((item) => item[key] === value);
  });

  Handlebars.registerHelper("get", function (arr, key, value, prop) {
    const v = arr.find((item) => item[key] === value);
    return v ? v[prop] : "";
  });

  const handlebarsTemplate = fs.readFileSync(process.cwd() + "/examples/example-template.hbs", "utf8");
  const template = Handlebars.compile(handlebarsTemplate);

  return template({ firstComment: context[0] });
}
