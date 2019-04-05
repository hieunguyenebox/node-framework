
import Routes from './routes'
import withApollo from 'components/hoc/with-apollo'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Container, Header, Footer, Body } from 'components/layout'
import "style/style"
import Error500 from 'pages/error/_500'
import { hot } from 'react-hot-loader'

class Main extends React.Component {

	state = { error: false }
	
	componentDidCatch (err) {

		logger.error(err)
		this.setState({error: true})
	}

	renderBody () {

		if (this.state.error)
			return <Error500 />

		return <Routes />
	}

	render () {


		return (
			<Router>
				<Container>
					<Header />
					<Body>
						{this.renderBody()}
					</Body>
					<Footer />
				</Container>
			</Router>
		)
	}
}


Main = withApollo(Main)

export default hot(module)(Main)