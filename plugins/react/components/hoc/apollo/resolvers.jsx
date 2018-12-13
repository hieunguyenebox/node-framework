
import '@babel/polyfill'
import gql from "graphql-tag"

export default {

	Mutation: {

		login: async (_, vars, { cache, getCacheKey }) => {

			return helper.fetch(
				apis.login,
				{ body: vars.user, method: 'post', json: true}
			)
		}
	},
	
	Query: {

		lang: async (_, vars, { cache, getCacheKey }) => {

			// const result = await helper.fetch(apis.lang)

			// return { lang: result.data }
		}
	}
}