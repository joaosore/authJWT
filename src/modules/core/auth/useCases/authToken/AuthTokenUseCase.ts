import { AppError } from '@config/AppError';
import auth from '@config/Auth';
import { IAuthTokenDTO } from '@modules/core/auth/dtos/IAuthTokenDTO';
import { IAuthTokenResponseDTO } from '@modules/core/auth/dtos/IAuthTokenResponseDTO';
import { IAuthRepository } from '@modules/core/auth/repositories/Auth/IAuthRepository';
import { IUserRepository } from '@modules/core/users/repositories/User/IUserRepository';
import { IDataProvider } from '@providers/DataProvider/IDataProvider';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

@injectable()
class AuthTokenUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('AuthRepository')
    private authRepository: IAuthRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDataProvider,
  ) {}

  async execute({
    cpf,
    password,
  }: IAuthTokenDTO): Promise<IAuthTokenResponseDTO> {
    const user = await this.userRepository.findByCPF(cpf);

    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!user) {
      throw new AppError('CPF or Password incorrect 1', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('CPF or Password incorrect 2', 401);
    }

    const token = sign({}, secret_token, {
      subject: user._id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ cpf }, secret_refresh_token, {
      subject: user._id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    if (!user?._id) {
      throw new AppError('Wrong ID', 401);
    }

    await this.authRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user?._id,
    });

    const tokenReturn: IAuthTokenResponseDTO = {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        role_id: user.role_id,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthTokenUseCase };
