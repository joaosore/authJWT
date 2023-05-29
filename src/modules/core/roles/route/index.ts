import { Router } from 'express';
import { Authenticated } from 'middleware/Authenticated';
import { CreateRoleController } from '../useCases/create/CreateRoleController';
import { DeleteRoleController } from '../useCases/delete/DeleteRoleController';
import { FindRoleController } from '../useCases/find/FindRoleController';
import { UpdateRoleController } from '../useCases/update/UpdateRoleController';

const roleRoutes = Router();

const createRoleController = new CreateRoleController();
const findRoleController = new FindRoleController();
const updateRoleController = new UpdateRoleController();
const deleteRoleController = new DeleteRoleController();

roleRoutes.use(Authenticated);

const pathRoleRegister = [
  /**
   * @swagger
   * /role:
   *      get:
   *          summary: Lista as Roles do Sistema
   *          security:
   *              - bearerAuth: []
   *          tags:
   *              - Role
   *          responses:
   *              201:
   *                  description: Success
   *              404:
   *                  description: Not found
   *              500:
   *                  description: Internal server error
   */
  {
    method: 'GET',
    moduleByName: 'Role',
    url: '',
    parans: '',
    handlers: findRoleController.handle,
  },
  /**
   * @swagger
   * /role:
   *      post:
   *          summary: Criar um Role
   *          security:
   *              - bearerAuth: []
   *          tags:
   *              - Role
   *          description: Envia dos dados para criar uma nova Role no servidor.
   *          requestBody:
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: object
   *                          properties:
   *                              type:
   *                                  type: string
   *                                  example: admin_iema
   *                              description:
   *                                  type: string
   *                                  example: Administrador IEMA
   *          responses:
   *              201:
   *                  description: Success
   *              404:
   *                  description: Not found
   *              500:
   *                  description: Internal server error
   */
  {
    method: 'POST',
    moduleByName: 'Role',
    url: '',
    parans: '',
    handlers: createRoleController.handle,
  },
  /**
   * @swagger
   * /role/{id}:
   *      put:
   *          summary: Atualizar uma Role
   *          parameters:
   *               - in: path
   *                 name: id
   *                 schema:
   *                   type: string
   *                 required: true
   *                 description: ID da Role
   *          security:
   *              - bearerAuth: []
   *          tags:
   *              - Role
   *          description: Envia os dados role para o servido
   *          requestBody:
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: object
   *                          properties:
   *                              type:
   *                                  type: string
   *                                  example: admin_iema
   *                              description:
   *                                  type: string
   *                                  example: Administrador IEMA 2
   *          responses:
   *              201:
   *                  description: Success
   *              404:
   *                  description: Not found
   *              500:
   *                  description: Internal server error
   */
  {
    method: 'PUT',
    moduleByName: 'Role',
    url: '',
    parans: '/:id',
    handlers: updateRoleController.handle,
  },
  /**
   * @swagger
   * /role/{id}:
   *      delete:
   *          summary: Deleta uma Role
   *          parameters:
   *               - in: path
   *                 name: id
   *                 schema:
   *                   type: string
   *                 required: true
   *                 description: ID da Role
   *          security:
   *              - bearerAuth: []
   *          tags:
   *              - Role
   *          responses:
   *              201:
   *                  description: Success
   *              404:
   *                  description: Not found
   *              500:
   *                  description: Internal server error
   */
  {
    method: 'DELETE',
    moduleByName: 'Role',
    url: '',
    parans: '/:id',
    handlers: deleteRoleController.handle,
  },
];

pathRoleRegister.map(path => {
  let url = '/' + path.url + path.parans;
  url = url.replace('//', '/');
  switch (path.method) {
    case 'GET':
      roleRoutes.get(url, path.handlers);
      break;
    case 'POST':
      roleRoutes.post(url, path.handlers);
      break;
    case 'DELETE':
      roleRoutes.delete(url, path.handlers);
      break;
    case 'PUT':
      roleRoutes.put(url, path.handlers);
      break;
  }
});

export { roleRoutes, pathRoleRegister };
