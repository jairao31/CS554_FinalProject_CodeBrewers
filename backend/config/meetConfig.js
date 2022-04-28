const env = process.env.NODE_ENV || "production";

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
  development: {
    APIKey: "5cRP96RlSZeHH-bhQfRJ1g",
    APISecret: "qrfDEFjAkRXmTf9nrhycOkiaGP6Uib3urfvi",
  },
  production: {
    APIKey: "5cRP96RlSZeHH-bhQfRJ1g",
    APISecret: "qrfDEFjAkRXmTf9nrhycOkiaGP6Uib3urfvi",
  },
};

module.exports = config[env];