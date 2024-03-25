import Elysia from 'elysia'
import { makeGetMetricsService } from '../../service/factories/make-get-metrics-service'
import { auth } from '../middlewares/auth'

export const getMetricsController = new Elysia()
  .use(auth)
  .get('/metrics', async ({ set, getCurrentUser }) => {
    const { userId } = await getCurrentUser()

    const getMetricsService = makeGetMetricsService()
    const metrics = await getMetricsService.execute({
      userId,
    })

    set.status = 200

    return metrics
  })
