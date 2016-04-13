"use strict";
const xlsx = require('node-xlsx');
const _ = require("underscore");
const fs = require("fs");
const uuid = require("node-uuid");


function generate_post(users) {
	let result = [];
	_.each(users,function(user,index) {
		_.each(user.items,function(item) {
				result.push({
					model:"post",
					items:[{
						title:"titulo "+index,
						category:"ing-sistemas",
						description:`
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Animi labore quis tempore necessitatibus? Minus soluta eaque facilis nobis at, odit,
							dignissimos facere, repellendus pariatur delectus nemo nisi, alias perferendis minima. ${index}
						`,
						owner:item.id
					}]
				})
		})
	})

	fs.writeFile("./fixtures/post.json",JSON.stringify(result),function() {
		console.log("done");
	});

}//end generate post

function generate_users (cb) {
	let obj = xlsx.parse(__dirname + '/test.xlsx'); // parses a file
	let result  = [];
	_.each(obj,function(current,index) {
		let data = current.data;
		if(data) {
			for (var i = 1; i < data.length; i++) {
				var username = data[i][0];
				var cc = data[i][1];
				result.push({
					model:"user",
					items:[{
						 password:uuid.v4().split("-")[0],
						 username,
						 cc,
						id:uuid.v4()
					}]
				});
			}
		}
	})

	fs.writeFile("./fixtures/user.json",JSON.stringify(result),function() {
		generate_post(result);
	});

}//generate users

generate_users();
