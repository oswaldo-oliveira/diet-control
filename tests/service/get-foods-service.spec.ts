import { it, describe, beforeEach, expect } from 'bun:test'
import { InMemoryFoodsRepository } from '../repositories/in-memory-foods-repository'
import { GetFoodsService } from '../../src/service/get-foods-service'

let foodsRepository: InMemoryFoodsRepository
let sut: GetFoodsService

describe('Get Foods Service', () => {
  beforeEach(() => {
    foodsRepository = new InMemoryFoodsRepository()
    sut = new GetFoodsService(foodsRepository)
  })
  it('should be able to get foods', async () => {
    const newFood = await foodsRepository.create({
      name: 'Hamburger',
      description: 'Meat hamburger',
      date: 1711172880,
      isDiet: true,
      userId: '5af686e9-d99e-407e-bd8a-92f9075b5a10',
    })
    await foodsRepository.create({
      name: 'Sandwich',
      description: 'Cheese Sandwich',
      date: 1711172880,
      isDiet: false,
      userId: '5af686e9-d99e-407e-bd8a-92f9075b5a10',
    })

    const { foods } = await sut.execute({
      page: 1,
      userId: newFood.userId,
    })

    console.log(foods.length)

    expect(foods).toHaveLength(2)
  })
})
