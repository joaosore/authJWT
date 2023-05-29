import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindDeletedUserUseCase } from './FindDeletedUserUseCase';

class FindDeletedUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findDeletedUserUseCase = container.resolve(FindDeletedUserUseCase);

    const user = await findDeletedUserUseCase.execute();

    return response.status(200).json(user);
  }
}

export { FindDeletedUserController };
