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

      json.forEach((server) => {
        if (server.hasOwnProperty(app.key)) {
          if (data.hasOwnProperty(server[app.key])) data[server[app.key]]++;
          else data[server[app.key]] = 1;
        }
      })

      keysSorted = Object.keys(data).sort(function(a,b){return (data[a]-data[b]) * -1})

      keysSorted.forEach(key => sorted[key] = data[key]);

      fs.writeFile(app.outfile, JSON.stringify(sorted, null, 4), (err) => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
      });

    })
    .catch(e => console.log(e));
} else if (app.rule) {
  if (typeof app.rule === 'boolean') app.help();

  readData()
    .then(() => {

      json.forEach((server) => {
        if (server.hasOwnProperty('rules')) {
          if (server.rules.hasOwnProperty(app.rule)) {
            if (data.hasOwnProperty(server.rules[app.rule])) data[server.rules[app.rule]]++;
            else data[server.rules[app.rule]] = 1;
          }
        }
      })

      keysSorted = Object.keys(data).sort(function(a,b){return (data[a]-data[b]) * -1})

      keysSorted.forEach(key => sorted[key] = data[key]);

      fs.writeFile(app.outfile, JSON.stringify(sorted, null, 4), (err) => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
      });

    })
    .catch(e => console.log(e));
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
