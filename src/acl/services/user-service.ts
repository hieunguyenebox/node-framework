
import UserModel from '../models/user-model'
import { logger } from 'core';
import { __ } from 'i18n';
import { IUser } from 'types/user';

/**
 * author: hieunguyen
 * desc: Login user
 */
const login = (email: string, password: string, done) => {

    UserModel.findOne({email}).then((user: IUser | null) => {

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
    login,
    getUserById
}