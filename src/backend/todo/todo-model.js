import { mongodb } from 'backend/core'
import { Schema } from 'mongoose'

const TodoSchema = new Schema({
    content: String,
    user: Schema.Types.ObjectId
}, {

    timestamps: true
})

export default mongodb.model('todos', TodoSchema)