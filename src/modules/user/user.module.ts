import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Logger } from 'src/common/middleware';

@Module({
  // 此模块使用 forFeature() 方法定义在当前范围中注册哪些存储库
  // 这样，我们就可以使用 @InjectRepository()装饰器将 UsersRepository 注入到 UsersService 中
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  // 中间件(这里触发两次了，为什么)
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes(UserController);
  }
}
