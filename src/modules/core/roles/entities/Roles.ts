import { BaseSchema } from '@config/BaseSchema';
import { Schema } from 'mongoose';
import { IRoleDTO } from '../dtos/IRoleDTO';

const Role = new Schema<IRoleDTO>({
  type: { type: String, required: true },
  description: { type: String, required: true },
});

//Add BaseSchema
Role.add(BaseSchema);

//Add Schema Version
const SchemaVersion = 0;
Role.add({
  schema_version: { type: Number, default: SchemaVersion, required: true },
});

export { Role };
