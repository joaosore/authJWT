import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { IUserDTO } from '../../dtos/IUserDTO';
import { IUserRepository } from '../../repositories/User/IUserRepository';
import { AppError } from '@config/AppError';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const userAlreadyNotExists = await this.userRepository.findById(id);

    if (!userAlreadyNotExists) {
      throw new AppError('User already not exists', 404);
    }

    await this.userRepository.delete(id);
  }
}

export { DeleteUserUseCase };
