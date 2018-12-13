
import mongoDB from 'plugins/db/mongo'
import mongoose from 'mongoose'

const connection = mongoDB.createConnection()

const SeedVersionSchema = new mongoose.Schema({

	v: String,
	file: String,
})

export default connection.model('seed_version', SeedVersionSchema)