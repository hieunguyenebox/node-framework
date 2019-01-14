
import app from 'plugins/lib/server/app'
import config from 'plugins/lib/config'
import logger from 'plugins/lib/logger'
import passport from 'passport'
import { redirectBack, back } from './middlewares/back'
import { withVerifyEmail } from './middlewares/social-email'
import { removeUnusedSession } from './middlewares/session'
import express from 'express'

const routes = () => {

	const LoginRouter = express.Router()

	const customAuth = (strategy, req, res) => {

		const auth = passport.authenticate(strategy, (err, user, result) => {

			if (user) {

				req.login(user, () => {

					res.json({ok: 1})
				})
			} else {

				res.json({ok: 0, msg: result ? result.message : ''})
			}

		});

		return auth(req, res)
	}

	LoginRouter.use(removeUnusedSession)

	// login by email and password
	LoginRouter.post('/', (req, res) => customAuth('local', req, res))

	// login by facebook
	LoginRouter.get('/fb',
		back,
		passport.authenticate('facebook', { scope: ['email'] })
	)
	LoginRouter.get('/fb/cb',
		(req, res, next) => withVerifyEmail('facebook', req, res, next),
		redirectBack
	)

	// login by google
	LoginRouter.get('/gg',
		back,
		passport.authenticate('google', { scope: config.get('auth.google.scope') })
	)

	LoginRouter.get('/gg/cb',
		passport.authenticate('google', { failureRedirect: '/dang-nhap' }),
		redirectBack
	)

	app.get('/logout', (req, res) => {

		req.logout()
		res.redirect('/')
	})

	app.get('/is-social-login', (req, res, next) => {

		const { socialType } = req.session

		if (socialType) return res.json({ok: 1});

		return res.json({ok: 0});
	})

	app.post('/confirm-social-email', (req, res) => {

		AuthService.confirmSocialEmail(req).then(result => res.json(result))
	})

	app.use('/login', LoginRouter)

}

export default routes