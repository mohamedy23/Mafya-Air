const  jwt = require("jsonwebtoken");
const Token = require("../model/token.js");

const access_key='ee0d55e175ce42e2793234775bcb39cd786317223bb65951957de78b3bd4f5eb07aeafd2c1b546e159e2c0282f60b65f7a9a575ae9392e7e28b29e56e6e4b1ad';
const refresh_key='f82c91617d3da7563a4ba72131be4c7b66036cd1104cf09d23f7cfea75dbaf8518eb9a09a22430bbf2ddf181d6887a539313ef3fec5835d2910839387231b879';

const generateToken =(id) => {
  return  jwt.sign({ id }, access_key, {
    expiresIn: "10d",
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, refresh_key, {
    expiresIn: "20d",
  });
};

module.exports= {
  generateToken,
  generateRefreshToken,
  access_key,
  refresh_key
}

