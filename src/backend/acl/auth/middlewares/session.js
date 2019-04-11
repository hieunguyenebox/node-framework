

export const removeUnusedSession = (req, res, next) => {


	const unUsedKeys = [ 'facebook', 'socialType']

	for (let key of unUsedKeys) {

		if (req.session.hasOwnProperty(key))
			delete req.session[key]
	}

	next()
}