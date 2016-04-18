"use strict";
module.exports = function(req,res,next) {
	let body = req.body;

	if(!body.password) return res.status(400).json({success:false,message:"missing password"})
	if(!body.username) return res.status(400).json({success:false,message:"missing username"})
  //TODO pass by regular expretion
	if(req.session && req.session.isLogin) return res.status(403).json({success:false,message:"Is already login"});
	next();
}
