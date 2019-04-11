
import 'babel-polyfill'
import { loginBySocial } from './index'

export const loginByGoogle = async (token, tokenSecret, profile, done) => {

	const userProfile = {

		...profile,
		email: profile.emails[0].value,
		avatar: profile.photos[0].value,
		name: profile.displayName,
		accessToken: token,
		tokenSecret
	}

	loginBySocial('google', userProfile, done)
}

