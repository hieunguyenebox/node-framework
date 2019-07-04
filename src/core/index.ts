import { startServer } from './express';
import { initLang } from './lang'

export { route } from './express'
export { mongodb } from './mongodb'
export { redisClient } from './redis'
export { logger } from './logger'

export const bootstrap = () => {

    startServer()
    initLang()
}
