

const deleteFields = (doc, ret, deleteFields) => {

	ret.id = ret._id
  	delete ret._id;
  	delete ret.password;
  	delete ret.__v

  	if (Array.isArray(deleteFields)) {

      	for (let field of deleteFields) {
      		delete ret[field]
      	}
  	}
}

export default (deletingFields) => ({

	timestamps: true,

	toJSON: {

		transform: (doc, ret) => deleteFields(doc, ret, deletingFields)
	},

	toObject: {

		transform: (doc, ret) => deleteFields(doc, ret, deletingFields)
	}
})