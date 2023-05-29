import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateRoleUseCase } from './UpdateRoleUseCase';

class UpdateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, description } = request.body;
    const { id } = request.params;

    const updateRoleUseCase = container.resolve(UpdateRoleUseCase);

    await updateRoleUseCase.execute({ id, type, description });

    return response.status(200).send();
  }
}

export { UpdateRoleController };
