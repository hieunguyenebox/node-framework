
import langConfig from './lang'

export default (configPath, lang = 'en') => {

	let result = im.fromJS(langConfig[lang]).toJS()
	
	const configNames = configPath.split('.')

	try {

		for (let name of configNames) {

			result = result[name]
		}

		return result

	} catch (ex) {

		return ''
	}
}