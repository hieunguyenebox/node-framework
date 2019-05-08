

export default `

	type Menu {
		url: String,
		icon: String,
		children: [Menu],
		title: String
	}
	
	Mutation {

	}

	type User {

		name: String,
		email: String
	}

	input UserInput {
		id: String
		name: String
		picture: Upload
		groups: [String]
	}

	Query {
		userInfo: User
		menu: [Menu]
		token: String
		providers: [Provider]
	}

	type Provider {
		id: String!
		name: String!
	}
`