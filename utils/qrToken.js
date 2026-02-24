const jwt = require("jsonwebtoken");

const signQrToken = (payload, expiresInSeconds) => {
  return jwt.sign(payload, process.env.JWT_SECRET_QR, {
    expiresIn: expiresInSeconds,
  });
};

const verifyQrToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_QR);
};

module.exports = {
  signQrToken,
  verifyQrToken,
};
