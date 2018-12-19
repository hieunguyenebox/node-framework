
import timestampsOptions from 'plugins/lib/db/timestamps-options'
import { getDB } from 'plugins/lib/db'
import { Schema } from 'mongoose'

const conn = getDB('mongodb.default')

var FileSchema = new Schema({

	filename: {
		type: String,
		required: true,
		unique: true
	},
	mimeType: String,
	size: {
		type: Number,
		required: true
	},
	originalName: {
		type: String,
		required: true
	},
	publicPath: {
		type: String,
		required: true
	},
	uploadedBy: {
		type: Schema.Types.ObjectId,
		refs: 'User'
	},
	storage: {
		type: String,
		enum: ['local', 's3', 'google'],
		required: true
	},

}, timestampsOptions())

const File = conn.model('File', FileSchema)

export default File