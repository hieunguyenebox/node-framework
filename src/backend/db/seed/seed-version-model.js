
import { getDB } from 'backend/db'
import { Schema } from 'mongoose'

const conn = getDB('mongodb.default')

const SeedVersionSchema = new Schema({

	v: String,
	file: String,
})

export default conn.model('seed_version', SeedVersionSchema)