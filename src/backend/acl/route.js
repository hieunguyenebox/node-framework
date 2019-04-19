
import { route } from 'backend/core'
import passport, { serializeUser, deserializeUser } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import UserService from './services/user'

// passportjs
serializeUser((user, done) => done(null, user.id))
deserializeUser((id, done) => {

    UserService.getUserById(id).then(user => {

        if (user) done(null, user);
        else done({msg: 'User not found'}, null);
    })
})


passport.use(new LocalStrategy(UserService.login))

// init routes
export const initRoutes = () => {

    route.use()
}