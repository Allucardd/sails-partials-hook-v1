"use strict";
module.exports = {
	serve:function (req,res) {
		res.view("login");
	},
	getIn:function(req,res) {
		let query = {firstName:req.body.username};
		let data = {password:req.body.password};
		res.deferLogin(query,data);
	},
	logOut:function(req,res) {
		if(!req.session.isLogin) return res.status(403).json({message:"user is already log out",success:false});
	  req.session.destroy((err)=> err ? res.status(500).json({message:"error when try to log out",success:false}) : res.json({message:"log out done",success:true}));
	}
};
