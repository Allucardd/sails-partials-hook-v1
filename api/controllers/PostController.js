"use strict";
module.exports = {
	get:function(req,res) {
		let id = req.query.id;
		var query = req.query;

		let category = req.query.category;
		let owner = req.session.id;
		if(id) {
			//filter by id
			let query = {id};
			res.deferPost(query);
		} else if(category) {
			//filter by category
			res.deferPost({category});
		} else {
			//see all post
			res.deferPost({});
		}
	}
};
