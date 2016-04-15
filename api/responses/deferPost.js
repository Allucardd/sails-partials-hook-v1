module.exports = function handler_post (query) {
  var req = this.req;
  var res = this.res;

	query = _.extend(query,{sort: 'createdAt DESC'})
  post.find(query)
  	.populate("answers")
  	.then(function(docs) {
  		res.json(docs);
  	})
  	.catch(function(error) {
  		res.serverError(error);
  	})
}
