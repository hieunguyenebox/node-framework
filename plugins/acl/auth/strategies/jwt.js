
import logger from 'plugins/lib/logger'
import config from 'plugins/lib/config'
import User from 'plugins/acl/user/models/user-model'
import Group from 'plugins/acl/group/group-model'
import app from 'plugins/lib/server/app'
import { Strategy as LocalStrategy } from 'passport-local'

var passport = require('passport')

var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;


const secret = process.env.SECRET

export default {

	init () {

		const loginOpts =  config.get('jwt.login')

		var opts = {

			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: secret,
			...loginOpts
		}

		passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

			const { id } = jwt_payload

			User.findOne({_id: id}).then(user => {

				user && user.isActive() ? done(null, user) : done(null, false)
			})
		}))

	}
}