#! /usr/bin/env node

const app = require('commander');
const colors = require('colors');
const cp = require('copy-paste');
const Nonsense = require('../index');
const pkg = require('../package.json');

const nonsense = new Nonsense();

app
  .command('paragraphs')
  .option('<length>')
  .option('-c, --copy', 'copy to clipboard')
  .option('-H, --html', 'output as HTML')
  .description('create a number paragraphs')
  .action((length = {}, options = {}) => {
    const html = length.html || options.html;
    const copy = length.copy || options.copy;
    const paragraphs = nonsense.paragraphs(parseInt(length), html);

    if (copy) {
      cp.copy(paragraphs);
    }
    console.log(colors.yellow.bold(paragraphs));
  });

app
  .command('sentences')
  .option('<length>')
  .option('-c, --copy', 'copy to clipboard')
  .description('create a number sentences')
  .action((length = {}, options = {}) => {
    const copy = length.copy || options.copy;
    const sentences = nonsense.sentences(parseInt(length));

    if (copy) {
      cp.copy(sentences);
    }
    console.log(colors.yellow.bold(sentences));
  });

app
  .command('words')
  .option('<length>')
  .option('-c, --copy', 'copy to clipboard')
  .description('create a number words')
  .action((length = {}, options = {}) => {
    const copy = length.copy || options.copy;
    const words = nonsense.words(parseInt(length));

    if (copy) {
      cp.copy(words);
    }
    console.log(colors.yellow.bold(words));
  });

app
  .version(pkg.version)
  .parse(process.argv);

if (process.argv.length < 3) {
  app.help()
}
