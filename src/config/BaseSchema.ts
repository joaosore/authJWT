import { Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const date = Date.now();

interface IBaseSchema {
  _id: string;
  schema_version: number;
  tenant_id: string;
  delete: boolean;
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
}

const BaseSchema = new Schema<IBaseSchema>({
  _id: {
    type: String,
    default: uuidV4,
  },
  schema_version: { type: Number, default: 0, required: true },
  tenant_id: { type: String, default: process.env.TANANT_ID, required: true },
  delete: { type: Boolean, default: false, required: true },
  deleted_at: { type: Date, default: null },
  created_at: { type: Date, default: date, required: true },
  updated_at: { type: Date, default: date, required: true },
});

export { BaseSchema, IBaseSchema };
