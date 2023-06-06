#!/usr/bin/node
'use strict';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { askForAuthorEmail } from './utils/helpers.js';
import { askForLicenseType, createLicenseFile } from './utils/license.js';
import { createCodeOfConductFile } from './utils/codeOfConduct.js';
import { createContributionFile } from './utils/contribution.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function sleep(ms) {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
}

function addSpinner(name, text, color = 'blue') {
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
      // 'Security policy template', coming soon !
      // 'Issue templates',          coming soon !
      // 'Pull request template',    coming soon !
      'exit',
    ],
  });
  return answer;
}

async function handleReadMeTypeAnswer(type) {
  if (type === 'License file') {
    let licenseType = await askForLicenseType();
    await startCreationProcess(createLicenseFile, licenseType);
  }
  if (type === 'Code of conduct template') {
    let authorEmail = await askForAuthorEmail();
    await startCreationProcess(createCodeOfConductFile, authorEmail);
  }
  if (type === 'Contributing template') {
    await startCreationProcess(createContributionFile);
  }
  if (type === 'exit') {
    console.log('Get back another time!');
    process.exit(1);
  }
}

async function init() {
  const intro_spinner = addSpinner('intro', 'loading ...', 'blue');
  await sleep(2000);
  intro_spinner.success({ text: 'Hi and Welcome !' });
  showBanner();
  showIntroduction();
  let readme = await askForReadmeType();
  await handleReadMeTypeAnswer(readme.type);
}

init();

async function startCreationProcess(func, param = '') {
  let { processResult, fileName } = await func(param);
  let spinner = addSpinner('spinner', `generating ${fileName}...`);
  await sleep(3000);
  if (processResult) {
    spinner.success({ text: `${fileName} created successfully!` });
  } else {
    spinner.error({ text: 'something went wrong!' });
  }
  let readme = await askForReadmeType();
  await handleReadMeTypeAnswer(readme.type);
}
