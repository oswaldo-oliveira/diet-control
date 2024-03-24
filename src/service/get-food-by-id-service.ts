import type { Food } from '@prisma/client'
import type { FoodsRepository } from '../repositories/foods-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetFoodByIdServiceRequest {
  foodId: string
  userId: string
}

interface GetFoodByIdServiceResponse {
  food: Food
}

export class GetFoodByIdService {
  constructor(private foodsRepository: FoodsRepository) {}

  async execute({
    foodId,
    userId,
  }: GetFoodByIdServiceRequest): Promise<GetFoodByIdServiceResponse> {
    const food = await this.foodsRepository.findById(foodId)

    if (!food) {
      throw new ResourceNotFoundError()
    }

    if (food.userId !== userId) {
      throw new ResourceNotFoundError()
    }

    return {
      food,
    }
  }
}
