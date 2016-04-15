"use strict";
module.exports = {
  attributes: {
 		id:{
			type:"string",
			primaryKey:true,
			defaultsTo:function() {
				return uuid.v4()
			}
		},
		body:{
			type:'string',
			size:10000
		},
		thumbnails:{type:'string'},
		username:{type:'string'},
		owner:{type:'string'}
  }
};
