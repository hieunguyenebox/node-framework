
import { route } from '@root/core'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import UserService from './services/user-service'

const init = () => {

    // passportjs
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {

        UserService.getUserById(id).then(user => {

            if (user) done(null, user);
            else done({msg: 'User not found'}, null);
        })
    })


    passport.use(new LocalStrategy(UserService.login))

}

export default { init }