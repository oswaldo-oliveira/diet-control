import { PrismaFoodsRepository } from '../../repositories/prisma/prisma-foods-repository'
import { GetFoodByIdService } from '../get-food-by-id-service'

export function makeGetFoodByIdService() {
  const foodsRepository = new PrismaFoodsRepository()
  const getFoodByIdService = new GetFoodByIdService(foodsRepository)

  return getFoodByIdService
}
