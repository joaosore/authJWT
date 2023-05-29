import { IsNotDeleted } from '@config/HooksDatabase';
import { hash } from 'bcrypt';
import mongoose from 'mongoose';
import { IUserDTO } from '../dtos/IUserDTO';
const faker = require('faker-br');

import { User } from '../entities/User';

const UserModel = mongoose.model('User', User);

const password = '123123';

const DataUser = async () => {
  const passwordHash = await hash(password, 8);
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    cpf: faker.br.cpf(),
    password: passwordHash,
    tenant_id: 'Test',
  };
};

interface IAttachRoleInUser {
  cpf: string;
  role_id: string;
}

const AttachRoleInUser = async ({ cpf, role_id }: IAttachRoleInUser) => {
  const user = await UserModel.findOne({
    cpf,
  }).findOne(IsNotDeleted());

  await UserModel.updateOne({ _id: user?._id }, { role_id });
};

const CreateUser = async (): Promise<IUserDTO> => {
  const user = await DataUser();
  return await UserModel.create(user);
};

const DeleteUserById = async (id: string) => {
  await UserModel.deleteOne({ _id: id });
};

const FindUserByCpf = async (cpf: string): Promise<IUserDTO | null> => {
  return await UserModel.findOne({ cpf });
};

const TruncateUser = async () => {
  await UserModel.deleteMany();
};

export {
  CreateUser,
  DeleteUserById,
  password,
  DataUser,
  AttachRoleInUser,
  TruncateUser,
  FindUserByCpf,
};
