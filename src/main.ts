import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';

bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initSwagger(app); // swagger

  app.setGlobalPrefix('api'); // 设置全局路由前缀

  app.enableVersioning({ type: VersioningType.URI }); // 版本

  app.useGlobalInterceptors(new Response()); // 全局响应数据过滤

  app.useGlobalFilters(new HttpFilter()); // 全局异常过滤

  // 注册全局DTO验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      // 如果设置为 true,尝试验证未知对象会立即失败
      // 这边设置为false是针对post请求全局验证好像拿不到目标属性（post请求数据放在body中，get请求放在query中），然后会直接导致失败，所以得设置为false
      // 但这样设置就对post请求的参数无法做到校验了
      // 我这边的解决方式是：post请求这种dto层精细化
      forbidUnknownValues: false,

      // 转换
      // 比如内部age字段为number类型，这里会将string转为number类型
      // 不适应自定义的
      // transform: true,

      // skipMissingProperties: true, // 如果设置为 true ，验证器将跳过对所有验证对象中缺失的属性的验证

      // 查看详细异常
      // exceptionFactory: (e) => {
      //   console.error('main.ts', e);
      //   throw new BadRequestException('main.ts: You shall not pass!');
      // },
    }),
  );

  await app.listen(9000);
}

/**
 * 加载 swagger 文档
 */
function initSwagger(app) {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('template-nestjs接口文档')
    .setDescription('我是简简单单的描述，不是复杂的')
    .setVersion('0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 设置文档的地址
  SwaggerModule.setup('/api-docs', app, document, {
    // useGlobalPrefix: true,
    // swaggerOptions: {
    //   docExpansion: '/api', // 设置公共接口前缀
    // },
  });
}
