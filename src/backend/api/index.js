
import { route } from 'backend/core'
import { createNodes } from './graphql'
import passport from 'passport'

export const bootstrap = () => {

    route.use('/api/v1', createNodes())
}