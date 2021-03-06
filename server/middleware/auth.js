/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

const authentication = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || header === '') return res.status(401).json({ status: 401, error: 'Authentication failed' });

    const token = jwt.verify(header, 'YOU_OWN_YOUR_OWN');
    req.user = token;
    next();
  } catch {
    return res.status(401).json({ status: 401, error: 'Invalid token!' });
  }
};

export default authentication;
