import { IBaseSchema } from '@config/BaseSchema';

interface IUserDTO extends IBaseSchema {
  name: string;
  email: string;
  cpf: string;
  password: string;
  o_auth: string | null;
  role_id: string;
}

export { IUserDTO };
