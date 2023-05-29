import { IAttachRoleUserDTO } from '@modules/users/dtos/IAttachRoleUserDTO';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { ICreateUserOAuthDTO } from '@modules/users/dtos/ICreateUserOAuthDTO';
import { IDetachRoleUserDTO } from '@modules/users/dtos/IDetachRoleUserDTO';
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO';
import { IUserDTO } from '../../dtos/IUserDTO';

interface IUserRepository {
  create({ name, email, cpf, password }: ICreateUserDTO): Promise<void>;
  createByOAuth({
    name,
    email,
    cpf,
    password,
    o_auth,
  }: ICreateUserOAuthDTO): Promise<void>;
  update({ id, name, password, email }: IUpdateUserDTO): Promise<void>;
  find(): Promise<IUserDTO[]>;
  delete(id: string): Promise<void>;
  findByCPF(cpf: string): Promise<IUserDTO | null>;
  findById(id: string): Promise<IUserDTO | null>;
  findDeleted(): Promise<IUserDTO[]>;
  attachRole({ id, role_id }: IAttachRoleUserDTO): Promise<void>;
  detachRole({ id, role_id }: IDetachRoleUserDTO): Promise<void>;
}

export { IUserRepository };
