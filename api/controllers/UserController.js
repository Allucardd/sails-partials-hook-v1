"use strict";
const partials = sails.config.globals.partials;
const scripts = sails.config.globals.scripts;

module.exports = {
	update:function(req,res) {
		res.deferUser();
	},
  get: function (req, res) {
  	user.find()
  			.populate("posts",{
  				sort: 'createdAt DESC'
  			})
  			.then(function(docs) {
  				_.map(docs,(doc)=> delete doc.password)
  				res.json(docs);
  			})
  			.catch(function(err) {
  				res.serverError(err);
  			})

  	/*
  	console.log(partials,"partials")
  	res.view("homepage",{partials,scripts});
  	*/
  },

};
