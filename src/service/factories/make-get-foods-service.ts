import { PrismaFoodsRepository } from '../../repositories/prisma/prisma-foods-repository'
import { GetFoodsService } from '../get-foods-service'

export function makeGetFoodsService() {
  const foodsRepository = new PrismaFoodsRepository()
  const getFoodsService = new GetFoodsService(foodsRepository)

  return getFoodsService
}
