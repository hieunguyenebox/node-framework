
import passport from './passport'

export const bootstrap = () => {

    passport.init()
}

// for graphql
export const Query = `
    me: User
`
export const Mutation = `

`
export const Type = `

    type User {
        name: String
        
    }
`

export const Value = {

}