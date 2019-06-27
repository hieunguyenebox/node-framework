
import { route } from '@root/core'
import { createNodes } from './graphql'
import passport from 'passport'

export const bootstrap = () => {

    route.use('/v1', createNodes())
    route.use('/', (req, res) => {

        res.json({status: 'ok'})
    })
}