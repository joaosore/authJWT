import { AppError } from '@config/AppError';
import { IRoleRepository } from '@modules/core/roles/repositories/Role/IRoleRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteRoleUseCase {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const roleAlreadyNotExists = await this.roleRepository.findById(id);

    if (!roleAlreadyNotExists) {
      throw new AppError('Role already not exists', 404);
    }

    await this.roleRepository.delete(id);
  }
}

export { DeleteRoleUseCase };
