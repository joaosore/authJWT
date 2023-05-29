import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { IUserDTO } from '../../dtos/IUserDTO';
import { IUserRepository } from '../../repositories/User/IUserRepository';
import { AppError } from '@config/AppError';

@injectable()
class FindByIdUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<IUserDTO | null> {
    const userAlreadyNotExists = await this.userRepository.findById(id);

    if (!userAlreadyNotExists) {
      throw new AppError('User already not exists', 404);
    }

    return await this.userRepository.findById(id);
  }
}

export { FindByIdUserUseCase };
