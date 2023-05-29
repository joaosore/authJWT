import { IsNotDeleted, SoftDelete } from '@config/HooksDatabase';
import { IAuthDTO } from '@modules/core/auth/dtos/IAuthDTO';
import { ICreateAuthTokenDTO } from '@modules/core/auth/dtos/ICreateAuthTokenDTO';
import { Auth } from '@modules/core/auth/entities/Auth';
import mongoose from 'mongoose';
import { IAuthRepository } from './IAuthRepository';

class AuthRepository implements IAuthRepository {
  private repository;

  constructor() {
    this.repository = mongoose.model('Auth', Auth);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
    gov_access_token,
    gov_token_type,
    gov_id_token,
  }: ICreateAuthTokenDTO): Promise<IAuthDTO> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
      gov_access_token,
      gov_token_type,
      gov_id_token,
    });

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<IAuthDTO | null> {
    const usersTokens = await this.repository
      .findOne({
        user_id,
        refresh_token,
      })
      .findOne(IsNotDeleted());
    return usersTokens;
  }

  async delete(id: string): Promise<void> {
    await this.repository.updateOne({ _id: id }, SoftDelete());
  }
}

export { AuthRepository };
