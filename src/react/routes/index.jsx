
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import RouteComponents from './config'

const initRoutes = () => {

	return RouteComponents.map(route => {

		const { url, exact, component: Component, params } = route

		return (
			<Route
				key={url}
				exact={exact}
				path={url}
				component={(props) => <Component {...params} {...props} />}
				/>
		)
	})
}

class Routes extends React.Component {

	render () {

		return (
			<Route render={({location}) => {

				return (

					<Switch location={location}>
						{initRoutes()}
					</Switch>
				)

			}}/>
		)
	}
}

export default Routes
	