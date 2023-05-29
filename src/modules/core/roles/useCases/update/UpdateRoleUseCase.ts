import { AppError } from '@config/AppError';
import { IUpdateRoleDTO } from '@modules/core/roles/dtos/IUpdateRoleDTO';
import { IRoleRepository } from '@modules/core/roles/repositories/Role/IRoleRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateRoleUseCase {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  async execute({ id, type, description }: IUpdateRoleDTO): Promise<void> {
    const fileNotExists = await this.roleRepository.findById(id);

    if (!fileNotExists) {
      throw new AppError('Role not Exists', 404);
    }

    await this.roleRepository.update({
      id,
      type,
      description,
    });
  }
}

export { UpdateRoleUseCase };
