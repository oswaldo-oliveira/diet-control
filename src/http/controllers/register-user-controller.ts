import Elysia, { t } from 'elysia'
import { makeRegisterUserService } from '../../service/factories/make-register-user-service'

export const registerUserController = new Elysia().post(
  '/users',
  async ({ body, set }) => {
    const { name, email, password } = body

    const registerUserService = makeRegisterUserService()
    await registerUserService.execute({ name, email, password })

    set.status = 201
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: 'email' }),
      password: t.String(),
    }),
  },
)
