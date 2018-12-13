

// ----------------------- generate token and send email ----------------------

const generateToken = (email) => {


}

const SendForgotPasswordMail = (email) => {

	UserModel.findOne({email}).select('id').then(user => {

		if (user) {

			const token = generateToken(email)

			ForgotPasswordModel.create({
				email,
				token
			})
		}
	})

	return { ok: 1, msg: "An email has sent to your email" }
}


/**
 * ----------------------- verify token and update password----------------------
 */


const validatePassword = pass => {

	if (!pass || pass.length < 8) return false;

	return true;
}

const verifyToken = (token) => {


}

const tokenExist = (token, email) => {

	return ForgotPasswordModel.findOne({token, email})
}

const updatePassword = ({token, email, password}) => {

	const validToken = verifyToken(token)
		, isValidPass = validatePassword(password)

	const tokenExist = tokenExist(token, email)

	if (!tokenExist) return { ok: 0, errors: 'Link is expired.' }
}

