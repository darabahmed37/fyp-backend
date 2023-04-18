import {TypeOrmModuleOptions} from '@nestjs/typeorm';

// export function databaseConfig(): TypeOrmModuleOptions {
//   return {
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT),
//     password: process.env.DB_PASSWORD,
//     username: process.env.DB_USERNAME,
//     database: process.env.DB_NAME,
//     autoLoadEntities: true,
//     synchronize: true,
//   };
// }


export function databaseConfig(): TypeOrmModuleOptions {
    return {
        type: 'sqlite',
        database: "dev.sqlite",
        autoLoadEntities: true,
        synchronize: true,

    }
}