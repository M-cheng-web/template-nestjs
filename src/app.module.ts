import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AssetModule } from './modules/asset/asset.module';
import { RoleModule } from './modules/role/role.module';
import { RolesubModule } from './modules/rolesub/rolesub.module';
import { CompanyModule } from './modules/company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from './config/env';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    ConfigModule.forRoot({ isGlobal: true }), // 为什么这里还要一个，是因为默认 envFilePath:'.env' 吗
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT', 3306), // 端口号
        username: configService.get('DB_USER', 'root'), // 用户名
        password: configService.get('DB_PASSWORD', '123456'), // 密码
        database: configService.get('DB_DATABASE', 'templatenest'), //数据库名
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // 注册全部实体文件
        // timezone: '+08:00', // 服务器上配置的时区
        synchronize: true, // 根据实体自动创建数据库表， 生产环境建议关闭
        autoLoadEntities: true, //自动加载实体
      }),
    }),
    UserModule,
    AssetModule,
    RoleModule,
    RolesubModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
