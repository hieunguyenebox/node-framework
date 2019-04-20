
import passport from './passport'

export const bootstrap = () => {

    passport.init()
}

// for graphql
export const Query = `
    me(name: String): User
    checkForgetToken(token: String!): Response
`
export const Mutation = `

    login(email: String!, password: String!): Response
    forgotPassword: Response
    resetPassword(email: String!, token: String!, password: String!): Response
    updateMe(info: Info): Response
`
export const Type = `

    input Info {

        name: String
    }

    type User {
        name: String
        
    }
`

export const Value = {

    me: auth(() => ({name: 'hieu'}))
}