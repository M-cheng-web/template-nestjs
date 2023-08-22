# template-nestjs
nestjs 的模板项目

## 问题
+ nest中 生成的 swagger 文档，怎么配置接口前缀呀，比如 /test/get 要展示为 /api/test/get
+ 模拟jwt
+ 设置全局成功状态、异常状态 code
+ typeorm 要多熟悉一下
+ 做好了最基本的业务，再去看看模板，然后总结一套自己的
+ 对某些业务接口做入参校验 - 一般接口都会对前端提供的参数进行校验吗？
+ 密码应该加密

## 备注
读写不频繁，速度要求不高就直接数据库
访问量级上来了，延迟要求低，再加一个 redis
有异步的逻辑，高并发的场景，还可以考虑加个 MQ

nestjs项目目录 https://www.imooc.com/article/315772
nestjs项目目录 https://juejin.cn/post/6844904192687996936#comment

## 目标
完成一个完整的模板,模板功能对标公司内部的人员、资产系统

### 表
1. 用户表 user
2. 公司表 company
3. 资产表 asset
4. 角色表 role
5. 权限表 rolesub

### 功能
1. jwt
2. swagger
3. 中间件、拦截、权限校验这些完整流程
4. 用户登录图形验证码
5. 不同用户不同权限 - 不能越权请求(角色拥有多个权限，用户是可能拥有多个角色)
6. 敏感信息(用户密码)都用双向加密 - bcrypt
7. 所有表的操作以及互相链接的操作(资产、用户、公司需要图片这种，或者视频，以及转让这些)
8. 并发，锁；比如操作同一个资产
9. 多端登录自动退出

完成之后，要放入docker，然后放入服务器，买个域名；最后再写个前端项目配套

## nestjs 执行顺序
在Nest的生命周期中，客户端发起一个请求后，服务器接到请求内容，经过
1. 中间件
2. 守卫
3. 拦截器
4. 管道
5. 真正业务逻辑处理
6. 拦截器
7. 请求结束返回内容

而管道是处于请求过程中第四个内容，主要是用于对请求参数的验证和转换操作。

[参考文章](https://blog.csdn.net/lxy869718069/article/details/103960790)

### 第一道关卡: 中间件 - middleware
作用:
1. 执行任何代码。
2. 对请求和响应对象进行更改。
3. 结束请求-响应周期。
4. 调用堆栈中的下一个中间件函数。
5. 如果当前的中间件函数没有结束请求-响应周期, 它必须调用 next() 将控制传递给下一个中间件函数。否则, 请求将被挂起

场景: 拿到请求路径对某些请求进行特殊拦截、对入参进行更改....

使用:
1. 全局中间件(demo内实现了)
2. 局部使用(demo内实现了)

### 第二道关卡: 守卫 - guard
作用: 控制一些权限内容(同一路由注册多个守卫的执行顺序为，先是全局守卫执行，然后是模块中守卫执行)

场景: 一些接口需要带上token标记，才能够调用，守卫则是对这个标记进行验证操作的，以及一些权限接口

使用:
1. 全局守卫 app.useGlobalGuards(new GuardGuard())
2. 局部使用 @UseGuards(GuardGuard)

### 第三道关卡: 拦截器 - NestInterceptor/ExceptionFilter
作用:
1. 在函数执行之前/之后绑定额外的逻辑
2. 转换从函数返回的结果
3. 转换从函数抛出的异常
4. 扩展基本函数行为
5. 根据所选条件完全重写函数 (例如, 缓存目的)

场景: 对成功响应的接口的返回值进行包装

使用:
1. 全局拦截器 app.useGlobalInterceptors(new Response())
2. 局部使用 @UseInterceptors(Response)

备注:
拦截器的执行顺序分为两个部分：
第一个部分在管道和自定义逻辑(next.handle()方法)之前。
第二个部分在管道和自定义逻辑(next.handle()方法)之后

中间多了个全局管道以及自定义逻辑，即只有路由绑定的函数有正确的返回值之后才会有next.handle()之后的内容,顺序:
1. 进入全局响应拦截器
2. 进入管道
3. 进入next.handle()方法

### 第四道关卡: 管道 - pipe
项目中使用class-validator class-transformer进行配合验证相关的输入操作内容

作用:
1. 主要用于对请求参数的验证
2. 对请求参数的转换操作

使用(demo中这俩个是都用了，配合使用的):
1. 全局管道 app.useGlobalPipes(new ValidationPipe())
2. 局部使用 findAll(@Query(GuradFindAllPipe) query: FindAllGuardDto) / UsePipes(FindAllGuardDto)

备注:
同一路由注册多个管道的时候，优先执行全局管道，然后再执行模块管道：

### 异常过滤器
异常过滤器是所有抛出的异常的统一处理方案

作用:
捕获系统抛出的所有异常，然后自定义修改异常内容，抛出友好的提示

使用:
1. 全局 app.useGlobalFilters(new HttpFilter())
2. 局部 UseFilters(HttpFilter)

备注:
同一路由注册多个管道的时候，只会执行一个异常过滤器，优先执行模块中绑定的异常过滤器，如果模块中无绑定异常过滤则执行全局异常过滤器

### 内置异常类
系统提供了不少内置的系统异常类，需要的时候直接使用throw new XXX(描述,状态)这样的方式即可抛出对应的异常,一旦抛出异常，当前请求将会终止。
注意每个异常抛出的状态码有所不同 (可参数管道中是如何使用的)

BadRequestException — 400
UnauthorizedException — 401
ForbiddenException — 403
NotFoundException — 404
NotAcceptableException — 406
RequestTimeoutException — 408
ConflictException — 409
GoneException — 410
PayloadTooLargeException — 413
UnsupportedMediaTypeException — 415
UnprocessableEntityException — 422
InternalServerErrorException — 500
NotImplementedException — 501
BadGatewayException — 502
ServiceUnavailableException — 503
GatewayTimeoutException — 504