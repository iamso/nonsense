const Nonsense = require('../index');

const nonsense = new Nonsense();

module.exports = (req, res) => {
  const options = {
    ...req.query,
    ...req.body,
  };

  const paragraphs = nonsense.paragraphs(options.length, 'html' in options);

  res.end(paragraphs);
}
