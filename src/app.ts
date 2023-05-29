import 'reflect-metadata';
import 'module-alias/register';
import 'express-async-errors';

import express from 'express';

import { router } from './routes';

export const app = express();

import './database/connection';
import './containers/modules';
import './containers/providers';

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
