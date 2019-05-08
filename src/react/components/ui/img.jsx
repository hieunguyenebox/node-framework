

class Img extends React.Component {

	constructor () {

		super()
		this.state = { finish: false }
	}

	render () {

		const { url, default: urlDefault, className } = this.props

		return (
			<img src={url || ''} onError={e => {
			
				if (!this.state.finish) {

					this.setState({finish: true})
					e.target.src=urlDefault
				}

			}} className={className} />
		)
	}
}

export default Img