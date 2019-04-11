
import Strategies from './strategies'
import app from 'backend/server/app'
import routes from './routes'

const bootstrap = () => {

	Strategies.init()
	routes()
}

export default bootstrap