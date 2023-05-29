import { IAuthDTO } from '@modules/auth/dtos/IAuthDTO';
import { ICreateAuthTokenDTO } from '@modules/auth/dtos/ICreateAuthTokenDTO';

interface IAuthRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
    gov_access_token,
    gov_token_type,
    gov_id_token,
  }: ICreateAuthTokenDTO): Promise<IAuthDTO>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<IAuthDTO | null>;
  delete(id: string): Promise<void>;
}

export { IAuthRepository };
