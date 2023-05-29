import { IBaseSchema } from '@config/BaseSchema';

interface IRoleDTO extends IBaseSchema {
  type: string;
  description: string;
}

export { IRoleDTO };
