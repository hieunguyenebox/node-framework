
export const Query = `
	
	userInfo: User
`

export const Mutation = `

	updateInfo (user: UserInput!): Response
	register (user: UserInput!): Response
	logout: Response
	activeAccount(token: String, email: String): Response
	uploadAvatar(file: Upload): Response
	updatePassword(oldPassword: String!, newPassword: String!): Response
	forgotPassword(email: String!): Response
	resetPassword(token: String!, password: String!): Response

`
export const Type = `

	type User {
		id: String
		name: String
		avatar: String
		email: String
	}

	input UserInput {
		name: String
	}
`

export const Value = {

	userInfo: (args, req) => {

		if (!req.user) return null;

		const allowFields = ['name', 'email', 'avatar']

		const info = {}

		allowFields.forEach(field => {

			info[field] = req.user[field]
		})

		return info
	}
}
