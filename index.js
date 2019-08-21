const path = require('path');
const fs = require('fs');

const DB = path.join(__dirname, 'db');

class Nonsense {
  constructor() {
    this.lists = [
      'interjections',
      'determiners',
      'adjectives',
      'nouns',
      'adverbs',
      'verbs',
      'prepositions',
      'conjunctions',
      'comparatives'
    ];
    this.vowels = ['a', 'e', 'i', 'o', 'u'];
    this.wordlists = {};
    this.output = '';

    for (let list of this.lists) {
      this.wordlists[list] = fs.readFileSync(path.join(DB, `${list}.txt`), 'UTF-8').split('\n');
    }
  }

  words(length = 1) {
    let words = [];

    length = parseInt(length);
    length = Math.max(1, (isNaN(length) ? 1 : length));

    for (let i = 1; i <= length; i++) {
      const list = this.wordlists[randomItem(this.lists)];
      const word = randomItem(list).replace(/\s/ig, '').trim();

      words.push(word.toLowerCase());
    }

    return words.join(' ');
  }

  sentences(length = 1) {
    const type = randomNumber(0,1);
    const lists = {};
    let sentence = '';

    length = parseInt(length);
    length = Math.max(1, (isNaN(length) ? 1 : length));

    for (let i = 0; i < 2; i++) {
      for (let list of this.lists) {
        if (!Array.isArray(lists[list])) {
          lists[list] = [];
        }
        lists[list].push(randomItem(this.wordlists[list]).trim());
      }

      if (lists.determiners[i] == 'a') {
        for (let vowel of this.vowels) {
          if ((type && lists.adjectives[i][0] == vowel) || (!type && (lists.nouns[i][0] == vowel))) {
            lists.determiners[i] = 'an';
          }
        }
      }
    }

    sentence = type ?
      `${lists.interjections[0]}, ${lists.determiners[0]} ${lists.adjectives[0]} ${lists.nouns[0]} ${lists.adverbs[0]} ${lists.prepositions[0]} ${lists.determiners[1]} ${lists.adjectives[1]} ${lists.nouns[1]}.` :
      `${lists.interjections[0]}, ${lists.determiners[0]} ${lists.nouns[0]} is ${lists.comparatives[0]} ${lists.adjectives[0]} than ${lists.determiners[1]} ${lists.adjectives[1]} ${lists.nouns[1]}.`;

    if (length > 1) {
      sentence = `${sentence} ${this.sentences(length - 1)}`;
    }

    return sentence;
  }

  paragraphs(length = 1, html = false) {
    const paragraphs = [];

    length = parseInt(length);
    length = Math.max(1, (isNaN(length) ? 1 : length));

    for (let i = 1; i <= length; i++) {
      const sentences = randomNumber(3,7);
      paragraphs.push(this.sentences(sentences));
    }

    return paragraphs.reduce((all, paragraph, index) => {
      paragraph = html ? wrapHTML(paragraph, 'p') : paragraph;
      paragraph += index < paragraphs.length - 1 ? '\n\n' : '';
      return `${all}${paragraph}`;
    }, '');
  }
}

function wrapHTML(content = '', tag = 'p') {
  return `<${tag}>${content}</${tag}>`;
}

function randomNumber(min = 0, max = 9) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomItem(array) {
  const index = randomNumber(0, array.length - 1);
  return array[index];
}

module.exports = Nonsense;
