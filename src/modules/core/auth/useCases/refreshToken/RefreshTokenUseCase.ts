import { AppError } from '@config/AppError';
import auth from '@config/Auth';
import { IRefreshTokenDTO } from '@modules/core/auth/dtos/IRefreshTokenDTO';
import { IRefreshTokenResponseDTO } from '@modules/core/auth/dtos/IRefreshTokenResponseDTO';
import { IAuthRepository } from '@modules/core/auth/repositories/Auth/IAuthRepository';
import { IDataProvider } from '@providers/DataProvider/IDataProvider';
import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('AuthRepository')
    private authRepository: IAuthRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDataProvider,
  ) {}

  async execute(refresh_token: string): Promise<IRefreshTokenResponseDTO> {
    const { email, sub, enterprise_id } = verify(
      refresh_token,
      auth.secret_refresh_token,
    ) as IRefreshTokenDTO;

    const user_id = sub;

    const userToken = await this.authRepository.findByUserIdAndRefreshToken(
      user_id,
      refresh_token,
    );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    const { _id } = userToken;
    await this.authRepository.delete(_id);

    const new_refresh_token = sign(
      { email, enterprise_id },
      auth.secret_refresh_token,
      {
        subject: sub,
        expiresIn: auth.expires_in_refresh_token,
      },
    );

    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
    );

    await this.authRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token: new_refresh_token,
      user_id,
    });

    const newToken = sign({ enterprise_id }, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token: new_refresh_token,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };
