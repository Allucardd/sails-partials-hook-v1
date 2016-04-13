"use strict";
module.exports = {
	attributes: {
		id:{
			type:"string",
			primaryKey:true,
			defaultsTo:function() {
				uuid.v4();
			}
		},
		title:{
			type:"string",
			required:true
		},
		category:{
			type:'string'
		},
		description:{
			type:"string"
		},
		owner:{
			model:"user"
		}
	}//end attributes
};
