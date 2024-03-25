import type { Food, Prisma } from '@prisma/client'
import type { FoodsRepository } from '../../src/repositories/foods-repository'
import { randomUUID } from 'crypto'

export class InMemoryFoodsRepository implements FoodsRepository {
  public items: Food[] = []

  async create(data: Prisma.FoodUncheckedCreateInput) {
    const food = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      date: data.date,
      isDiet: data.isDiet,
      userId: data.userId,
    }

    this.items.push(food)

    return food
  }

  async findById(id: string) {
    const food = this.items.find((food) => food.id === id)

    if (!food) {
      return null
    }

    return food
  }

  async findMany(page: number, userId: string) {
    return this.items
      .filter((item) => item.userId === userId)
      .slice((page - 1) * 20, page * 20)
      .sort((a, b) => {
        return a.date - b.date
      })
  }

  async findAll(userId: string) {
    return this.items
      .filter((item) => item.userId === userId)
      .sort((a, b) => {
        return a.date - b.date
      })
  }

  async save(data: Food) {
    const foodInIndex = this.items.findIndex((item) => item.id === data.id)

    if (foodInIndex >= 0) {
      this.items[foodInIndex] = data
    }
  }

  async deleteById(id: string) {
    const foodInIndex = this.items.findIndex((item) => item.id === id)
    this.items.splice(foodInIndex, 1)
  }
}
