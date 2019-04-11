
import logger from 'backend/logger'
import request from 'request-promise'
import 'babel-polyfill'
import { loginBySocial } from './index'

const fetchUserInfo = (token) => {

	const endpoint = `https://graph.facebook.com/v3.2/me?fields=id,name,email,first_name,last_name,picture,gender&access_token=`

	return request({
		
		uri: endpoint + token,
		json: true

	}).catch(err => logger.error(err))
}

const fetchUserAvatar = id => {

	const endpoint = `https://graph.facebook.com/v3.2/${id}/picture?height=150&redirect=false`

	return request({uri: endpoint, json: true}).then(result => {

		if (result && result.data)
			return result.data.url

		return ''
	})
}

export const loginByFacebook = async (accessToken, refreshToken, profile, done) => {

	profile = await fetchUserInfo(accessToken)

	const avatar = await fetchUserAvatar(profile.id)

	profile = {
		...profile,
		avatar,
		accessToken,
		refreshToken
	}

	loginBySocial('facebook', profile, done)
}