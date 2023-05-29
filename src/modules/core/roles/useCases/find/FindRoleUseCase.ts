import { IRoleDTO } from '@modules/core/roles/dtos/IRoleDTO';
import { IRoleRepository } from '@modules/core/roles/repositories/Role/IRoleRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindRoleUseCase {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  async execute(): Promise<IRoleDTO[]> {
    return await this.roleRepository.find();
  }
}

export { FindRoleUseCase };
