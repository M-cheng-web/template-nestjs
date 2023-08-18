import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AssetModule } from './modules/asset/asset.module';
import { RoleModule } from './modules/role/role.module';
import { RolesubModule } from './modules/rolesub/rolesub.module';
import { CompanyModule } from './modules/company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'chen3351',
      database: 'nest-demo', // 数据库名
      entities: [Guard],
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 注册全部实体文件
      synchronize: true, // 根据实体自动创建数据库表，不能被用于生产环境，否则您可能会丢失生产环境数据
      autoLoadEntities: true, // 如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
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
