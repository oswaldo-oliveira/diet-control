import type { FoodsRepository } from '../repositories/foods-repository'

interface GetMetricsServiceRequest {
  userId: string
}

interface GetMetricsServiceResponse {
  totalFoods: number
  totalDietMetrics: number
  totalNoDietMetrics: number
  bestOnDietSequence: number
}

export class GetMetricsService {
  constructor(private foodsRepository: FoodsRepository) {}

  async execute({
    userId,
  }: GetMetricsServiceRequest): Promise<GetMetricsServiceResponse> {
    const foods = await this.foodsRepository.findAll(userId)

    const totalFoods = foods.length
    const totalDietMetrics = foods.filter((foods) => foods.isDiet).length
    const totalNoDietMetrics = foods.filter((foods) => !foods.isDiet).length
    const { bestOnDietSequence } = foods.reduce(
      (acc, food) => {
        if (food.isDiet) {
          acc.currentSequence += 1
        } else {
          acc.currentSequence = 0
        }

        if (acc.currentSequence > acc.bestOnDietSequence) {
          acc.bestOnDietSequence = acc.currentSequence
        }

        return acc
      },
      { bestOnDietSequence: 0, currentSequence: 0 },
    )

    return {
      totalFoods,
      totalDietMetrics,
      totalNoDietMetrics,
      bestOnDietSequence,
    }
  }
}
