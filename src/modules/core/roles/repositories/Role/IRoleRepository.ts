import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { IRoleDTO } from '@modules/roles/dtos/IRoleDTO';
import { IUpdateRoleDTO } from '@modules/roles/dtos/IUpdateRoleDTO';

interface IRoleRepository {
  create({ type, description }: ICreateRoleDTO): Promise<void>;
  update({ id, type, description }: IUpdateRoleDTO): Promise<void>;
  delete(id: string): Promise<void>;
  find(): Promise<IRoleDTO[]>;
  findById(id: string): Promise<IRoleDTO | null>;
  findByType(type: string): Promise<IRoleDTO | null>;
}

export { IRoleRepository };
