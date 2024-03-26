import { it, describe, beforeEach, expect } from 'bun:test'
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository'
import { RegisterUserService } from '../../src/service/register-user-service'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserService

describe('Register User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserService(usersRepository)
  })
  it('should be able to register a user', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456',
    })

    expect(usersRepository.items).toHaveLength(1)
  })
})
