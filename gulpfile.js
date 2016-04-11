"use strict";
const gulp = require('gulp-param')(require('gulp'), process.argv)
,			babel = require("gulp-babel")
,			watch = require("gulp-watch")
,			fs = require("fs")
,			mkdirp = require('mkdirp')
,			clc = require('cli-color')
,			error = clc.red.bold
,			warn = clc.yellow
,			notice = clc.blue
,			done = clc.green;

gulp.task("es6",function() {
	watch("src/js/**/*.js",function() {
			gulp.src("src/js/**/*.js")
			.pipe(babel({
				presets: ['es2015']
			}))
			.on("data",function(chuck) {
				console.log(chuck);
			})
			.pipe(gulp.dest('build/js'));		
	})
})

gulp.task("generate:partial",function generatePartials(name) {
	if(name) {
		const source = `./views/partials/${name}/`;
		console.log(notice("Creating partial..."))
		mkdirp(source,function(err) {
			if(err) throw err;
			//success
			fs.writeFile(`${source+name}.hbs`,`<div class="wrap-${name}"></div>`,function() {
				console.log(notice(`Created: ${source+name}.hbs`));
				var path = `aside:/${name}/../views/partials/${name}/${name}`;
				var partialConfig = `./config/partials.json`;	
				console.log(notice(`
Try to update partials configuration if this don't work please append:
${clc.blue.bgWhite.underline( `${path}` )}
at: ${clc.blue.bgWhite.underline( `${partialConfig}` )} file!!!
					`))
				fs.readFile("./config/partials.json","utf8",function(err,data) {
					if(err) throw err;
					data = JSON.parse(data);
					data[name] = `/../views/partials/${name}/${name}`;
					console.log(notice("reading ./config/partials.json file"))
					fs.writeFile("./config/partials.json",JSON.stringify(data),function(err) {
						if(err) throw err;
						console.log(notice("updating ./config/partials.json file!!!"))
						console.log(done("Finisth task partials Created with success!!!"))
					})
				})
			})	
		})
	} else {
		throw "partial name is require please, do provide a name with the flag --name";
	}
})

gulp.task("generate:script",function (name) {
	if(name) {
		mkdirp(`./src/js/${name}`,function (err) {
			if(err) throw err;

			fs.writeFile(`./src/js/${name}/${name}.js`,`
function ${name}() {
	//do stuff
}//end ${name}
`,function (err) {
	if(err) throw err;
		var path = `"source":"/${name}/${name}.js"`;
		var scriptConfiguration = `./src/scripts/scripts.json`;	
		console.log(notice(`
Try to update script list configuration if this don't work please append:
${clc.blue.bgWhite.underline( `${path}` )}
at: ${clc.blue.bgWhite.underline( `${scriptConfiguration}` )} file!!!
					`))
			fs.readFile("./src/scripts/scripts.json","utf8",function(err,data) {
				if(err) throw err;
				data = JSON.parse(data);
				data.push({source:`/js/${name}/${name}.js`})
				fs.writeFile("./src/scripts/scripts.json",JSON.stringify(data),function (err) {
					if(err) throw err;
					console.log(done("scripts list configuration updated!!!"));
				})
			})
		})
})
	}	 else {
		throw "script name is require please, do provide a name with the flag --name"
	}

})

gulp.task('default',["es6"]);


