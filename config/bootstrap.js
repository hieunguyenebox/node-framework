
module.exports = {

	modules: [
		
	]
	,
	plugins: [
		
		"lang",
		// load this first for connect to database
		"db",
		"server",
		// put you plugins before this
		"server-error-handler",
	]

}