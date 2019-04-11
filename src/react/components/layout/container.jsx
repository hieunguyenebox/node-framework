

class Container extends React.Component {

	render () {

		return (
            <React.Fragment>
				{this.props.children}
            </React.Fragment>
		)
	}
}

export default Container