
import passport from './passport'

export const bootstrap = (): void => {

    passport.init()
}

// for graphql
export const Query: string = `
    me(name: String): User
    checkForgetToken(token: String!): Response
`
export const Mutation: string  = `

    login(email: String!, password: String!): Response
    forgotPassword: Response
    resetPassword(email: String!, token: String!, password: String!): Response
    updateMe(info: Info): Response
`
export const Type: string = `

    input Info {

        name: String
    }

    type User {
        name: String
        
    }
`

export const Value: object = {

    // me: auth(() => ({name: 'hieu'}))
}