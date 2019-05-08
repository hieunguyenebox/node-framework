
import  withUserInfo from 'components/hoc/with-userinfo'
import  Login from 'pages/login'
import { LoginModal } from 'components/ui/modal'

class Gate extends React.Component {

	render () {

		const {
			isLoggedIn,
			children,
			client,
			refetchUser,
			userInfo,
			updateUserInfo,
			modal
		} = this.props

		if (!isLoggedIn) {

			return <Login {...this.props} />
		}

		return React.cloneElement( children, {
			isLoggedIn,
			children,
			client,
			refetchUser,
			userInfo,
			updateUserInfo
		})
	}
}

Gate = withUserInfo(Gate)

const withAuth = (Component, { modal=false } = {} ) => {

	return class extends React.Component {

		render () {

			return (

			   <Gate  modal={modal} >
				   <Component {...this.props}/>
			   </Gate>
			)
		}
	}
}

export default withAuth
