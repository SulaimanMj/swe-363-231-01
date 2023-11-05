const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const extensions = new Set(['.txt', '.jpg']);


function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (input) => resolve(input));
  });
}

async function copyFilesWithExtensions(sourceDir, targetDir) {
  try {
    await mkdir(targetDir, { recursive: true });

    const files = await readdir(sourceDir);

    for (const file of files) {
      if (extensions.has(path.extname(file))) {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);

        await copyFile(sourcePath, targetPath);
        console.log(`Copied '${file}' to '${targetDir}'`);
      }
    }
  } catch (error) {
    console.error('Error copying files:', error);
  }
}

async function main() {
  const sourceDir = await ask('Enter the source directory path: ');
  const targetDir = await ask('Enter the target directory path: ');

  rl.close();

  await copyFilesWithExtensions(sourceDir, targetDir);
}

main();