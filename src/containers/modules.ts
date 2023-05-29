import { AuthRepository } from '@modules/core/auth/repositories/Auth/AuthRepository';
import { IAuthRepository } from '@modules/core/auth/repositories/Auth/IAuthRepository';
import { IRoleRepository } from '@modules/core/roles/repositories/Role/IRoleRepository';
import { RoleRepository } from '@modules/core/roles/repositories/Role/RoleRepository';
import { IUserRepository } from '@modules/core/users/repositories/User/IUserRepository';
import { UserRepository } from '@modules/core/users/repositories/User/UserRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IAuthRepository>('AuthRepository', AuthRepository);

container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository);
