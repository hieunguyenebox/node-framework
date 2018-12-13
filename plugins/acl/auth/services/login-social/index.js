
import User from 'plugins/acl/user/models/user-model'
import config from 'plugins/lib/config'
import logger from 'plugins/lib/logger'
import request from 'request-promise'
import 'babel-polyfill'
import { isLock } from '../login'

const status = config.get('status')
	, model = User

const registerUser = async (provider, profile) => {

	return User.create(user)
}

const loginBySocial = async (provider, profile, done) => {

	let user = await User.findOne({$or: [{ email: profile.email}, {[provider + '.id']: profile.id}]})

	if (!user) {

		if (!profile.email) return done(null, profile, { missing_email: true });

		try { user = await registerUser(provider,  profile) }
		catch (ex) {

			logger.error(ex);
			done(null, false, { message: 'Failed to create account. Please try again.' })
		}
		
	} else {

		user[provider] = profile
		user.markModified(provider)
		await user.save()
	}

	const errMsg = isLock(user)

	if (errMsg) return done(null, false, { message: errMsg });

	return done(null, user)
}

const emailExisted = async (email, id) => model.findOne({ $or: [{email}, {'facebook.id': id}] }).select('email facebook.id')


// in case facebook account is phone number
const confirmSocialEmail = async (req) => {

	const socialType = req.session.socialType
		, data = req.session[socialType]
		, email = req.body.email;

	const emailExisted = await emailExisted(email, data.id);

	if (emailExisted) return { ok: 0, msg: emailExisted.facebook ? 'This social account has been taken' : 'Email has been taken' }

	if (data) {

		data.email = email

		return loginBySocial(socialType, data, (err, user, result) => {

			if (err) {
				logger.error(err)
				return {ok: 0, msg: result.message};
			}

			if (user && user.email) {

				return req.login(user, (errLogin) => {

					if (errLogin) return {ok: 0, msg: 'Failed to create account. Please try again.'}

					delete req.session.socialType
					delete req.session[socialType]

					return {ok: 1}
				})
			}

			return {ok:0, msg: result.message}
		})
	}

	return {ok: 0}
}
