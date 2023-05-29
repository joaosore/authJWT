import { IUserDTO } from '@modules/users/dtos/IUserDTO';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/User/IUserRepository';

@injectable()
class FindDeletedUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<IUserDTO[]> {
    return await this.userRepository.findDeleted();
  }
}

export { FindDeletedUserUseCase };
