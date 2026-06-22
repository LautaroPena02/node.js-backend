const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('No tenes acceso a la parte privada');
  //res.redirect('/login');
};

export default isAuthenticated;
