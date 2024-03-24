import Elysia, { t } from 'elysia'
import { makeRegisterFoodService } from '../../service/factories/make-register-food-service'
import { auth } from '../middlewares/auth'

export const registerFoodController = new Elysia().use(auth).post(
  '/foods',
  async ({ body, set, getCurrentUser }) => {
    const { name, description, date, isDiet } = body

    const { userId } = await getCurrentUser()

    const registerFoodService = makeRegisterFoodService()
    await registerFoodService.execute({
      name,
      description,
      date,
      isDiet,
      userId,
    })

    set.status = 201
  },
  {
    body: t.Object({
      name: t.String(),
      description: t.String(),
      date: t.Number(),
      isDiet: t.Boolean(),
    }),
  },
)
