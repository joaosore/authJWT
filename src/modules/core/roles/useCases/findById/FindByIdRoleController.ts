import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindByIdRoleUseCase } from './FindByIdRoleUseCase';

class FindByIdRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findByIdRoleUseCase = container.resolve(FindByIdRoleUseCase);

    const role = await findByIdRoleUseCase.execute(id);

    return response.status(201).send(role);
  }
}

export { FindByIdRoleController };
