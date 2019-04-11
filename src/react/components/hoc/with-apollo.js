
import { ApolloProvider } from "react-apollo"
import { client } from './apollo'

const withApollo = (Component) => {

	return class extends React.Component {

		render () {

			return (
				<ApolloProvider client={client}>
					<Component {...this.props} />
				</ApolloProvider>
			)
		}
	}
}

export default withApollo