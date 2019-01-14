
import passport from 'passport'
import LocalStrategy from './local'
// import FacebookStrategy from './facebook'
// import GoogleStrategy from './google'
import UserModel from 'plugins/acl/user/models/user-model'
import validator from 'validator'

const init = () => {

	passport.serializeUser((user, done) => {

		done(null, user.id)
	})

	passport.deserializeUser((id, done) => {

		if (!validator.isMongoId(id))
			id = null;
		
		UserModel.findOne({_id: id}).populate('groups').then(user => {

			done(null, user)
		})
	})

	LocalStrategy.init()
	// FacebookStrategy.init()
	// GoogleStrategy.init()
}

export default { init }