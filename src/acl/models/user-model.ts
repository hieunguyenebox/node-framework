
import { mongodb } from "core"
import { Schema, Model } from 'mongoose'
import password from 'lib/password'
import { IUser } from 'types/user'

/***********************************
 * VARIABLES
 ************************************/
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



/***********************************
 * FUNCTIONS
 ************************************/
UserSchema.methods.isActive = function () {

    return this.status === 'active'
}

UserSchema.methods.matchPassword = async function (inputPass: string) {

    return password.compare(this.password, inputPass, this.salt)
}


/***********************************
 * VARIABLES
 ************************************/
const UserModel: Model<IUser> = mongodb.model<IUser>('user', UserSchema)

export default UserModel