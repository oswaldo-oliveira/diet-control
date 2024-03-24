import Elysia, { t } from 'elysia'
import { makeUpdateFoodService } from '../../service/factories/make-update-food-service'
import { auth } from '../middlewares/auth'

export const updateFoodController = new Elysia().use(auth).put(
  '/foods/:foodId',
  async ({ params, body, set, getCurrentUser }) => {
    const { foodId } = params
    const { name, description, date, isDiet } = body
    const { userId } = await getCurrentUser()

    const updateFoodService = makeUpdateFoodService()
    await updateFoodService.execute({
      name,
      description,
      date,
      isDiet,
      foodId,
      userId,
    })

    set.status = 204
  },
  {
    params: t.Object({
      foodId: t.String(),
    }),
    body: t.Object({
      name: t.Optional(t.String()),
      description: t.Optional(t.String()),
      date: t.Optional(t.Number()),
      isDiet: t.Optional(t.Boolean()),
    }),
  },
)
