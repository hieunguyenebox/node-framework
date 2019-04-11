
import { getDB } from 'backend/db'
import { Schema } from 'mongoose'
import timestampsOptions from 'backend/db/timestamps-options'
import config from 'backend/config'

const conn = getDB('mongodb.default')
	, status = config.get('status')

const GroupSchema = new Schema({

	name: {
		type: String,
		unique: true,
		required: true
	},
	permissions: [String],
	status: {
		type: String,
		enum: status.basis,
		index: true
	},
	isDefault: Boolean

}, timestampsOptions())

class Group {

	isActive () {

		return this.status === status.name.active
	}
}

GroupSchema.loadClass(Group)

const Model = conn.model('group', GroupSchema)

export default Model
