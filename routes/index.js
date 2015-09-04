/**
 * @file Static routes
 * @module routes
 */
module.exports = {
	
	/** GET index.html */
	index: function(req, res) {
		res.render('index', { });
	}
};