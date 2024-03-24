import jwt from '@elysiajs/jwt'
import Elysia, { t } from 'elysia'
import { env } from '../../env'
import { InvalidCredentialError } from '../../service/errors/invalid-credential-error'

export const auth = new Elysia()
  .error({
    UNAUTHORIZED: InvalidCredentialError,
  })
  .onError(({ error, code, set }) => {
    switch (code) {
      case 'UNAUTHORIZED': {
        set.status = 401
        return { code, message: error.message }
      }
    }
  })
  .use(
    jwt({
      secret: env.JWT_SECRET,
      schema: t.Object({
        sub: t.String(),
      }),
    }),
  )
  .derive({ as: 'global' }, ({ jwt, cookie: { auth } }) => {
    return {
      signUser: async (payload: { sub: string }) => {
        const token = await jwt.sign(payload)

        auth.set({
          value: token,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        })
      },

      signOut: () => {
        auth.remove()
      },

      getCurrentUser: async () => {
        const payload = await jwt.verify(auth.value)

        if (!payload) {
          throw new InvalidCredentialError()
        }

        return {
          userId: payload.sub,
        }
      },
    }
  })
