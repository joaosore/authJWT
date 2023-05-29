import mongoose from 'mongoose';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

var autoIncrement = require('mongoose-auto-increment');

export const connectDatabase = async (): Promise<void> => {
  try {
    const url =
      process.env.DB_PROTOCOL === 'mongodb+srv'
        ? `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`
        : `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
    mongoose.set('strictQuery', false);
    mongoose.connect(url);

    autoIncrement.initialize(mongoose.connection);
  } catch (e) {
    console.log('MongoDb', e);
  }
};
