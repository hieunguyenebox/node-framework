
import path from 'path'
import { route } from './express'

export const initRoutes = () => {

	const indexHtml = path.resolve(process.cwd(), 'views/index.html')
	
	route.get('/*', (req, res) => {

		res.sendFile(indexHtml)
	})
}