import { it, describe, beforeEach, expect } from 'bun:test'
import { InMemoryFoodsRepository } from '../repositories/in-memory-foods-repository'
import { GetMetricsService } from '../../src/service/get-metrics-service'
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository'

let foodsRepository: InMemoryFoodsRepository
let usersRepository: InMemoryUsersRepository
let sut: GetMetricsService

describe('Get Metrics Service', () => {
  beforeEach(() => {
    foodsRepository = new InMemoryFoodsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new GetMetricsService(foodsRepository)
  })
  it('should be able to get metrics', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      passwordHash: await Bun.password.hash('123456', 'bcrypt'),
    })

    await foodsRepository.create({
      name: 'Hamburger',
      description: 'Meat hamburger',
      date: 1711172880,
      isDiet: true,
      userId: user.id,
    })
    await foodsRepository.create({
      name: 'Sandwich',
      description: 'Cheese Sandwich',
      date: 1711172880,
      isDiet: false,
      userId: user.id,
    })

    const metrics = await sut.execute({
      userId: user.id,
    })

    expect(metrics.bestOnDietSequence).toEqual(1)
    expect(metrics.totalFoods).toEqual(2)
  })
})
