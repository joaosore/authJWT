import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { IUserRepository } from '../../repositories/User/IUserRepository';
import { AppError } from '@config/AppError';
import { ICreateUserDTO } from '@modules/core/users/dtos/ICreateUserDTO';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, email, cpf, password }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const userAlreadyexists = await this.userRepository.findByCPF(cpf);

    if (userAlreadyexists) {
      throw new AppError('User already exists', 401);
    }

    await this.userRepository.create({
      name,
      email,
      cpf,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
