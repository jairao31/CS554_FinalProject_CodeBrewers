const env = process.env.NODE_ENV || "production";

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
  development: {
    APIKey: "BwHta7ltT6u9RyDtH0UuAw",
    APISecret: "5TdQRasdiTr9mIqkLp71I7uu6Y64EErxMcML",
  },
  production: {
    APIKey: "BwHta7ltT6u9RyDtH0UuAw",
    APISecret: "5TdQRasdiTr9mIqkLp71I7uu6Y64EErxMcML",
  },
};

module.exports = config[env];
