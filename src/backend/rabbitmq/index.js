
import 'babel-polyfill'
import config from 'backend/config'
import logger from 'backend/logger'
import channels, { initAllChannels } from './channels'

export const getChannel = (name) => {

	return channels[name]
}

const bootstrap = () => {

	initAllChannels()
}

export default bootstrap


