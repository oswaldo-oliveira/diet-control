import type { FoodsRepository } from '../repositories/foods-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateFoodRequest {
  foodId: string
  name?: string
  description?: string
  date?: number | bigint
  isDiet?: boolean
  userId: string
}

export class UpdateFoodService {
  constructor(private foodsRepository: FoodsRepository) {}

  async execute({
    name,
    description,
    date,
    isDiet,
    foodId,
    userId,
  }: UpdateFoodRequest): Promise<void> {
    const food = await this.foodsRepository.findById(foodId)

    if (!food) {
      throw new ResourceNotFoundError()
    }

    if (food.userId !== userId) {
      throw new ResourceNotFoundError()
    }

    await this.foodsRepository.updateById(foodId, {
      name,
      description,
      date,
      isDiet,
    })
  }
}
