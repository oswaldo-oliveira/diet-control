import { it, describe, beforeEach, expect } from 'bun:test'
import { InMemoryFoodsRepository } from '../repositories/in-memory-foods-repository'
import { RegisterFoodService } from '../../src/service/register-food-service'

let foodsRepository: InMemoryFoodsRepository
let sut: RegisterFoodService

describe('Register Food Service', () => {
  beforeEach(() => {
    foodsRepository = new InMemoryFoodsRepository()
    sut = new RegisterFoodService(foodsRepository)
  })
  it('should be able to register a food', async () => {
    await sut.execute({
      name: 'Hamburger',
      description: 'Meat hamburger',
      date: 1711172880,
      isDiet: true,
      userId: '5af686e9-d99e-407e-bd8a-92f9075b5a10',
    })

    expect(foodsRepository.items).toHaveLength(1)
  })
})
