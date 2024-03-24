import Elysia, { t } from 'elysia'
import { makeGetFoodByIdService } from '../../service/factories/make-get-food-by-id-service'
import { auth } from '../middlewares/auth'

export const getFoodByIdController = new Elysia().use(auth).get(
  '/foods/:foodId',
  async ({ params, set, getCurrentUser }) => {
    const { foodId } = params
    const { userId } = await getCurrentUser()

    const getFoodByIdService = makeGetFoodByIdService()
    const food = await getFoodByIdService.execute({
      foodId,
      userId,
    })

    set.status = 200

    return food
  },
  {
    params: t.Object({
      foodId: t.String(),
    }),
  },
)
