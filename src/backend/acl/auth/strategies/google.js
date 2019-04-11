
import passport from 'passport'
import { loginByGoogle } from 'plugins/acl/auth/auth-service'
import config from 'backend/config'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

const init = () => {

	const { GOOGLE_APP_ID: clientID, GOOGLE_APP_SECRET: clientSecret } = process.env

	passport.use(new GoogleStrategy({

		clientID,
		clientSecret,
		callbackURL: config.get('auth.google.callback')
		
	}, loginByGoogle))
}

export default { init }