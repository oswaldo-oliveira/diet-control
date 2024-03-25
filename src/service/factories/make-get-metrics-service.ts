import { PrismaFoodsRepository } from '../../repositories/prisma/prisma-foods-repository'
import { GetMetricsService } from '../get-metrics-service'

export function makeGetMetricsService() {
  const foodsRepository = new PrismaFoodsRepository()
  const getMetricsService = new GetMetricsService(foodsRepository)

  return getMetricsService
}
