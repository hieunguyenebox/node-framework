
import { Query } from 'react-apollo'
import Loading from 'components/ui/loading'

class CustomQuery extends React.Component {

    getOpts = () => {

        let opts = {},
            { pollInterval, cache } = this.props

        if (!isNaN(pollInterval) && pollInterval > 1000)
            opts.pollInterval = pollInterval

        if (cache === false)
            opts.fetchPolicy = 'network-only'

        return opts
    }

    render () {

        const props = this.props

        if (!props.query)
            return null

        return (

            <Query {...this.getOpts()} query={props.query} variables={props.variables}>
                {
                    ({ loading, data, error, client, refetch, stopPolling }) => {

                        if (loading) return <Loading/>

                        const attrs = {}

                        if (this.props.pollInterval > 1000) {
                            attrs.stopPolling = stopPolling
                        }

                        return React.cloneElement(this.props.children, {...data, refetch, client, error})
                    }
                }
            </Query>
        )
    }
}

export default CustomQuery

