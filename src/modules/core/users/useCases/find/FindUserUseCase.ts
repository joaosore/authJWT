import { IUserDTO } from '@modules/core/users/dtos/IUserDTO';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/User/IUserRepository';

@injectable()
class FindUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<IUserDTO[]> {
    return await this.userRepository.find();
  }
}

export { FindUserUseCase };
