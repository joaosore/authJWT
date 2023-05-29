import { Router } from 'express';
import { AuthTokenController } from '../useCases/authToken/AuthTokenController';
import { RefreshTokenController } from '../useCases/refreshToken/RefreshTokenController';

const authRoutes = Router();

const authTokenController = new AuthTokenController();
const refreshTokenController = new RefreshTokenController();

const pathAuthRegister = [
  /**
   * @swagger
   * /auth/sessions:
   *      post:
   *          summary: Cria uma sessão de usuário
   *          security:
   *              - bearerAuth: []
   *          tags:
   *              - Auth
   *          description: Envia os dados do Body para o servidor e cria uma sessão no sistema
   *          requestBody:
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: object
   *                          properties:
   *                              cpf:
   *                                  type: string
   *                                  example: 12345678910
   *                              password:
   *                                  type: string
   *                                  example: xxxxxxxxx
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
    moduleByName: 'Auth',
    url: 'sessions',
    parans: '',
    handlers: authTokenController.handle,
  },
  /**
   * @swagger
   * /auth/refresh-token:
   *      post:
   *          summary: Atualiza sessão do sistema
   *          security:
   *              - bearerAuth: []
   *          tags:
   *              - Auth
   *          description: Envia os dados do Body para o servidor e atualiza a sessão no sistema
   *          requestBody:
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: object
   *                          properties:
   *                              refresh_token:
   *                                  type: string
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
    moduleByName: 'Auth',
    url: 'refresh-token',
    parans: '',
    handlers: refreshTokenController.handle,
  },
];

pathAuthRegister.map(path => {
  let url = '/' + path.url + path.parans;
  url = url.replace('//', '/');
  switch (path.method) {
    case 'GET':
      authRoutes.get(url, path.handlers);
      break;
    case 'POST':
      authRoutes.post(url, path.handlers);
      break;
    case 'DELETE':
      authRoutes.delete(url, path.handlers);
      break;
    case 'PUT':
      authRoutes.put(url, path.handlers);
      break;
  }
});

export { authRoutes, pathAuthRegister };
