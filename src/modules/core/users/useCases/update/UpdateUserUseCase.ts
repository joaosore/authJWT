import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { IUserRepository } from '../../repositories/User/IUserRepository';
import { AppError } from '@config/AppError';
import { IUpdateUserDTO } from '@modules/core/users/dtos/IUpdateUserDTO';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ id, name, password, email }: IUpdateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    if (!id) {
      throw new AppError('ID not informed', 401);
    }

    const userAlreadyNotExists = await this.userRepository.findById(id);

    if (!userAlreadyNotExists) {
      throw new AppError('User already not exists', 404);
    }

    await this.userRepository.update({
      id,
      name,
      email,
      password: passwordHash,
    });
  }
}

export { UpdateUserUseCase };
