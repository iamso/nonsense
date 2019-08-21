const Nonsense = require('../index');

const nonsense = new Nonsense();

module.exports = (req, res) => {
  const options = {
    ...req.query,
    ...req.body,
  };

  const words = nonsense.words(options.length);

  res.end(words);
}
