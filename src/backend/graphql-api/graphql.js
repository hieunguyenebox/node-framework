import graphqlHTTP from 'express-graphql'
import './custom-types'
import { buildSchema } from 'graphql'
import path from 'path'
import { Query, Mutation, Type, Value } from 'backend/acl'

const schema = buildSchema(`
    scalar JSON
    scalar Upload
    scalar DateTime

    type Query {
        ${Query || ''}
    }

    type Response {
        succcess: Boolean!
        msg: JSON
        data: JSON
    }

    type Mutation {
        ${Mutation || ''}
    }

    ${Type || ''}

    input Pagination {
        page: Int = 1
        limit: Int = 10
        filter: JSON
    }
`)

const values = {
    ...Value
}

export const createNodes = () => graphqlHTTP((request, response, graphQLParams) => {

    return {
        schema,
        rootValue: values,
        graphiql: process.env.NODE_ENV === 'development'
        // formatError (err) {
        // 	return {
        // 		message: '',
        // 		code: err.message,
        // 		locations: err.locations,
        // 		path: err.path
        // 	};
        // }
    }
})