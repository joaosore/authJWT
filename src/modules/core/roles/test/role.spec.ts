import { it, describe, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import {
  CreateRole,
  DataRole,
  DeleteRoleById,
  FindRoleByTypeDescription,
} from './factory';
import {
  CreateAuth,
  DestroyAuthByRefreshToken,
} from '@modules/auth/test/factory';
import { uuid } from 'uuidv4';
import { AccessTokenTest } from '__teste__/AccessTokenTest';

describe('GET', async () => {
  it('try to list all roles, not being authenticated', async () => {
    const response = await request(app).get('/role');
    const { message } = response.body;
    expect(message).equal('Token missing');
    expect(response.statusCode).toBe(401);
  });

  it('try to list all roles, using an invalid token', async () => {
    const response = await request(app)
      .get('/role')
      .set('Authorization', `Bearer Ivalidtoken`);
    const { message } = response.body;
    expect(message).equal('Ivalid token!');
    expect(response.statusCode).toBe(401);
  });

  it('try to list all roles, being authenticated', async () => {
    const { refresh_token, token, user } = await CreateAuth();

    const response = await request(app)
      .get('/role')
      .set('Authorization', `Bearer ${token}`);

    await DestroyAuthByRefreshToken({
      refresh_token,
      user_id: user._id,
    });

    const { message } = response.body;
    expect(message).equal('The route is without permission');
    expect(response.statusCode).toBe(401);
  });

  it('try to list all roles, being authenticated and with permission in the path', async () => {
    const session = new AccessTokenTest({
      moduleMethod: 'GET',
      moduleName: 'Role',
      moduleUrl: '/role',
    });
    await session.createSession();

    const response = await request(app)
      .get('/role')
      .set('Authorization', `Bearer ${session.getAccessToken()}`);

    await session.destroySession();

    expect(response.statusCode).toBe(200);
  });
});

describe('POST', async () => {
  it('try to create a role, being authenticated and with permission in the path', async () => {
    const session = new AccessTokenTest({
      moduleMethod: 'POST',
      moduleName: 'Role',
      moduleUrl: '/role',
    });
    await session.createSession();

    const dataRole = await DataRole();
    const response = await request(app)
      .post('/role')
      .send(dataRole)
      .set('Authorization', `Bearer ${session.getAccessToken()}`);

    const findRoleByTypeDescription = await FindRoleByTypeDescription({
      type: dataRole.type,
      description: dataRole.description,
    });

    if (findRoleByTypeDescription) {
      await DeleteRoleById(findRoleByTypeDescription._id);
    }

    await session.destroySession();

    expect(response.statusCode).toBe(201);
  });
  it('try to create a role, being authenticated and with permission in the path, but it already exists in the database', async () => {
    const session = new AccessTokenTest({
      moduleMethod: 'POST',
      moduleName: 'Role',
      moduleUrl: '/role',
    });
    await session.createSession();

    const dataRole = await DataRole();
    const createRole = await CreateRole(dataRole);
    const response = await request(app)
      .post('/role')
      .send({
        type: createRole.type,
        description: createRole.description,
      })
      .set('Authorization', `Bearer ${session.getAccessToken()}`);

    await DeleteRoleById(createRole._id);

    await session.destroySession();

    const { message } = response.body;
    expect(response.statusCode).toBe(401);
    expect(message).equal('Role already Exists');
  });
  it('try to create a role, being authenticated and with permission in the path, but forgetting to inform some mandatory field', async () => {
    const session = new AccessTokenTest({
      moduleMethod: 'POST',
      moduleName: 'Role',
      moduleUrl: '/role',
    });
    await session.createSession();

    // missing fild descrition
    const response = await request(app)
      .post('/role')
      .send({
        type: 'teste',
      })
      .set('Authorization', `Bearer ${session.getAccessToken()}`);

    await session.destroySession();

    const { message } = response.body;
    expect(response.statusCode).toBe(500);
    expect(message).toContain('validation failed');
  });
});

describe('UPDATE', async () => {
  it('try to update role, being authenticated and with permission in the path', async () => {
    const session = new AccessTokenTest({
      moduleMethod: 'PUT',
      moduleName: 'Role',
      moduleUrl: '/role',
    });
    await session.createSession();

    const dataRole = await DataRole();
    const createRole = await CreateRole(dataRole);
    const response = await request(app)
      .put(`/role/${createRole._id}`)
      .send({
        type: 'teste',
        description: 'Administrador Teste',
      })
      .set('Authorization', `Bearer ${session.getAccessToken()}`);

    await DeleteRoleById(createRole._id);

    await session.destroySession();

    expect(response.statusCode).toBe(200);
  });
  it('try to update a pushy role, being authenticated and with permission in the path', async () => {
    const session = new AccessTokenTest({
      moduleMethod: 'PUT',
      moduleName: 'Role',
      moduleUrl: '/role',
    });
    await session.createSession();

    const response = await request(app)
      .put(`/role/${uuid()}`)
      .send({
        type: 'teste',
        description: 'Administrador Teste',
      })
      .set('Authorization', `Bearer ${session.getAccessToken()}`);

    await session.destroySession();

    const { message } = response.body;
    expect(response.statusCode).toBe(404);
    expect(message).equal('Role not Exists');
  });
});

describe('DELETE', async () => {
  it('try to delete role, being authenticated and with permission in the path', async () => {
    const session = new AccessTokenTest({
      moduleMethod: 'DELETE',
      moduleName: 'Role',
      moduleUrl: '/role',
    });
    await session.createSession();

    const dataRole = await DataRole();
    const createRole = await CreateRole(dataRole);
    const response = await request(app)
      .delete(`/role/${createRole._id}`)
      .set('Authorization', `Bearer ${session.getAccessToken()}`);

    await DeleteRoleById(createRole._id);
    await session.destroySession();

    expect(response.statusCode).toBe(200);
  });
  it('try to delete a pushy role, being authenticated and with permission in the path', async () => {
    const session = new AccessTokenTest({
      moduleMethod: 'DELETE',
      moduleName: 'Role',
      moduleUrl: '/role',
    });
    await session.createSession();

    const response = await request(app)
      .delete(`/role/${uuid()}`)
      .set('Authorization', `Bearer ${session.getAccessToken()}`);

    await session.destroySession();

    const { message } = response.body;
    expect(response.statusCode).toBe(404);
    expect(message).equal('Role already not exists');
  });
});
