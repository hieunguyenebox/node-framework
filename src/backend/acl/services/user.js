
import UserModel from '../models/user-model'
import { __ } from 'i18n';
import { logger } from 'handlebars';

/**
 * author: hieunguyen
 * desc: Login user
 */
const login = (email, password, done) => {

    UserModel.findOne({email}).then(user => {

        if (user && user.matchPassword(password)) {

            if (user.isActive())
                done(null, {id: user.id})
            else
                done(null, false, { msg: __('user_not_active') })
        } else {

            done(null, false, { msg: __('incorrect_credential') })
        }
    }).catch(err => {

        logger.error(err)
        done(null, false, { msg: __('broken') })
    })
}

/**
 * author: hieunguyen
 * desc: Get user info by id
 */
const getUserById = userid => {

    return UserModel.findOne({_id: userid})
}


export default {
    login
}