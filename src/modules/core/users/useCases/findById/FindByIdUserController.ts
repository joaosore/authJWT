import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindByIdUserUseCase } from './FindByIdUserUseCase';

class FindByIdUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findByIdUserUseCase = container.resolve(FindByIdUserUseCase);

    await findByIdUserUseCase.execute(id);

    return response.status(200).send();
  }
}

export { FindByIdUserController };
