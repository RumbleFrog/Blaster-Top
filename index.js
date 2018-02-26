#!/usr/bin/env node

const app = require('commander')
    , fs = require('fs')
    , util = require('util')

app
  .version('0.0.1')
  .option('-k, --key [key]', 'Get top by a specific key')
  .option('-r, --rule [rule]', 'Get top by a specific convar')
  .option('-f, --file [file]', 'Blaster JSON file to parse')
  .option('-o, --outfile [file]', 'Output file')
  .parse(process.argv);

if ((!app.key && !app.rule) || (!app.key == !app.rule) || !app.file || !app.outfile)
  app.help();

if (typeof app.file != 'string', typeof app.outfile != 'string')
  app.help();

let json;
const sorted = {};
const data = {};

if (app.key) {
  if (typeof app.key === 'boolean') app.help();

  readData()
    .then(() => {
      if (typeof json[0][app.key] === 'undefined') {
        console.log('Unable to find key');
        process.exit(1);
      }

      json.forEach((server) => {
        if (server.hasOwnProperty(app.key)) {
          if (data.hasOwnProperty(server[app.key])) data[server[app.key]]++;
          else data[server[app.key]] = 1;
        }
      })

      keysSorted = Object.keys(data).sort(function(a,b){return (data[a]-data[b]) * -1})

      keysSorted.forEach(key => sorted[key] = data[key]);

      fs.writeFile(app.outfile, JSON.stringify(sorted, null, 4), (err) => {
        console.log(err);
        process.exit(1);
      });

    })
    .catch(e => {throw e});
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
