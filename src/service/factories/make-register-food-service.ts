import { PrismaFoodsRepository } from '../../repositories/prisma/prisma-foods-repository'
import { RegisterFoodService } from '../register-food-service'

export function makeRegisterFoodService() {
  const foodRepository = new PrismaFoodsRepository()
  const registerFoodService = new RegisterFoodService(foodRepository)

  return registerFoodService
}
