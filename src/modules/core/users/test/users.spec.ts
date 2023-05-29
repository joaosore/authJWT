// import { it, describe, expect } from 'vitest';
// import request from 'supertest';
// import { app } from '../../../app';
// import {
//   CreateAuth,
//   DestroyAuthByRefreshToken,
// } from '@modules/auth/test/factory';
// import {
//   DestroyPermissionInThePath,
//   PermissionInThePath,
// } from '__teste__/DefaultFactory';
// import { CreateRole, DeleteRoleById } from '@modules/roles/test/factory';
// import { uuid } from 'uuidv4';
// import { DataUser, DeleteUserById, FindUserByCpf } from './factory';

// describe('GET', async () => {
//   it('try to list all users, not being authenticated', async () => {
//     const response = await request(app).get('/user');
//     const { message } = response.body;
//     expect(message).equal('Token missing');
//     expect(response.statusCode).toBe(401);
//   });

//   it('try to list all users, using an invalid token', async () => {
//     const response = await request(app)
//       .get('/user')
//       .set('Authorization', `Bearer Ivalidtoken`);
//     const { message } = response.body;
//     expect(message).equal('Ivalid token!');
//     expect(response.statusCode).toBe(401);
//   });

//   it('try to list all users, being authenticated', async () => {
//     const { refresh_token, token, user } = await CreateAuth();

//     const response = await request(app)
//       .get('/user')
//       .set('Authorization', `Bearer ${token}`);

//     await DestroyAuthByRefreshToken({
//       refresh_token,
//       user_id: user._id,
//     });

//     const { message } = response.body;
//     expect(message).equal('The user does not have permission');
//     expect(response.statusCode).toBe(401);
//   });

//   it('try to list all users, being authenticated and with permission in the path', async () => {
//     const { refresh_token, token, user } = await CreateAuth();
//     const { role, module, path } = await PermissionInThePath({
//       cpf: user.cpf,
//       name: 'User',
//       url: '/user',
//       method: 'GET',
//       sub_model: null,
//     });

//     const response = await request(app)
//       .get('/user')
//       .set('Authorization', `Bearer ${token}`);

//     await DestroyPermissionInThePath({
//       role_id: role._id,
//       module_id: module._id,
//       path_id: path._id,
//     });
//     await DestroyAuthByRefreshToken({
//       refresh_token,
//       user_id: user._id,
//     });

//     expect(response.statusCode).toBe(200);
//   });

//   it('try to list one user by cpf, being authenticated and with permission in the path', async () => {
//     const { refresh_token, token, user } = await CreateAuth();
//     const { role, module, path } = await PermissionInThePath({
//       cpf: user.cpf,
//       name: 'User',
//       url: '/user',
//       method: 'GET',
//       sub_model: 'cpf',
//     });

//     const response = await request(app)
//       .get(`/user/cpf/${user.cpf}`)
//       .set('Authorization', `Bearer ${token}`);

//     await DestroyPermissionInThePath({
//       role_id: role._id,
//       module_id: module._id,
//       path_id: path._id,
//     });
//     await DestroyAuthByRefreshToken({
//       refresh_token,
//       user_id: user._id,
//     });

//     expect(response.statusCode).toBe(200);
//   });
// });

// describe('POST', async () => {
//   it('try to create a user, being authenticated and with permission in the path', async () => {
//     const { refresh_token, token, user } = await CreateAuth();
//     const { role, module, path } = await PermissionInThePath({
//       cpf: user.cpf,
//       name: 'User',
//       url: '/user',
//       method: 'POST',
//       sub_model: null,
//     });

//     const dataUser = await DataUser();

//     const response = await request(app)
//       .post('/user')
//       .send(dataUser)
//       .set('Authorization', `Bearer ${token}`);

//     const findUserByCpf = await FindUserByCpf(dataUser.cpf);
//     if (findUserByCpf) {
//       await DeleteUserById(findUserByCpf?._id);
//     }
//     await DestroyPermissionInThePath({
//       role_id: role._id,
//       module_id: module._id,
//       path_id: path._id,
//     });
//     await DestroyAuthByRefreshToken({
//       refresh_token,
//       user_id: user._id,
//     });

//     console.log(response);

//     expect(response.statusCode).toBe(201);
//   });

//   it('try to create a user, being authenticated and with permission in the path, but it already exists in the database', async () => {
//     const { refresh_token, token, user } = await CreateAuth();
//     const { role, module, path } = await PermissionInThePath({
//       cpf: user.cpf,
//       name: 'User',
//       url: '/user',
//       method: 'POST',
//       sub_model: null,
//     });

//     const newUser = {
//       name: user.name,
//       email: user.email,
//       cpf: user.cpf,
//       password: '123456',
//     };

//     const response = await request(app)
//       .post('/user')
//       .send(newUser)
//       .set('Authorization', `Bearer ${token}`);

//     await DestroyPermissionInThePath({
//       role_id: role._id,
//       module_id: module._id,
//       path_id: path._id,
//     });
//     await DestroyAuthByRefreshToken({
//       refresh_token,
//       user_id: user._id,
//     });

//     const { message } = response.body;
//     expect(response.statusCode).toBe(401);
//     expect(message).equal('User already exists');
//   });

//   it('try to create a user, being authenticated and with permission in the path, but forgetting to inform some mandatory field', async () => {
//     const { refresh_token, token, user } = await CreateAuth();
//     const { role, module, path } = await PermissionInThePath({
//       cpf: user.cpf,
//       name: 'User',
//       url: '/user',
//       method: 'POST',
//       sub_model: null,
//     });

