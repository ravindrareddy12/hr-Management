const hasRole = (role) => (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === role) {
      return next();
    }
    return res.status(403).json({ message: 'Access denied' });
  };
  
  module.exports = hasRole;
  