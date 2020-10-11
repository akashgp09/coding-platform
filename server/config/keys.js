const GOOGLE_TOKENS = {
  GOOGLE_ACCESS_TOKEN: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_TOKEN_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

// const DB_USER = "SOME USER";
// const DB_PASSWORD = "SOME PASSWPORD";
const MONGODB = {
  MONGODB_URI: process.env.DB_MONGO_URI,
};

const SESSION = {
  COOKIE_KEY: "thisappisawesome",
};

const KEYS = {
  ...GOOGLE_TOKENS,
  ...MONGODB,
  ...SESSION,
};

module.exports = KEYS;
