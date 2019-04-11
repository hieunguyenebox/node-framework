

import passport from 'passport'
import AuthService from 'plugins/acl/auth/auth-service'
import config from 'backend/config'

const FacebookStrategy = require('passport-facebook').Strategy

const init = () => {

	const { FACEBOOK_APP_ID: clientID, FACEBOOK_APP_SECRET: clientSecret } = process.env

	passport.use(new FacebookStrategy({
		clientID,
		clientSecret,
		callbackURL: config.get('auth.facebook.callback'),

	}, AuthService.loginByFacebook))
}

export default { init }