
import 'babel-polyfill'
import config from 'plugins/lib/config'
import logger from 'plugins/lib/logger'
import channels, { initAllChannels } from './channels'

export const getChannel = (name) => {

	return channels[name]
}

const bootstrap = () => {

	initAllChannels()
}

export default bootstrap


