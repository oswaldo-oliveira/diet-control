import type { FoodsRepository } from '../repositories/foods-repository'

interface RegisterFoodRequest {
  name: string
  description: string
  date: number | bigint
  isDiet: boolean
  userId: string
}

export class RegisterFoodService {
  constructor(private foodsRepository: FoodsRepository) {}

  async execute({
    name,
    description,
    date,
    isDiet,
    userId,
  }: RegisterFoodRequest): Promise<void> {
    await this.foodsRepository.create({
      name,
      description,
      date,
      isDiet,
      userId,
    })
  }
}
