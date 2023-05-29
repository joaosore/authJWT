import { swaggerRoutes } from '@config/swagger';
import { authRoutes } from '@modules/core/auth/route';
import { roleRoutes } from '@modules/core/roles/route';
import { userRoutes } from '@modules/core/users/route';
import { Router } from 'express';
import { errorMiddleware } from 'middleware/AppError';

const router = Router();

const moduleRegister = [
  {
    name: 'Auth',
    url: '/auth',
    handlers: authRoutes,
  },
  {
    name: 'User',
    url: '/user',
    handlers: userRoutes,
  },
  {
    name: 'Role',
    url: '/role',
    handlers: roleRoutes,
  },
  {
    name: 'Doc',
    url: '/doc',
    handlers: swaggerRoutes,
  },
];

moduleRegister.map(module => {
  router.use(module.url, module.handlers);
});

// Middleware of Errors
router.use(errorMiddleware);

export { router, moduleRegister };
