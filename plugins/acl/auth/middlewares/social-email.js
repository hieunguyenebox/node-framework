
import passport from 'passport'

export const withVerifyEmail = (social, req, res, next) => {

	const auth = passport.authenticate(social, (err, user, result) => {

		if (result.missing_email) {

			req.session[social] = user
			req.session.socialType = social
			res.redirect(`/login/confirm-email?name=${encodeURI(user.name)}`)

		} else {

			req.logIn(user, () => {})
			next()	
		}
	})


	return auth(req, res)
}