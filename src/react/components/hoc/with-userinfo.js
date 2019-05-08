/**
 * author: hieu nguyen
 * desc: fetch and pass user info to children
 */
import Query from 'components/hoc/query'


class Gate extends React.Component {

	updateUserInfo = (newUserInfo) => {

		this.props.client.writeQuery({
			query: query.user_info,
			data: {
				userInfo: newUserInfo
			}
		})
	}

	checkUserAndRenderScreen = () => {

		const { children, client, refetch } = this.props
			, userInfo = this.props.userInfo ? im.fromJS(this.props.userInfo).toJS() : null
			, isLoggedIn = userInfo && userInfo.email

		return React.cloneElement( children, { isLoggedIn, client, refetchUser: refetch, userInfo, updateUserInfo: this.updateUserInfo })
	}
	
	render () {

		return this.checkUserAndRenderScreen()
	}
}

const withUserInfo = (Component, opts = {}) => {

	return class extends React.Component {

		refetchInterval = 1000 * 60 //1 minute

		render () {

			return (

				<Query pollInterval={this.refetchInterval} {...opts} query={query.user_info}>
					<Gate>
						<Component {...this.props} />
					</Gate>
				</Query>
			)
		}
	}
}

export default withUserInfo
