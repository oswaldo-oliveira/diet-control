import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { RegisterUserService } from '../register-user-service'

export function makeRegisterUserService() {
  const userRepository = new PrismaUsersRepository()
  const registerUserService = new RegisterUserService(userRepository)

  return registerUserService
}
