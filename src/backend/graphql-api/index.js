
import { route } from 'backend/core'
import { createNodes } from './graphql'

export const bootstrap = () => {

    route.use('/api/v1', createNodes())
}