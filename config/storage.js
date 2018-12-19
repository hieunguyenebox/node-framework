
var path = require( 'path' )

const oneMB = 1024 * 1024

module.exports = {

	default: 'local',
	
	local: {

		upload_dir: path.resolve(process.cwd(), 'public/uploads'),
		public_path: '/uploads',
		storage_name: 'local'
	},

	limit: {
		maxFileSize: oneMB, // 100MB
		maxFiles: 10,
	},
}