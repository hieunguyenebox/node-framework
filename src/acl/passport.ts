
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import UserService from './services/user-service'
import { IUser } from 'types/user';

const init = () => {

    // passportjs
    passport.serializeUser((user: IUser, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {

        UserService.getUserById(id).then((user: IUser | null) => {

            if (user) done(null, user);
            else done({msg: 'User not found'}, null);
        })
    })


    passport.use(new LocalStrategy(UserService.login))

    return true

}

export default { init }