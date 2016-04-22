"use strict";
module.exports = function handler_login (query,data) {
  var req = this.req;
  var res = this.res;
  user.findOne(query)
	  .then(function(docs) {
	  	if(!docs) return res.notFound({success:false,message:"User not found"});
	  	if(!docs.loginOnce) {
	  		//just execute once
	  		if(!data.password) {
	  			res.status(400).json({success:false,message:"missing cc"});
	  		} else if(docs.cc === data.password) {
		  		docs.loginOnce = true;
		  		docs.save(function(err) {
		  			if(err) return res.serverError(err);
				  	//create session
				  	_.extend(req.session,{username:docs.username,userId:docs.id,isLogin:true,authenticated:true});
				  	req.session.save(function(done) {
				  		console.log("LOGIN ONCE");
				  		res.json({"login_once":true,username:docs.username});
				  	});
				  })
	  		} else {
	  			res.status(404).json({message:"Cedula no encontrada",success:false});
	  		}
	  	}	else {
		  	bcrypt.compare(data.password,docs.password,function(error,response) {
		  		if(error) res.serverError(error);
		  		if(!response) return res.status(400).json({message:"Bad password",success:false});
			  	//create session
		  		_.extend(req.session,{username:docs.username,userId:docs.id,isLogin:true,authenticated:true});
		  		req.session.save((done)=> res.json({success:true,message:"Login"}));
		  	})
	  	}
	  })
	  .catch(function(error) {
	  	res.json({success:false,error});
	  })
}
