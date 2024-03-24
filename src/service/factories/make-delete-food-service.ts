import { PrismaFoodsRepository } from '../../repositories/prisma/prisma-foods-repository'
import { DeleteFoodService } from '../delete-food-service'

export function makeDeleteFoodService() {
  const foodsRepository = new PrismaFoodsRepository()
  const deleteFoodService = new DeleteFoodService(foodsRepository)

  return deleteFoodService
}
