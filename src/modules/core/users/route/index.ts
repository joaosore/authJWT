import { Authenticated } from '@middleware/Authenticated';
import { Router } from 'express';
import { CreateUserController } from '../useCases/create/CreateUserController';
import { DeleteUserController } from '../useCases/delete/DeleteUserController';
import { FindUserController } from '../useCases/find/FindUserController';
import { FindByCpfUserController } from '../useCases/findByCpf/FindByCpfUserController';
import { UpdateUserController } from '../useCases/update/UpdateUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const findUserController = new FindUserController();
const findByCpfUserController = new FindByCpfUserController();

userRoutes.use(Authenticated);

const pathUserRegister = [
  /**
   * @swagger
   * /user:
   *      get:
   *          summary: Retorna todos os usuário do Sistema
   *          security:
   *              - bearerAuth: []
   *          tags:
   *              - Users
   *          description: Envia uma mensagem para o servidor e retorna uma lista de usuários
   *          responses:
   *              201:
   *                  description: Success
   *              401:
   *                  description: Unauthorized
   *              404:
   *                  description: Not found
   *              500:
   *                  description: Internal server error
   */
  {
    method: 'GET',
    moduleByName: 'User',
    url: '',
    parans: '',
    handlers: findUserController.handle,
  },
  /**
   * @swagger
   * /user/cpf/{cpf}:
   *      get:
   *          summary: Retorna um usuário selecionado pelo CPF
   *          parameters:
   *               - in: path
   *                 name: cpf
   *                 schema:
   *                   type: string
   *                 required: true
   *                 description: CPF
   *          security:
   *              - bearerAuth: []
   *          tags:
   *              - Users
   *          description: Envia uma mensagem para o servidor e retorna um usuário
   *          responses:
   *              201:
   *                  description: Success
   *              401:
   *                  description: Unauthorized
   *              404:
   *                  description: Not found
   *              500:
   *                  description: Internal server error
   */
  {
    method: 'GET',
    moduleByName: 'User',
    url: 'cpf',
    parans: '/:cpf',
    handlers: findByCpfUserController.handle,
  },
  /**
   * @swagger
   * /user:
   *      post:
   *          summary: Cadastra um usuário no sistema
   *          security:
   *              - bearerAuth: []
   *          tags:
   *              - Users
   *          description: Envia os dados do Body para o servidor e cria o usuário no sistema
   *          requestBody:
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: object
   *                          properties:
   *                              name:
   *                                  type: string
   *                                  example: Johnny Dev
   *                              email:
   *                                  type: string
   *                                  example: joao@johnnydev.com.br
   *                              cpf:
   *                                  type: string
   *                                  example: 12345678910
   *                              password:
   *                                  type: string
   *                                  example: xxxxxxxxx
   *          responses:
   *              201:
   *                  description: Success
   *              401:
   *                  description: Unauthorized
   *                  content:
   *                      application/json:
   *                          schema:
   *                              type: object
   *                              properties:
   *                                  message:
   *                                      type: string
   *                                      example: User already exists
   *              404:
   *                  description: Not found
   *              500:
   *                  description: Internal server error
   */
  {
    method: 'POST',
    moduleByName: 'User',
    url: '',
    parans: '',
    handlers: createUserController.handle,
  },
  /**
   * @swagger
   * /user/{id}:
   *      put:
   *          summary: Atualiza os dados de um usuário
   *          parameters:
   *               - in: path
   *                 name: id
   *                 schema:
   *                   type: string
   *                 required: true
   *                 description: ID do Usuário
   *          security:
   *              - bearerAuth: []
   *          tags:
   *              - Users
   *          description: Envia os dados do Body com o Path para o servidor e atualiza os dados do usuário no sistema
   *          requestBody:
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: object
   *                          properties:
   *                              name:
   *                                  type: string
   *                                  example: Johnny Dev 2
   *                              email:
   *                                  type: string
   *                                  example: joao2@johnnydev.com.br
   *                              password:
   *                                  type: string
   *                                  example: xxxxxxxxx
   *          responses:
   *              200:
   *                  description: Success
   *              401:
   *                  description: Unauthorized
   *                  content:
   *                      application/json:
   *                          schema:
   *                              type: object
   *                              properties:
   *                                  message:
   *                                      type: string
   *                                      example: User already not exists
   *              404:
   *                  description: Not found
   *              500:
   *                  description: Internal server error
   */
  {
    method: 'PUT',
    moduleByName: 'User',
    url: '',
    parans: '/:id',
    handlers: updateUserController.handle,
  },
  /**
   * @swagger
   * /user/{id}:
   *      delete:
   *          summary: Apaga o usuário do sistema
   *          parameters:
   *               - in: path
   *                 name: id
   *                 schema:
   *                   type: string
   *                 required: true
   *                 description: ID do usuário
   *          security:
   *              - bearerAuth: []
   *          tags:
   *              - Users
   *          description: Envie uma mensagem para o servidor e obtenha uma resposta adicionada ao texto original.
   *          responses:
   *              200:
   *                  description: Success
   *              404:
   *                  description: Not found
   *                  content:
   *                      application/json:
   *                          schema:
   *                              type: object
   *                              properties:
   *                                  message:
   *                                      type: string
   *                                      example: User already not exists
   *              500:
   *                  description: Internal server error
   */
  {
    method: 'DELETE',
    moduleByName: 'User',
    url: '',
    parans: '/:id',
    handlers: deleteUserController.handle,
  },
];

pathUserRegister.map(path => {
  let url = '/' + path.url + path.parans;
  url = url.replace('//', '/');
  switch (path.method) {
    case 'GET':
      userRoutes.get(url, path.handlers);
      break;
    case 'POST':
      userRoutes.post(url, path.handlers);
      break;
    case 'DELETE':
      userRoutes.delete(url, path.handlers);
      break;
    case 'PUT':
      userRoutes.put(url, path.handlers);
      break;
  }
});

export { userRoutes, pathUserRegister };
