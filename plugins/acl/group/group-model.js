
import { getDB } from 'plugins/lib/db'
import { Schema } from 'mongoose'
import lang from 'plugins/lib/lang'
import timestampsOptions from 'plugins/lib/db/timestamps-options'
import config from 'plugins/lib/config'

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
