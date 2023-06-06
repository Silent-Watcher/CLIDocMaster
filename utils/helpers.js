'use strict';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function askForAuthorName() {
  let answer = await inquirer.prompt({
    type: 'input',
    name: 'AuthorName',
    message: 'Who is the author ?',
  });
  return answer.AuthorName;
}

async function askForAuthorEmail() {
  let answer = await inquirer.prompt({
    type: 'input',
    name: 'emailAuthor',
    message: 'Enter your email address',
  });
  return answer.emailAuthor;
}

function isTheFileGenerated(name) {
  return fs.existsSync(path.join(__dirname , '/../' , name));
}

export { askForAuthorName ,askForAuthorEmail , isTheFileGenerated };
