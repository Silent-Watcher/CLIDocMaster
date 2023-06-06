'use strict';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function sleep(ms) {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
}

function addSpinner(name, text, color) {
  const spinner = createSpinner(name).start({
    text: text,
    color: color,
  });
  return spinner;
}

function createBanner(name) {
  let banner = figlet.textSync(name, {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 130,
    whitespaceBreak: true,
  });
  return banner;
}

function showBanner() {
  console.log(createBanner('CLI Readme Generator !'));
}

function showIntroduction() {
  console.log(`
  The ${chalk.blueBright(
    'CLI README File Generator'
  )}  is a command-line tool designed to 
  ${chalk.blue('Simplify')} and ${chalk.blue(
    'Automate'
  )} the creation of comprehensive ${chalk.blue(
    'README files'
  )} for your software projects
  `);
  console.log(`⭐️ Star our GitHub repo and light up the way!:
                      \n
                      https://github.com    
`);
}

async function askForReadmeType() {
  let answer = await inquirer.prompt({
    type: 'list',
    name: 'type',
    message: 'choose one of the options down below:',
    choices: [
      'Code of conduct template',
      'Contributing template',
      'License file',
      'Security policy template',
      'Issue templates',
      'Pull request template',
    ],
  });
  return answer;
}

async function handleReadMeTypeAnswer(type) {
  if (type === 'License file') {
    let licenseType = await askForLicenseType();
    createLicenseFile(licenseType);
  }else{
    console.log('coming soon !');
  }
}

async function askForAuthorName() {
  let answer = await inquirer.prompt({
    type: 'input',
    name: 'AuthorName',
    message: 'Who is the author ?',
  });
  return answer.AuthorName;
}

async function init() {
  // const intro_spinner = addSpinner('intro', 'loading ...', 'blue');
  // await sleep(2000);
  // intro_spinner.success({ text: 'Hi and Welcome !' });
  // showBanner();
  // showIntroduction();
  let readme = await askForReadmeType();
  await handleReadMeTypeAnswer(readme.type);
}

async function askForLicenseType() {
  let answer = await inquirer.prompt({
    type: 'list',
    name: 'type',
    message: 'choose your license:',
    choices: ['MIT'],
  });
  return answer.type;
}

async function createLicenseFile(type = 'MIT') {
  if (type === 'MIT') {
      createMITLicenseFile();
  }
}

async function createMITLicenseFile(){
  let author = await askForAuthorName();
  let currentYear = new Date().getFullYear();
  let MITTemplate = `
  MIT License

  Copyright (c) ${currentYear} ${author}
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.\n
  `;
  fs.writeFileSync(__dirname + '/LICENSE', MITTemplate, {
    flag: 'a',
    encoding: 'utf-8',
  });
}

init();
