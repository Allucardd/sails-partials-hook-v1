const partials = sails.config.globals.partials;
const scripts = sails.config.globals.scripts;

module.exports = {
  serve: function (req, res) {
  	console.log(partials,"partials")
  	res.view("homepage",{partials,scripts});
  }
};