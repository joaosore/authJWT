import {
  CreateUser,
  DeleteUserById,
  password,
} from '@modules/users/test/factory';
import request from 'supertest';
import mongoose from 'mongoose';
import { Auth } from '../entities/Auth';
import { app } from 'app';
import { IAuthTokenResponseDTO } from '../dtos/IAuthTokenResponseDTO';

const AuthModel = mongoose.model('Auth', Auth);

const CreateAuth = async (): Promise<IAuthTokenResponseDTO> => {
  const user = await CreateUser();

  const TokenResponse = await request(app).post('/auth/sessions').send({
    cpf: user.cpf,
    password,
  });

  return TokenResponse.body;
};

const CreateAccessToken = async ({
  refresh_token,
  enterprise_id,
}: any): Promise<IAuthTokenResponseDTO> => {
  const TokenResponse = await request(app).post('/auth/access-token').send({
    refresh_token,
    enterprise_id,
  });
  return TokenResponse.body;
};

interface IDestroyAuthByRefreshToken {
  refresh_token: string;
  user_id: string;
}

const DestroyAuthByRefreshToken = async ({
  refresh_token,
  user_id,
}: IDestroyAuthByRefreshToken) => {
  await AuthModel.deleteOne({ refresh_token });
  await DeleteUserById(user_id);
};

const DestroyAccessToken = async ({ refresh_token }: any) => {
  await AuthModel.deleteOne({ refresh_token });
};

const TruncateAuth = async () => {
  await AuthModel.deleteMany({});
};

export {
  DestroyAuthByRefreshToken,
  CreateAuth,
  CreateAccessToken,
  DestroyAccessToken,
  TruncateAuth,
};
