import { IBaseSchema } from '@config/BaseSchema';

interface IAuthDTO extends IBaseSchema {
  refresh_token: string;
  user_id: string;
  expires_date: Date;
  gov_access_token?: string;
  gov_token_type?: string;
  gov_id_token?: string;
}

export { IAuthDTO };
