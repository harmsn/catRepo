function getRandomString(length = 10) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

module.exports = { getRandomString };
