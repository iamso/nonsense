const Nonsense = require('../index');

const nonsense = new Nonsense();

module.exports = (req, res) => {
  const options = {
    ...req.query,
    ...req.body,
  };

  const sentences = nonsense.sentences(options.length);

  res.end(sentences);
}
