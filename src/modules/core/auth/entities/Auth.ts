import { BaseSchema } from '@config/BaseSchema';
import { Schema } from 'mongoose';
import { IAuthDTO } from '../dtos/IAuthDTO';

const Auth = new Schema<IAuthDTO>({
  refresh_token: { type: String, required: true },
  user_id: { type: String, required: true },
  expires_date: { type: Date, required: true },
  gov_access_token: { type: String, default: null },
  gov_token_type: { type: String, default: null },
  gov_id_token: { type: String, default: null },
});

//Add BaseSchema
Auth.add(BaseSchema);

//Add Schema Version
const SchemaVersion = 0;
Auth.add({
  schema_version: { type: Number, default: SchemaVersion, required: true },
});

export { Auth };
