import type { FoodsRepository } from '../repositories/foods-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateFoodRequest {
  foodId: string
  name?: string
  description?: string
  date?: number
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

    food.name = name ?? food.name
    food.description = description ?? food.description
    food.date = date ?? food.date
    food.isDiet = isDiet ?? food.isDiet

    await this.foodsRepository.save(food)
  }
}
