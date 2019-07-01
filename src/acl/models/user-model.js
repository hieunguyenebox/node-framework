
import { mongodb } from '@root/core'
import { Schema } from 'mongoose'
import password from '@root/lib/password'

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
        type: String,
    },
    salt: {
        required: true,
        type: String,
    },
    status: {
        enum: ['active', 'inactive', 'pending', 'blocked'],
        default: 'pending',
        type: String,
        required: true
    }

}, {
    timestamps: true
})

class User {

    isActive () {
        return this.status === 'active'
    }

    async matchPassword (inputPass) {

        return password.compare(this.password, inputPass, this.salt)
    }
}

UserSchema.loadClass(User)

const Model = mongodb.model('user', UserSchema)

export default Model