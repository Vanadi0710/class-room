// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { registerAs } from '@nestjs/config';

const localServers = [
  {
    url: `http://localhost:${process.env.APP_PORT || '3001'}`,
    description: 'Class room Server',
  },
];
const devServers = [
  {
    url: `http://localhost:${process.env.APP_PORT || '3001'}`,
    description: 'Class room Server',
  },
];

const prodServers = [];

const getServers = () => {
  if (process.env.APP_ENV === 'production') return prodServers;
  if (['development', 'staging'].includes(process.env.APP_ENV)) return devServers;
  return localServers;
};

export default registerAs('app', () => ({
  port: process.env.APP_PORT,
  env: process.env.NODE_ENV,
  prefix: process.env.APP_PREFIX || 'class-room',
  name: process.env.APP_NAME || 'class-room',
  swagger: {
    servers: getServers(),
  },
  auth: {
    jwtSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtTokenExpiry: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
  },
}));
