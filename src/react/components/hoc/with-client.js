
import React from 'react'
import { ApolloConsumer } from 'react-apollo'

const withClient = (Component) => {

	return class extends React.Component {

		render () {

			return (

				<ApolloConsumer>
					{ client => <Component {...this.props} client={client} /> }
				</ApolloConsumer>
			)
		}
	}
}

export default withClient