import type { FoodsRepository } from '../repositories/foods-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteFoodRequest {
  foodId: string
  userId: string
}

export class DeleteFoodService {
  constructor(private foodsRepository: FoodsRepository) {}

  async execute({ foodId, userId }: DeleteFoodRequest): Promise<void> {
    const food = await this.foodsRepository.findById(foodId)

    if (!food) {
      throw new ResourceNotFoundError()
    }

    if (food.userId !== userId) {
      throw new ResourceNotFoundError()
    }

    await this.foodsRepository.deleteById(foodId)
  }
}
