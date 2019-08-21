# nonsense

Heavily inspired by Jeff Holman's nonsense generator. 

CLI/Package to create nonsense text, random words, sentences and paragraphs.

## Install

```bash
npm install -g @iamso/nonsense
```

## Usage

### Programmatically

```javascript
const Nonsense = require('@iamso/nonsense');

const nonsense = new Nonsense();

// get random word(s)
const words = nonsense.words(1);

// get random sentence(s)
const sentences = nonsense.sentences(1);

// get random paragraph(s)
const paragraphs = nonsense.paragraphs(1);

// get random paragraph(s) as HTML
const paragraphsHtml = nonsense.paragraphs(1, true);
```

### Command Line

```bash
# get random word(s)
nonsense words [length]

# get random sentence(s)
nonsense sentences [length]

# get random paragraph(s)
nonsense paragraphs [length]

# get random paragraph(s) as HTML
nonsense paragraphs [length] -H
```

***Note:*** The output of all these commands can automatically be copied to the clipboard by adding the option `-c` at the end.

## License

[ISC License](LICENSE)
