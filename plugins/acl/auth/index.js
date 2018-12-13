
import Strategies from './strategies'
import app from 'plugins/lib/server/app'
import routes from './routes'

const bootstrap = () => {

	Strategies.init()
	routes()
}

export default bootstrap