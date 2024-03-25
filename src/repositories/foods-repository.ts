import type { Food, Prisma } from '@prisma/client'

export interface FoodsRepository {
  create(data: Prisma.FoodUncheckedCreateInput): Promise<Food>
  findById(id: string): Promise<Food | null>
  findMany(page: number, userId: string): Promise<Food[]>
  findAll(userId: string): Promise<Food[]>
  updateById(id: string, data: Prisma.FoodUpdateInput): Promise<Food>
  deleteById(id: string): Promise<void>
}
