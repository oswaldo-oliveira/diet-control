import { it, describe, beforeEach, expect } from 'bun:test'
import { InMemoryFoodsRepository } from '../repositories/in-memory-foods-repository'
import { GetFoodByIdService } from '../../src/service/get-food-by-id-service'
import { ResourceNotFoundError } from '../../src/service/errors/resource-not-found-error'

let foodsRepository: InMemoryFoodsRepository
let sut: GetFoodByIdService

describe('Get Food By Id Service', () => {
  beforeEach(() => {
    foodsRepository = new InMemoryFoodsRepository()
    sut = new GetFoodByIdService(foodsRepository)
  })
  it('should be able to get a food by id', async () => {
    const newFood = await foodsRepository.create({
      name: 'Hamburger',
      description: 'Meat hamburger',
      date: 1711172880,
      isDiet: true,
      userId: '5af686e9-d99e-407e-bd8a-92f9075b5a10',
    })

    const { food } = await sut.execute({
      foodId: newFood.id,
      userId: newFood.userId,
    })

    expect(food.id).toEqual(newFood.id)
  })

  it('should not be able to get food by id with another user', async () => {
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

  it('should not be able to get food by id with wrong id', async () => {
    const food = await foodsRepository.create({
      name: 'Hamburger',
      description: 'Meat hamburger',
      date: 1711172880,
      isDiet: true,
      userId: '5af686e9-d99e-407e-bd8a-92f9075b5a10',
    })

    expect(
      sut.execute({
        foodId: '8cce3f63-04a0-4203-8535-91cae54538c0',
        userId: food.userId,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
