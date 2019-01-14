


module.exports = {

	facebook: {

		callback: 'http://localhost:9000/login/fb/cb',
		profileFields: ['id', 'displayName', 'photos', 'email']
	},
	google: {

		callback: 'http://localhost:9000/login/gg/cb',
		scope: [
			'https://www.googleapis.com/auth/plus.login',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}
}