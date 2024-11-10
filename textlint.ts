import path from "node:path";
import { cwd } from "node:process";
import { createLinter, loadTextlintrc, loadLinterFormatter } from "textlint";
import _ from "textlint-rule-preset-ja-technical-writing";

const descriptor = await loadTextlintrc({
    configFilePath: path.join(cwd(), ".textlintrc")
});
const linter = createLinter({
    descriptor
});

const results = await linter.lintFiles(Deno.args);
const formatter = await loadLinterFormatter({ formatterName: "checkstyle" });
const output = formatter.format(results);
console.log(output);
if (results.some((result) => result.messages.length > 0)) {
    await Deno.writeTextFile("textlint.log", output);
    Deno.exit(1);
}
