import type { Food } from '@prisma/client'
import type { FoodsRepository } from '../repositories/foods-repository'

interface GetFoodsServiceRequest {
  page: number
  userId: string
}

interface GetFoodsServiceResponse {
  foods: Food[]
}

export class GetFoodsService {
  constructor(private foodsRepository: FoodsRepository) {}

  async execute({
    page,
    userId,
  }: GetFoodsServiceRequest): Promise<GetFoodsServiceResponse> {
    const foods = await this.foodsRepository.findMany(page, userId)

    return {
      foods,
    }
  }
}
