import { config } from 'dotenv';

config();

export const envs = {
  JWT_SECRET: process.env.JWT_SECRET_KEY,
};
