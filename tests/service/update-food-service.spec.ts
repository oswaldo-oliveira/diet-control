import { it, describe, beforeEach, expect } from 'bun:test'
import { InMemoryFoodsRepository } from '../repositories/in-memory-foods-repository'
import { UpdateFoodService } from '../../src/service/update-food-service'

let foodsRepository: InMemoryFoodsRepository
let sut: UpdateFoodService

describe('Update Food Service', () => {
  beforeEach(() => {
    foodsRepository = new InMemoryFoodsRepository()
    sut = new UpdateFoodService(foodsRepository)
  })
  it('should be able to update a food', async () => {
    const food = await foodsRepository.create({
      name: 'Hamburger',
      description: 'Meat hamburger',
      date: 1711172880,
      isDiet: true,
      userId: '5af686e9-d99e-407e-bd8a-92f9075b5a10',
    })

    await sut.execute({
      name: 'Sandwich',
      description: 'Cheese sandwich',
      userId: '5af686e9-d99e-407e-bd8a-92f9075b5a10',
      foodId: food.id,
    })

    expect(foodsRepository.items[0].name).toEqual('Sandwich')
  })
})
