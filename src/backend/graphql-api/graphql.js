import graphqlHTTP from 'express-graphql'
import './custom-types'
import { buildSchema } from 'graphql'
import path from 'path'
import { TodoQuery, TodoMutation, TodoTypes, TodoValue } from 'backend/todo'

const schema = buildSchema(`
    scalar JSON
    scalar Upload
    scalar DateTime

    type Query {
        ${TodoQuery || ''}
    }

    type Response {
        succcess: Boolean!
        msg: JSON
        data: JSON
    }

    type Mutation {
        ${TodoMutation || ''}
    }

    ${TodoTypes || ''}

    input Pagination {
        page: Int = 1
        limit: Int = 10
        filter: JSON
    }
`)

const values = {
    ...TodoValue
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