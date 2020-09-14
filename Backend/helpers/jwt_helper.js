const jwt = require("jsonwebtoken");
var generateToken = (data, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        data: data,
      },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (err, token) => {
        if (err) reject(err);

        resolve(token);
      }
    );
  });
};
var verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decode) => {
      if (err) reject(err);
      resolve(decode);
    });
  });
};
module.exports = {
  generateToken,
  verifyToken,
};
