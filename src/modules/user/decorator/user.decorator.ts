import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import type { Request } from 'express';

/**
 * 自定义装饰器
 * 此装饰器负责给予接口的权限
 */
export const Role = (...args: string[]) => SetMetadata('role', args);

/**
 * 自定义装饰器
 * 此装饰器负责返回一个url
 * createParamDecorator 的作用是创建专门的参数装饰器
 */
export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return req.url;
  },
);

/**
 * 纯工具函数
 * 此装饰器负责返回请求的 query参数
 */
export function ReqQuery(ctx: ExecutionContext): any {
  const req = ctx.switchToHttp().getRequest<Request>();
  return req.query;
}
