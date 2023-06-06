'use strict';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

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
  The CLI README File Generator is a command-line tool designed to 
  simplify and automate the creation of comprehensive README files for your software projects
  `);
}

async function init() {
  const intro_spinner = createSpinner('intro').start({
    text: 'loading ...',
    color: 'cyan',
  });
  await sleep(2000);
  intro_spinner.success({ text: 'Hi and Welcome !'});
  showBanner();
  showIntroduction();
}

await init();

function sleep(ms) {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
}
