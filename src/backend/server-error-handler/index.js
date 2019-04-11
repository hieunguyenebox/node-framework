
import app from 'backend/server/app'
import logger from 'backend/logger'

const bootstrap = () => {

	app.use((err, req, res, next) => {
		
		logger.error(err)
		return res.json({ok: 0, msg: 'Something Broken!'})
	})
}

export default bootstrap