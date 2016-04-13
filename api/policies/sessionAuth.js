"use strict";
module.exports = function(req, res, next) {
	let isAuth = req.session.authenticated = true;
  if (isAuth) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.redirect("/login");
};
