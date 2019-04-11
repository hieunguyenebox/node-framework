
import { Mutation } from 'react-apollo'

class MyMutation extends React.Component {

    state = { error: null }

    client = null

    onError = (err) => {

        if (typeof this.props.onError === 'function')
            this.props.onError(err)
    }

    onCompleted = (res) => {

        if (typeof this.props.onCompleted == 'function')
            this.props.onCompleted(res)
    }

    render() {

        return (

            <Mutation
                mutation={this.props.mutation}
                variables={this.props.variables}
                onCompleted={this.onCompleted}
                onError={this.onError}>
                {
                    (submit, props) => {

                        this.client = props.client

                        return this.props.children(submit, this.state.error)
                    }
                }
            </Mutation>
        )
    }
}

export default MyMutation

