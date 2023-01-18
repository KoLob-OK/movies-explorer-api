const regexUrl = /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:/?#[\]@!$&'()*+,;=]+)/;

const {
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
} = process.env;

module.exports = {
  regexUrl,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
};