//     // missing fild CPF
//     const response = await request(app)
//       .post('/user')
//       .send({
//         name: 'João Marcos',
//         email: 'joao.morais@waterservicestech.com',
//         password: '123456',
//       })
//       .set('Authorization', `Bearer ${token}`);

//     await DestroyPermissionInThePath({
//       role_id: role._id,
//       module_id: module._id,
//       path_id: path._id,
//     });
//     await DestroyAuthByRefreshToken({
//       refresh_token,
//       user_id: user._id,
//     });

//     const { message } = response.body;
//     expect(response.statusCode).toBe(500);
//     expect(message).toContain('validation failed');
//   });

//   it('try to attach a role to a user, being authenticated and with access to the path', async () => {
//     const { refresh_token, token, user } = await CreateAuth();
//     const { role, module, path } = await PermissionInThePath({
//       cpf: user.cpf,
//       name: 'User',
//       url: '/user',
//       method: 'POST',
//       sub_model: 'attachRole',
//     });

//     const User2 = await CreateAuth();
//     const newRole = await CreateRole();

//     const roleId = newRole._id;

//     const response = await request(app)
//       .post(`/user/attachRole/${User2.user._id}`)
//       .send({
//         role_id: roleId,
//       })
//       .set('Authorization', `Bearer ${token}`);

//     await DestroyAuthByRefreshToken({
//       refresh_token: User2.refresh_token,
//       user_id: User2.user._id,
//     });
//     await DeleteRoleById(roleId);

//     await DestroyPermissionInThePath({
//       role_id: role._id,
//       module_id: module._id,
//       path_id: path._id,
//     });
//     await DestroyAuthByRefreshToken({
//       refresh_token,
//       user_id: user._id,
//     });

//     expect(response.statusCode).toBe(201);
//   });
// });

// describe('PUT', async () => {
//   it('try to update user, being authenticated and with permission in the path', async () => {
//     const { refresh_token, token, user } = await CreateAuth();
//     const { role, module, path } = await PermissionInThePath({
//       cpf: user.cpf,
//       name: 'User',
//       url: '/user',
//       method: 'PUT',
//       sub_model: null,
//     });

//     const response = await request(app)
//       .put(`/user/${user._id}`)
//       .send({
//         name: 'João Marcos 2',
//         email: 'joao2.morais@waterservicestech.com',
//         password: '1234567',
//       })
//       .set('Authorization', `Bearer ${token}`);

//     await DestroyPermissionInThePath({
//       role_id: role._id,
//       module_id: module._id,
//       path_id: path._id,
//     });
//     await DestroyAuthByRefreshToken({
//       refresh_token,
//       user_id: user._id,
//     });

//     expect(response.statusCode).toBe(200);
//   });

//   it('try to update a pushy user, being authenticated and with permission in the path', async () => {
//     const { refresh_token, token, user } = await CreateAuth();
//     const { role, module, path } = await PermissionInThePath({
//       cpf: user.cpf,
//       name: 'User',
//       url: '/user',
//       method: 'PUT',
//       sub_model: null,
//     });

//     const response = await request(app)
//       .put(`/user/${uuid()}`)
//       .send({
//         name: 'João Marcos 2',
//         email: 'joao2.morais@waterservicestech.com',
//         password: '1234567',
//       })
//       .set('Authorization', `Bearer ${token}`);

//     await DestroyPermissionInThePath({
//       role_id: role._id,
//       module_id: module._id,
//       path_id: path._id,
//     });
//     await DestroyAuthByRefreshToken({
//       refresh_token,
//       user_id: user._id,
//     });

//     const { message } = response.body;

//     expect(response.statusCode).toBe(404);
//     expect(message).equal('User already not exists');
//   });
// });

// describe('DELETE', async () => {
//   it('try to delete user, being authenticated and with permission in the path', async () => {
//     const { refresh_token, token, user } = await CreateAuth();
//     const { role, module, path } = await PermissionInThePath({
//       cpf: user.cpf,
//       name: 'User',
//       url: '/user',
//       method: 'DELETE',
//       sub_model: null,
//     });

//     const response = await request(app)
//       .delete(`/user/${user._id}`)
//       .set('Authorization', `Bearer ${token}`);

//     await DestroyPermissionInThePath({
//       role_id: role._id,
//       module_id: module._id,
//       path_id: path._id,
//     });
//     await DestroyAuthByRefreshToken({
//       refresh_token,
//       user_id: user._id,
//     });

//     expect(response.statusCode).toBe(200);
//   });

//   it('try to delete a pushy user, being authenticated and with permission in the path', async () => {
//     const { refresh_token, token, user } = await CreateAuth();
//     const { role, module, path } = await PermissionInThePath({
//       cpf: user.cpf,
//       name: 'User',
//       url: '/user',
//       method: 'DELETE',
//       sub_model: null,
//     });

//     const response = await request(app)
//       .delete(`/user/${uuid()}`)
//       .set('Authorization', `Bearer ${token}`);

//     await DestroyPermissionInThePath({
//       role_id: role._id,
//       module_id: module._id,
//       path_id: path._id,
//     });
//     await DestroyAuthByRefreshToken({
//       refresh_token,
//       user_id: user._id,
//     });

//     const { message } = response.body;
//     expect(response.statusCode).toBe(404);
//     expect(message).equal('User already not exists');
//   });
// });
