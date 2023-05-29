import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthTokenUseCase } from './AuthTokenUseCase';

class AuthTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const authTokenUseCase = container.resolve(AuthTokenUseCase);

    const authenticateInfo = await authTokenUseCase.execute({
      cpf,
      password,
    });

    return response.json(authenticateInfo);
  }
}

export { AuthTokenController };
