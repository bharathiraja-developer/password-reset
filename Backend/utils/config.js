require("dotenv").config();

const URI = process.env.URI;
const PORT = process.env.PORT;
const USER_NAME = process.env.MAIL_USERNAME;
const PASSWORD = process.env.MAIL_PASSWORD;
const ID = process.env.ID;
const SECRET = process.env.SECRET;
const TOKEN = process.env.TOKEN;

module.exports = {
  URI,
  PORT,
  USER_NAME,
  PASSWORD,
  ID,
  SECRET,
  TOKEN,
};
