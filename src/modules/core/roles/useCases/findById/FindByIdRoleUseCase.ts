import { IRoleDTO } from '@modules/roles/dtos/IRoleDTO';
import { IRoleRepository } from '@modules/roles/repositories/Role/IRoleRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindByIdRoleUseCase {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  async execute(id: string): Promise<IRoleDTO | null> {
    return await this.roleRepository.findById(id);
  }
}

export { FindByIdRoleUseCase };
