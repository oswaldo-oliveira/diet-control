import Elysia, { t } from 'elysia'
import { makeGetFoodsService } from '../../service/factories/make-get-foods-service'
import { auth } from '../middlewares/auth'

export const getFoodsController = new Elysia().use(auth).get(
  '/foods',
  async ({ query, set, getCurrentUser }) => {
    const { page } = query
    const { userId } = await getCurrentUser()

    const getFoodsService = makeGetFoodsService()
    const foods = await getFoodsService.execute({
      page: Number(page),
      userId,
    })

    set.status = 200

    return foods
  },
  {
    query: t.Object({
      page: t.String({ default: 1, minimum: 1 }),
    }),
  },
)
