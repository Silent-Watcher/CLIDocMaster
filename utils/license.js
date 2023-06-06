'use strict';
import fs from 'node:fs';
import path from 'path';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { askForAuthorName, isTheFileGenerated } from './helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createMITLicenseFile() {
  const outputFileName = 'LICENSE';
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

  fs.writeFileSync(__dirname + `/../${outputFileName}`, MITTemplate, {
    flag: 'a',
    encoding: 'utf-8',
  });

  return outputFileName;
}

async function createLicenseFile(type = 'MIT') {
  let processResult;
  let fileName;
  if (type === 'MIT') {
    fileName = await createMITLicenseFile();
    processResult = isTheFileGenerated(fileName);
  }
  return { processResult, fileName };
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

export { askForLicenseType, createLicenseFile };
