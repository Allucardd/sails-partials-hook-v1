"use strict";
const xlsx = require('node-xlsx');
const _ = require("underscore");
const fs = require("fs");
const uuid = require("node-uuid");

function getRandom(users,equal) {
	var pos = _.random(0,users.length-1);
	var random = users[pos];
	return {user:random,pos};
}//end getRandom

function generate_answers(users) {
	let result = [];
	_.each(users,function(user,index) {
		_.each(user.items,function(item) {
			var userRandom = getRandom(users);
			var respuesta = [{
				body:"respuesta..",
				username:userRandom.user.items[0].username,
				thumbnails:Date.now(),
				owner:userRandom.user.items[0].id,
				id:uuid.v4()
			}]
			users[index]["items"][0]["answers"] = respuesta

		  result.push({
		  	model:"answer",
		  	items:respuesta
		  })//end results
		})
	})

	fs.writeFile("./fixtures/answer.json",JSON.stringify(result),function() {
	 	console.log("answer generated");
	 	generate_post(users)
  })

}//end generate answers
var c = [];

function generate_post(users) {
	let result = [];
	_.each(users,function(user,index) {
		_.each(user.items,function(item,next) {
			var r = _.some(result,function(d) {
				return d.title === ("titulo "+index);
			})

			if(r) {
				console.log("repite","titulo "+index);
			}

				c.push(index);
				result.push({
					model:"post",
					items:[{
						title:"titulo "+index,
						owner_username:item.username,
						category: index%2 === 0 ? "psicologia" : "ing-sistemas",
						description:`
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Animi labore quis tempore necessitatibus? Minus soluta eaque facilis nobis at, odit,
							dignissimos facere, repellendus pariatur delectus nemo nisi, alias perferendis minima. ${index}
						`,
						answers:item.answers[0]["id"],
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
	//			data[i]["push"]("Contraseña")

//				data[i][5]  = _.reject(data[i][5].split(" ").reverse(),(ele)=> !ele[0] ? true : false).join(" ");

				var username = data[i][5];
				var complete = data[i][5].split(" ");
				var firstName = complete[complete.length-2];
				var cc = data[i][4];

//				let short_pass = uuid.v4().split("-")[0];
//				data[i][7] = short_pass;
				result.push({
					model:"user",
					items:[{
						 password:data[i][4],
						 username,
						 firstName,
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
		generate_answers(result);
	});

}//generate users

generate_users();
