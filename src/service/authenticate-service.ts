import type { User } from '@prisma/client'
import type { UsersRepository } from '../repositories/users-repository'
import { InvalidCredentialError } from './errors/invalid-credential-error'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  user: User
}

export class AuthenticateService {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialError()
    }

    const doesPasswordMatch = await Bun.password.verify(
      password,
      user.passwordHash,
      'bcrypt',
    )

    if (!doesPasswordMatch) {
      throw new InvalidCredentialError()
    }

    return { user }
  }
}
