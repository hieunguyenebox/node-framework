
import validator from 'validator'
import UserModel from '../models/user-model'

const validateRegisterUser = (user) => {

	const rules = [
		{
			name: 'email',
			rule: 'isEmail',
			msg: 'Email is incorrect format.',
		},
		{
			name: 'name',
			rule: 'isName',
			msg: 'Name is incorrect format.',
		},
		{
			name: 'password',
			rule: 'gt|7',
			msg: 'Password must be at least 8 character.',
		},
	]

	const validation = validator.run(rules, user)

	return validation
}

const register = (user) => {

	const validation = validateRegisterUser(user)

	if (!validation.ok) return { ok: 0, msg: validation.errors }

	UserModel.create(user).then(result => result ? {ok: 1} : {ok: 0})
}

const activeAccount = () => {
	
	const { id } = helper.verifyToken(token, secret, config.get('jwt.active_account'))

	return this.model.findOne({
		_id: id,
		tokens: {
			register: token
		}
	}).then(user => {

		if (!user) return { ok: 0, msg: lang('errors.active_account') };

		user.status = this.status.name.active
		delete user.tokens.register

		user.markModified('tokens')

		return user.save().then(() => ({ok: 1}))

	}).catch(ex => {

		logger.error(ex)
		return {ok: 0, msg: lang('errors.active_failed')}
	})
}