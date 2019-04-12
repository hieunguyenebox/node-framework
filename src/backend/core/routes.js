
import path from 'path'

export const initRoutes = (app) => {

	const indexHtml = path.resolve(process.cwd(), 'views/index.html')
	
	app.get('/*', (req, res) => {

		res.sendFile(indexHtml)
	})
}