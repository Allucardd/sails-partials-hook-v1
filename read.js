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
	let obj = xlsx.parse(__dirname + '/input.xlsx'); // parses a file
	let result  = [];
	_.each(obj,function(current,index) {
		let data = current.data;
		/*
		if(!_.isEmpty(data)) {
			data[0].push("password");
		}
		*/

		if(data) {
			for (var i = 1; i < data.length; i++) {
				data[i]["push"]("Contraseña")


				var username = data[i][5];
				var cc = data[i][4];

				let short_pass = uuid.v4().split("-")[0];
				data[i][7] = short_pass;
				result.push({
					model:"user",
					items:[{
						 password:short_pass,
						 username,
						 cc,
						 id:uuid.v4()
					}]
				});
			}
		}
	})

 var buffer = xlsx.build(obj);
	fs.writeFile("./output.xlsx",buffer,function() {
		console.log("output done");
	})

	fs.writeFile("./fixtures/user.json",JSON.stringify(result),function() {
		generate_post(result);
	});

}//generate users

generate_users();
