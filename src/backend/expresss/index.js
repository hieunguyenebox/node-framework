
import app from './app'
import config from 'backend/config'
import path from 'path'

const indexHtml = path.resolve(process.cwd(), 'views/index.html')

const bootstrap = () => {

	app.get('/*', (req, res) => {

		res.sendFile(indexHtml)
	})
	
	const port = process.env.NODE_PORT || 3000

	let hosts = process.env.NODE_HOST || 'localhost'

	hosts = hosts.split(',')

	for (let host of hosts) {

		host = host.trim()

		app.listen(port, host, () => console.log(`Server is listening on ${host}:${port}`))
	}
}

export default bootstrap