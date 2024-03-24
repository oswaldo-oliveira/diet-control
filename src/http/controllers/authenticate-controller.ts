import Elysia, { t } from 'elysia'
import { auth } from '../middlewares/auth'
import { makeAuthenticateService } from '../../service/factories/make-authenticate-service'

export const authenticateController = new Elysia().use(auth).post(
  '/sessions',
  async ({ body, set, signUser }) => {
    const { email, password } = body

    const authenticateService = makeAuthenticateService()
    const { user } = await authenticateService.execute({ email, password })

    await signUser({ sub: user.id })

    set.status = 200
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
      password: t.String(),
    }),
  },
)
