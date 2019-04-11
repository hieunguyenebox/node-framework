

import passport from 'passport'
import { login } from 'plugins/acl/auth/services/login'

const LocalStrategy = require('passport-local').Strategy

const init = () => {

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, login))
}

export default { init }