import { IUserDTO } from '@modules/core/users/dtos/IUserDTO';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/User/IUserRepository';

@injectable()
class FindByCpfUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(cpf: string): Promise<IUserDTO | null> {
    return await this.userRepository.findByCPF(cpf);
  }
}

export { FindByCpfUserUseCase };
