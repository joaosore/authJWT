import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindByCpfUserUseCase } from './FindByCpfUserUseCase';

class FindByCpfUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const findByCpfUserUseCase = container.resolve(FindByCpfUserUseCase);

    const user = await findByCpfUserUseCase.execute(cpf);

    return response.status(200).json(user);
  }
}

export { FindByCpfUserController };
