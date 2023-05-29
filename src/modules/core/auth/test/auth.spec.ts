import { it, describe, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import {
  CreateUser,
  DeleteUserById,
  password,
} from '@modules/users/test/factory';
import { DestroyAuthByRefreshToken } from './factory';

describe('POST', () => {
  it('should authenticate with valid credentials', async () => {
    const user = await CreateUser();

    const response = await request(app).post('/auth/sessions').send({
      cpf: user.cpf,
      password,
    });

    expect(response.statusCode).toBe(200);

    const { refresh_token } = response.body;
    await DestroyAuthByRefreshToken({ refresh_token, user_id: user._id });
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await CreateUser();

    const response = await request(app).post('/auth/sessions').send({
      cpf: user.cpf,
      password: 'InvalidPassword',
    });

    await DeleteUserById(user._id);

    expect(response.statusCode).toBe(401);
  });

  it('try to refresh the refresh token', async () => {
    const user = await CreateUser();

    const getRefreshToken = await request(app).post('/auth/sessions').send({
      cpf: user.cpf,
      password,
    });

    const oldRefreshToken = getRefreshToken.body;

    const response = await request(app).post('/auth/refresh-token').send({
      refresh_token: oldRefreshToken.refresh_token,
    });

    expect(response.statusCode).toBe(200);

    const { refresh_token } = response.body;

    await DestroyAuthByRefreshToken({
      refresh_token: oldRefreshToken.refresh_token,
      user_id: user._id,
    });
    await DestroyAuthByRefreshToken({ refresh_token, user_id: user._id });
  });
});
