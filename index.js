#!/usr/bin/env node

const app = require('commander')
    , fs = require('fs')
    , util = require('util')

app
  .version('0.0.1')
  .option('-k, --key [key]', 'Get top by a specific key')
  .option('-r, --rule [rule]', 'Get top by a specific convar')
  .option('-f, --file [file]', 'Blaster JSON file to parse')
  .option('-l, --limit [limit]', 'Limit to X top entries', 100)
  .parse(process.argv);

if ((!app.key && !app.rule) || (!app.key == !app.rule) || !app.file)
  app.help();

if (typeof app.limit != 'number' || typeof app.file != 'string')
  app.help();

let json;

if (app.key) {
  if (typeof app.key === 'boolean') app.help();

  readData();
}

async function readData() {
  try {
    json = JSON.parse(await util.promisify(fs.readFile)(app.file));
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('Unable to read file');
      process.exit(1);
    } else throw e;
  }
}
