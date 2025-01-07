import { config } from 'dotenv';

config();

export const envs = {
  API_PORT: process.env.API_PORT,
  JWT_SECRET: process.env.JWT_SECRET_KEY,
};
