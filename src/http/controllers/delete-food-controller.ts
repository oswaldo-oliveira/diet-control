import Elysia, { t } from 'elysia'
import { makeDeleteFoodService } from '../../service/factories/make-delete-food-service'
import { auth } from '../middlewares/auth'

export const deleteFoodController = new Elysia().use(auth).delete(
  '/foods/:foodId',
  async ({ params, set, getCurrentUser }) => {
    const { foodId } = params
    const { userId } = await getCurrentUser()

    const deleteFoodService = makeDeleteFoodService()
    await deleteFoodService.execute({
      foodId,
      userId,
    })

    set.status = 204
  },
  {
    params: t.Object({
      foodId: t.String(),
    }),
  },
)
