#!/usr/bin/env node

const {execSync} = require('child_process');



const runCommand = (command)=>{
    try {
        execSync(`${command}`,{stdio:'inherit'});
    } catch (error) {
        console.error(`Failed to execute ${command}`,e);
        return false;
    }
    return true;
}

const startCommand = `npm run start`;

const start = runCommand(startCommand);
if(!start) process.exit(-1);
