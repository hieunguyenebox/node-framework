import { startServer } from './express';

export { route } from './express'
export { mongodb } from './mongodb'
export { redisClient } from './redis'
export { logger } from './logger'

export const bootstrap = () => {

    startServer()
}
