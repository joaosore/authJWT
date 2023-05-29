import { AppError } from '@config/AppError';
import auth from '@config/Auth';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
  enterprise_id: string | null;
}

export async function Authenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id, enterprise_id } = verify(
      token,
      auth.secret_token,
    ) as IPayload;
    request.user = {
      id: user_id,
      enterprise_id,
    };

    next();
  } catch {
    throw new AppError('Ivalid token!', 401);
  }
}
