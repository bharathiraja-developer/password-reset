const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const user = require("../models/user");
const nodemailer = require("nodemailer");
const config = require("../utils/config");

userRouter.post("/", async (request, response) => {
  const { email, name, password } = request.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const User = new user({
    email,
    name,
    passwordHash,
  });
  const saveduser = await User.save();
  response.json(saveduser);
});

userRouter.patch("/:email", async (request, response) => {
  const email = request.params.email;
  let User = await user.findOne({ email });
  if (!User) {
    return response.status(401).json({
      message: "user does not exist",
    });
  }
  const random = () => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let str = "";
    for (let i = 0; i < 6; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.USER_NAME,
      pass: config.PASSWORD,
      clientId: config.ID,
      clientSecret: config.SECRET,
      refreshToken: config.TOKEN,
    },
  });
  let ranstr = random();
  const mailConfigurations = {
    from: "rajabharathi0258@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    html: `<h2>Hi!</h2> <h5>The password reset code is : ${ranstr} </h5>`,
  };
  await User.updateOne({
    passwordHash: ranstr,
  });
  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) console.log(error);
    console.log("Email Sent Successfully");
    response.json({ message: "Password reset code sent sucessfully" });
  });
});
userRouter.patch("/:email/:code/:password", async (request, response) => {
  const email = request.params.email;
  const code = request.params.code;
  const password = request.params.password;
  const newPass = await bcrypt.hash(password, 10);
  let User = await user.findOne({ email });
  if (code !== User.passwordHash) {
    return response.json({ message: "wrong code" });
  }
  await User.updateOne({
    passwordHash: newPass,
  });
  response.json({ message: "password changed sucessfully" });
});

module.exports = userRouter;
