import { it, describe, beforeEach, expect } from 'bun:test'
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository'
import { AuthenticateService } from '../../src/service/authenticate-service'
import { InvalidCredentialError } from '../../src/service/errors/invalid-credential-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      passwordHash: await Bun.password.hash('123456', 'bcrypt'),
    })

    const { user } = await sut.execute({
      email: 'john.doe@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      passwordHash: await Bun.password.hash('123456', 'bcrypt'),
    })

    expect(
      sut.execute({
        email: 'john.doe@email.com',
        password: '456123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
