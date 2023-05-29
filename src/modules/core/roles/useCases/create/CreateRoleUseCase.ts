import { AppError } from '@config/AppError';
import { ICreateRoleDTO } from '@modules/core/roles/dtos/ICreateRoleDTO';
import { IRoleRepository } from '@modules/core/roles/repositories/Role/IRoleRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateRoleUseCase {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  async execute({ type, description }: ICreateRoleDTO): Promise<void> {
    const fileExists = await this.roleRepository.findByType(type);

    if (fileExists) {
      throw new AppError('Role already Exists', 401);
    }

    await this.roleRepository.create({
      type,
      description,
    });
  }
}

export { CreateRoleUseCase };
