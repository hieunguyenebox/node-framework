
import validator from 'validator'


/**
 * author: hieu nguyen
 * desc: validate data
 */
export const Validator = {

	required (val, trim) {

		if (typeof val === 'string' && trim) {
			val = $.trim(val)
		}
		if ( !val || (Array.isArray(val) && !val.length) )
			return false

		return true
	},

	isPhoneNumber (val, if_value) {

		const phoneRegex = /^\+?[0-9]{10,11}$/

		if (if_value) {

			if (val) {

				return phoneRegex.test(val)	
			}	

			return true

		} else {

			return phoneRegex.test(val)	
		}

	},

	gt (val, min) {

		if (isNaN(val) || isNaN(min)) return false;

		return parseFloat(val) > parseFloat(min)
	},

	length (val, min = 1, trim) {

		if (!val) return false;

		if (typeof val === 'string' && trim) {

			val = $.trim(val)
		}

		return val.length >= min
	},

	isEmail (val) {

		if (!val || !validator.isEmail(val))
			return false

		return true
	},

    isNumeric (val) {

		if (val && !validator.isNumeric(val.toString()))
			return false

		return true
	},

	isUrl (val, if_value) {

		if (if_value) {

			if (val)
				return validator.isURL(val || '')

			return true

		} else {

			return validator.isURL(val || '')
		}
	}
}

/**
 * author: hieu nguyen
 * desc: run validate data with rules
 */
const validate = (data, rules) => {

	const validation = {
		ok: true,
		errors: {}
	}

	for (let fieldRule of rules) {

		const { rule, name, msg } = fieldRule

		if (typeof rule === 'function') {

			const pass = rule(data[name])

			if (!pass) {

				validation.ok = false
				validation.errors[name] = msg
			}

		} else {

			const [ fnName, params = '' ] = rule.split('|')

			if (typeof Validator[fnName] === 'function') {

				const pass = Validator[fnName](data[name], ...params.split(','))

				if (!pass) {

					validation.ok = false
					validation.errors[name] = msg
				}

			} else {

				validation.errors[name] = msg
			}
		}
	}

	return validation
}


export default { validate }
