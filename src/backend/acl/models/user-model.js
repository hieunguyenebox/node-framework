
import { mongodb } from 'backend/core'
import { Schema } from 'mongoose'
import { password } from 'backend/lib'

const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        required: true,
        type: String
    },
    // use to show public or for seourl, prevent show user email
    username: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
    },
    salt: {
        required: true
    },
    status: {
        enum: ['active', 'inactive', 'pending', 'blocked'],
        default: 'pending',
        required: true
    }

}, {
    timestamps: true
})

class User {

    isActive () {
        return this.status === 'active'
    }

    matchPassword (inputPass) {

        return password.compare(this.password, inputPass, this.salt)
    }
}

UserSchema.loadClass(User)

const Model = mongodb.Model('user', UserSchema)

export default Model