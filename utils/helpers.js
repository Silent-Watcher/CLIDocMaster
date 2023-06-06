'use strict';
import inquirer from 'inquirer';

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

export { askForAuthorName ,askForAuthorEmail };
