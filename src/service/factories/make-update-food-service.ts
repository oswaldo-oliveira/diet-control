import { PrismaFoodsRepository } from '../../repositories/prisma/prisma-foods-repository'
import { UpdateFoodService } from '../update-food-service'

export function makeUpdateFoodService() {
  const foodsRepository = new PrismaFoodsRepository()
  const updateFoodService = new UpdateFoodService(foodsRepository)

  return updateFoodService
}
