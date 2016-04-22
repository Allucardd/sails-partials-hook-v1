"use strict";
module.exports = function() {
	var req = this.req;
	var res = this.res;
	var id = req.session.userId;

	var newPassword = req.body.newPassword;
	var oldPassword = req.body.oldPassword;

	if(oldPassword && newPassword) {
		newPassword = String(newPassword);
		oldPassword = String(oldPassword);

		user.findOne({id})
		.then(function(docs) {
			if(docs) {
				bcrypt.compare(oldPassword,docs.password,function(error,isMatch) {
					if(error) return res.status(500).json({error:error,message:"server error",success:false});

					if(isMatch) {
						bcrypt.hash(newPassword,10,function(error,hash) {
							if(error) return res.status(500).json({error:error,message:"server error",success:false});
							docs.password = hash;
							docs.save(function(error,saved) {
								if(error) return res.status(500).json({error:error,message:"server error",success:false});
								res.json({message:"data updated",success:true});
							})
						})
					} else {
						res.status(400).json({message:"bad password",success:false});
					}
				})
			} else {
				res.status(404).json({message:"User not found",success:false});
			}
		})
		.catch(function(error) {
			res.status(500).json({error:error,message:"server error",success:false});
		})
	} else {
		res.status(400).json({message:"missing all parameters"});
	}
}//end defer user
