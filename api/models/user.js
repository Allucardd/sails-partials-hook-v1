"use strict";
let count = 0;

module.exports = {
	attributes: {
		id:{
			primaryKey:true,
			type:"string",
			defaultsTo: function() {
      	return uuid.v4();
    	}
		},
		photo:{
			type:"string",
			size:500,
			defaultsTo: function() {
      	return uuid.v4();
    	}
		},
		thumbnails:{
			type:"string",
			size:500,//Miatura de la imagen principal
			defaultsTo: function() {
      	return uuid.v4();
    	}
		},
		username:{
			type:"string",
			required:true
		},
		pass_generated:{
			type:"boolean"
		},
		cc:{
			type:"string",
			required:true,
			unique:true
		},
		password:{
			type:"string",
			required:true
		},
		posts:{
			collection: 'post',
      via: 'owner'
		}
	},//end attributes
	hashPassword:function(data,next) {
		count++
		console.log(count,"count")
		bcrypt.hash(data.password,10,function(err,hash) {
			if(err) return next(err);
			data.password = hash;
			next();
		})
	},
	generatePass:function (data,next) {
		data.password = uuid.v4().split("-")[0];
		next();
	},
	beforeValidate:function(data,next) {
		let self = this;
		if(data.pass_generated) {
			self.generatePass(data,next);
		} else {
			next();
		}
	},
	beforeCreate:function(data,next) {
		let self = this;
		self.hashPassword(data,next);
	}
};
