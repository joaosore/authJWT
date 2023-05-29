import {
  DateUpdate,
  IsDeleted,
  IsNotDeleted,
  SoftDelete,
} from '@config/HooksDatabase';
import { IAttachRoleUserDTO } from '@modules/core/users/dtos/IAttachRoleUserDTO';
import { ICreateUserDTO } from '@modules/core/users/dtos/ICreateUserDTO';
import { ICreateUserOAuthDTO } from '@modules/core/users/dtos/ICreateUserOAuthDTO';
import { IDetachRoleUserDTO } from '@modules/core/users/dtos/IDetachRoleUserDTO';
import { IUpdateUserDTO } from '@modules/core/users/dtos/IUpdateUserDTO';
import { IUserDTO } from '@modules/core/users/dtos/IUserDTO';
import mongoose from 'mongoose';
import { uuid } from 'uuidv4';
import { User } from '../../entities/User';
import { IUserRepository } from './IUserRepository';

class UserRepository implements IUserRepository {
  private repository;

  constructor() {
    this.repository = mongoose.model('User', User);
  }
  async createByOAuth({
    name,
    email,
    cpf,
    password,
    o_auth,
  }: ICreateUserOAuthDTO): Promise<void> {
    await this.repository.create({
      name,
      email,
      cpf,
      password,
      o_auth,
    });
  }

  async detachRole({ id, role_id }: IDetachRoleUserDTO): Promise<void> {
    await this.repository.findByIdAndUpdate(
      id,
      { $pull: { role_id }, updated_at: DateUpdate() },
      { safe: true },
    );
  }

  async attachRole({ id, role_id }: IAttachRoleUserDTO): Promise<void> {
    await this.repository.findByIdAndUpdate(
      id,
      { $push: { role_id }, updated_at: DateUpdate() },
      { new: true, useFindAndModify: false },
    );
  }

  async findDeleted(): Promise<IUserDTO[]> {
    return await this.repository.find(IsDeleted());
  }

  async findByCPF(cpf: string): Promise<IUserDTO | null> {
    return await this.repository.findOne({ cpf }).findOne(IsNotDeleted());
  }

  async find(): Promise<IUserDTO[]> {
    return await this.repository.find(IsNotDeleted());
  }

  async findById(id: string): Promise<IUserDTO | null> {
    return await this.repository.findOne({ _id: id }).findOne(IsNotDeleted());
  }

  async delete(id: string): Promise<void> {
    await this.repository.updateOne({ _id: id }, SoftDelete());
  }

  async update({ id, name, email, password }: IUpdateUserDTO): Promise<void> {
    await this.repository.updateOne(
      { _id: id },
      { name, email, password, updated_at: DateUpdate() },
    );
  }

  async create({ name, email, cpf, password }: ICreateUserDTO): Promise<void> {
    await this.repository.create({
      name,
      email,
      cpf,
      password,
    });
  }
}

export { UserRepository };
