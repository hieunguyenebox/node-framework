
import User from 'plugins/acl/user/models/user-model'

/**
 * author: hieu nguyen
 * desc: make sure account is active
 */
const isLock = (user) => {

	if (user) {

		if (user.isPending()) return 'You has not confirmed email';

		if (!user.isActive()) return 'Your account is locked';

		return false;
	}

	return 'Incorrect Email or Password';
}

export const login = (email, password, done) => {

	User.findOne({email})
		.then(user => {

			const errMsg = isLock(user)

			if (errMsg) return done(null, false, { message: errMsg });

			if (user.matchPassword(password))
				done(null, user)
			else
				done(null, false, { message: 'Incorrect Email or Password'})
		})
}
