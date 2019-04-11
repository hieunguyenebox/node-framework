
class helper {

	notifyMutation (data, msg) {

		const result = Object.values(data)[0]

		if (result.ok)
			this.notify(msg || 'Data has been updated')
		else
			this.notify(lang(`errors.` + result.code), 'danger')
	}

	removeAllTypename = (data) => {

		if (data.toString() == '[object File]')
			return data;

		delete data.__typename

		for (let i in data) {

			if (data[i] && data[i].toString() == '[object Object]') {

				delete data[i].__typename
				this.removeAllTypename(data[i])
			}
		}

		return data
	}

	removeTypename = (data) => {

		if (!data)
			return {}

		data = im.fromJS(data).toJS()

		return this.removeAllTypename(data)
	}

	capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    customHeaders () {

    	return {}
    }

	fetch (endpoint, opts = {}, upload = false) {

		opts.headers = this.customHeaders(opts.headers)

		if (opts.body && !upload)	
			opts.body = JSON.stringify(opts.body)

		opts.credentials = 'same-origin'

		return fetch(endpoint, opts)
				.then(respone => respone.json())
	}
}

module.exports = new helper

