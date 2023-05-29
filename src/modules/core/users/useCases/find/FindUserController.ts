import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindUserUseCase } from './FindUserUseCase';

class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findUserUseCase = container.resolve(FindUserUseCase);

    const users = await findUserUseCase.execute();

    return response.status(200).json(users);
  }
}

export { FindUserController };
