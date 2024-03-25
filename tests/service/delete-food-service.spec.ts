import { it, describe, beforeEach, expect } from 'bun:test'
import { InMemoryFoodsRepository } from '../repositories/in-memory-foods-repository'
import { DeleteFoodService } from '../../src/service/delete-food-service'
import { ResourceNotFoundError } from '../../src/service/errors/resource-not-found-error'

let foodsRepository: InMemoryFoodsRepository
let sut: DeleteFoodService

describe('Delete Food Service', () => {
  beforeEach(() => {
    foodsRepository = new InMemoryFoodsRepository()
    sut = new DeleteFoodService(foodsRepository)
  })
  it('should be able to delete a food', async () => {
    const food = await foodsRepository.create({
      name: 'Hamburger',
      description: 'Meat hamburger',
      date: 1711172880,
      isDiet: true,
      userId: '5af686e9-d99e-407e-bd8a-92f9075b5a10',
    })

    await sut.execute({
      foodId: food.id,
      userId: food.userId,
    })

    expect(foodsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete food with another user', async () => {
    const food = await foodsRepository.create({
      name: 'Hamburger',
      description: 'Meat hamburger',
      date: 1711172880,
      isDiet: true,
      userId: '5af686e9-d99e-407e-bd8a-92f9075b5a10',
    })

    expect(
      sut.execute({
        foodId: food.id,
        userId: '8cce3f63-04a0-4203-8535-91cae54538c0',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
