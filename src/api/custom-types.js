
import { buildSchema, GraphQLScalarType } from 'graphql'

new GraphQLScalarType({
	name: 'JSON',
	serialize: (v) => {
		return JSON.stringify(v)
	},
	parseValue: v => JSON.parse(v),
	parseLiteral: ast => {

	}
})

new GraphQLScalarType({
	name: 'DateTime',
	serialize: (v) => {
		return v.toString()
	},
	parseValue: v => v,
	parseLiteral: ast => {

	}
})

 new GraphQLScalarType({
	name: 'Upload',
	serialize: (v) => {
		return JSON.stringify(v)
	},
	parseValue: v => {

		JSON.parse(v)
	},
	parseLiteral: ast => {
	}
})