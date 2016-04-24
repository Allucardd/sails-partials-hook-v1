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
		loginOnce:{
			type:"boolean",
			defaultsTo:false
		},
		thumbnails:{
			type:"string",
			size:500,//Miatura de la imagen principal
			defaultsTo: function() {
      	return uuid.v4();
    	}
		},
		firstName:{
			type:"string",
			required:true
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
	beforeCreate:function(data,next) {
		let self = this;
		count++
		bcrypt.hash(data.password,10,function(err,hash) {
			if(err) return next(err);
			data.password = hash;
			console.log(count,"count",hash)
			next();
		})
	}
};
