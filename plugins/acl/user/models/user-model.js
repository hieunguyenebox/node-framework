
import bcrypt from 'bcrypt'
import lang from 'plugins/lib/lang'
import timestampsOptions from 'plugins/lib/db/timestamps-options'
import config from 'plugins/lib/config'
import { getDB } from 'plugins/lib/db'
import { Schema } from 'mongoose'

const conn = getDB('mongodb.default')

const secret = process.env.SECRET
	, status = config.get('status');

export const UserSchema = new Schema({

	name: String,
	email: {
		type: String,
        unique: true,
		required: [true, 'Email is required'],
		validate: {
			validator: (v) => v ? validator.isEmail(v) : false,
			msg: 'Email is incorrect'
		},
	},
	groups: {
		type: [Schema.Types.ObjectId],
		ref: 'group',
		index: true
	},
	password: {
		type: String,
		default: '',
		set: v => v ? bcrypt.hashSync(v, 12) : ''
	},
	avatar: String,
	status: {
		type: String,
		enum: status.user,
		index: true
	},

}, timestampsOptions())

export class User {

	isPending () {

		return this.status === status.name.pending
	}

	isActive () {

		return this.status === status.name.active
	}

	matchPassword (password) {

		if (!password) return false;

		return bcrypt.compareSync(password, this.password)
	}

	allow (permissions) {

	}
}

UserSchema.loadClass(User)

const Model = conn.model('user', UserSchema)

export default Model
