const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get the token
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization needed' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Token is not valid' });
  }
};
