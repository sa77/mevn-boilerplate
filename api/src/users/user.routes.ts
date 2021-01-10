import { Request, Response, Router } from "express";
import httpStatus from "http-status"
import { createNewUser, loginWithEmailAndPassword, generateAuthTokens } from "./user.services"

const userRouter: Router = Router()

userRouter.post('/register', async (req: Request, res: Response) => {
	try {
		const reqBody = req.body
		const user = await createNewUser(reqBody)
		if (user) {
			const { firstName, lastName, email } = user
			const { access, refresh } = await generateAuthTokens(user)
			res.status(httpStatus.OK).send({ user: { firstName, lastName, email }, access, refresh })
		}
	} catch(err) {
		res.status(httpStatus.BAD_REQUEST).send({ error: `${err}` })
	}
});

userRouter.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body
	try {
		const user = await loginWithEmailAndPassword(email, password)
		if (user) {
			const { firstName, lastName, email } = user
			const { access, refresh } = await generateAuthTokens(user)
			res.status(httpStatus.OK).send({ user: { firstName, lastName, email }, access, refresh })
		}
	} catch(err) {
		res.status(httpStatus.BAD_REQUEST).send({ error: `${err}` })
	}
});

userRouter.post('/refresh-tokens', (req: Request, res: Response) => {
	res.status(httpStatus.OK).send(`POST refresh-tokens`)
});

export = userRouter

