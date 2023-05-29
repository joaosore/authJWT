import { ICreateUserDTO } from '@modules/core/users/dtos/ICreateUserDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, password }: ICreateUserDTO = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({ name, email, cpf, password });

    return response.status(201).send();
  }
}

export { CreateUserController };
