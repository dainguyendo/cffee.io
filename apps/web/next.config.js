const withTM = require("next-transpile-modules")(["ui", "db"]);

module.exports = withTM({
  reactStrictMode: true,
});
