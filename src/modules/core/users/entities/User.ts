import { BaseSchema } from '@config/BaseSchema';
import { Schema } from 'mongoose';
import { IUserDTO } from '../dtos/IUserDTO';

const User = new Schema<IUserDTO>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true },
  password: { type: String, required: true },
  o_auth: { type: String },
  role_id: { type: String },
});

//Add BaseSchema
User.add(BaseSchema);

//Add Schema Version
const SchemaVersion = 0;
User.add({
  schema_version: { type: Number, default: SchemaVersion, required: true },
});

export { User };
