import mongoose from 'mongoose';
import { IRoleDTO } from '../dtos/IRoleDTO';
const faker = require('faker-br');
import { Role } from '../entities/Roles';

const RoleModel = mongoose.model('Role', Role);

const DataRole = async () => {
  const data = {
    type: faker.random.number(100000000),
    description: faker.random.number(100000000),
  };
  return data;
};

const CreateRole = async (data: any): Promise<IRoleDTO> => {
  return await RoleModel.create(data);
};

const DeleteRoleById = async (id: string) => {
  await RoleModel.deleteOne({ _id: id });
};

interface IFindRoleByTypeDescription {
  type: string;
  description: string;
}

const FindRoleByTypeDescription = async ({
  type,
  description,
}: IFindRoleByTypeDescription): Promise<IRoleDTO | null> => {
  return await RoleModel.findOne({
    type,
    description,
  });
};

const TruncateRole = async () => {
  await RoleModel.deleteMany();
};

export {
  DeleteRoleById,
  CreateRole,
  DataRole,
  TruncateRole,
  FindRoleByTypeDescription,
};
