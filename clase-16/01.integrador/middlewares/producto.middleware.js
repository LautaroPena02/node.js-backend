import { validationResult } from 'express-validator';

const productoMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), old: req.body });
  }

  next();
};

export default productoMiddleware;
