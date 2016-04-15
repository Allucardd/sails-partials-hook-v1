"use strict";
module.exports = {
	attributes: {
		id:{
			type:"string",
			primaryKey:true,
			defaultsTo: function() {
      	return uuid.v4();
    	}
		},
		owner_username:{
			type:'string'
		},
		title:{
			type:"string",
			required:true
		},
		category:{
			type:'string'
		},
		description:{
			type:"string",
			size:10000
		},
		owner:{
			model:"user"
		},
		answers:{
			collection: 'answer',
      via: 'owner'
		}
	}//end attributes
};
