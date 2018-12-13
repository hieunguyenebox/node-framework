
module.exports = [
	
	// load this first for connect to database
	"lib/db",

	"lib/server",



	// put you plugins before this
	"lib/server-error-handler",
]