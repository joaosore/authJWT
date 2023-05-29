import { DateUpdate, IsNotDeleted, SoftDelete } from '@config/HooksDatabase';
import { ICreateRoleDTO } from '@modules/core/roles/dtos/ICreateRoleDTO';
import { IRoleDTO } from '@modules/core/roles/dtos/IRoleDTO';
import { IUpdateRoleDTO } from '@modules/core/roles/dtos/IUpdateRoleDTO';
import { Role } from '@modules/core/roles/entities/Roles';
import mongoose from 'mongoose';
import { IRoleRepository } from './IRoleRepository';

class RoleRepository implements IRoleRepository {
  private repository;

  constructor() {
    this.repository = mongoose.model('Role', Role);
  }

  async update({ id, type, description }: IUpdateRoleDTO): Promise<void> {
    await this.repository.updateOne(
      { _id: id },
      {
        type,
        description,
        updated_at: DateUpdate(),
      },
    );
  }

  async delete(id: string): Promise<void> {
    await this.repository.updateOne({ _id: id }, SoftDelete());
  }

  async find(): Promise<IRoleDTO[]> {
    return await this.repository.find(IsNotDeleted());
  }

  async findById(id: string): Promise<IRoleDTO | null> {
    return await this.repository.findOne({ _id: id }).findOne(IsNotDeleted());
  }

  async findByType(type: string): Promise<IRoleDTO | null> {
    return await this.repository.findOne({ type }).findOne(IsNotDeleted());
  }

  async create({ type, description }: ICreateRoleDTO): Promise<void> {
    await this.repository.create({
      type,
      description,
    });
  }
}

export { RoleRepository };
