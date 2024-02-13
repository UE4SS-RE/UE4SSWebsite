import Handlebars from "handlebars";
import { readFile, writeFile } from "fs";

async function main() {
  if (process.argv.length !== 5) {
    console.error(
      "Invalid arg count! Usage: node index.mjs [input_template] [output_template] [latest_release]"
    );
    return;
  }

  const inputTemplate = process.argv[2];
  const outputTemplate = process.argv[3];

  const releaseLink = process.argv[4];

  console.log(`Processing ${inputTemplate} to ${outputTemplate}`);
  console.log(`Latest release link: ${releaseLink}`);

  const data = await new Promise((resolve, reject) => {
    readFile(inputTemplate, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  const template = Handlebars.compile(data);
  const context = { releaseLink };

  const html = template(context);

  await new Promise((resolve, reject) => {
    writeFile(outputTemplate, html, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

main();
