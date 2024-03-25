import type { Food, Prisma } from '@prisma/client'
import { prisma } from '../../libs/prisma'
import type { FoodsRepository } from '../foods-repository'

export class PrismaFoodsRepository implements FoodsRepository {
  async create(data: Prisma.FoodUncheckedCreateInput) {
    const user = await prisma.food.create({ data })

    return user
  }

  async findById(id: string) {
    const food = await prisma.food.findUnique({
      where: { id },
    })

    return food
  }

  async findMany(page: number, userId: string) {
    const foods = await prisma.food.findMany({
      where: {
        userId,
      },
      orderBy: { date: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })

    return foods
  }

  async findAll(userId: string) {
    const foods = await prisma.food.findMany({
      where: {
        userId,
      },
      orderBy: { date: 'desc' },
    })

    return foods
  }

  async save(food: Food) {
    const data = this.toPrisma(food)

    await prisma.food.update({
      where: { id: data.id },
      data,
    })
  }

  async deleteById(id: string) {
    await prisma.food.delete({
      where: { id },
    })
  }

  private toPrisma(food: Food): Prisma.FoodUncheckedCreateInput {
    return {
      id: food.id,
      name: food.name,
      description: food.description,
      date: food.date,
      isDiet: food.isDiet,
      userId: food.userId,
    }
  }
}
