import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { getEnvConfig } from './env.config';

export const dbConfig = (): TypeOrmModuleOptions => {
  // const { db } = getEnvConfig();

  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'postgres123',
    username: 'postgres',
    entities: [User],
    database: 'crafy',
    synchronize: true,
    logging: true,
  };
};
