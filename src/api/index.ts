
import { route } from 'core'
import { createNodes } from './graphql'
import { Response } from 'express';
import { __ } from 'i18n';

export const bootstrap = () => {

    route.use('/v1', createNodes())
    route.use('/', (_, res: Response) => {

        res.json({status: 'ok', msg: __("hello")})
    })
}