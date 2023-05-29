// Create user to login in system

import 'reflect-metadata';
import 'module-alias/register';
import 'express-async-errors';

import './connection';

import { User } from '@modules/users/entities/User';
import { hash } from 'bcrypt';
import mongoose from 'mongoose';
import { DateUpdate, IsNotDeleted } from '@config/HooksDatabase';



const addUser = async () => {
  const UserModel = mongoose.model('User', User);

  if (!process.env.USER_SYSTEM_PASSWORD) {
    throw new Error('USER_SYSTEM_PASSWORD: Empty');
  }

  const userAlreadyexists = await UserModel.findOne({
    cpf: process.env.USER_SYSTEM_CPF,
  }).findOne(IsNotDeleted());

  if (!userAlreadyexists) {
    const passwordHash = await hash(process.env.USER_SYSTEM_PASSWORD, 8);

    await UserModel.create({
      name: process.env.USER_SYSTEM_NAME,
      email: process.env.USER_SYSTEM_EMAIL,
      cpf: process.env.USER_SYSTEM_CPF,
      password: passwordHash,
      tenant_id: process.env.TANANT_ID,
    });

    console.log('User Created: ', process.env.USER_SYSTEM_CPF);
  }
};

const LoadSeeds = async () => {
  setTimeout(async () => {
    console.log('-----------------------------------------------');
    await addUser();
  }, 1000);

  setTimeout(async () => {
    console.log('--------------------FINISH---------------------------');
  }, 30000);

  return;
};

LoadSeeds();

export { LoadSeeds };
