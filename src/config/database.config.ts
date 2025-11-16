import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  const databaseUrl = process.env.DATABASE_URL;
  const nodeEnv = process.env.NODE_ENV || 'development';

  // Priority 1: If DATABASE_URL is provided (e.g., from Render), parse and use it
  if (databaseUrl) {
    return {
      type: 'postgres',
      url: databaseUrl.replace(/^"|"$/g, ''), // Remove surrounding quotes if present
      autoLoadEntities: true,
      synchronize: nodeEnv !== 'production', // sync in dev, not in prod
      ssl: { rejectUnauthorized: false }, // Always enable SSL for Render (required)
      logging: nodeEnv === 'development',
    };
  }

  // Priority 2: Use individual DB_* environment variables (PostgreSQL)
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'logistica',
    autoLoadEntities: true,
    synchronize: nodeEnv !== 'production',
    ssl: { rejectUnauthorized: false },
    logging: nodeEnv === 'development',
  };
};
