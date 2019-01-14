

export const back = (req, res, next) => {

	const back = req.query.back

	req.session.backUrl = back

	next()
}

export const redirectBack = (req, res) => {

	let backUrl = '/'

	if (req.session.backUrl)
		backUrl = decodeURIComponent(req.session.backUrl)

	backUrl.replace('#_=_', '')

	res.redirect(backUrl)
}

export const removeBackUrl = (req, res, next) => {

	if (req.session.hasOwnProperty('backUrl'))
		delete req.session.backUrl

	next()
}