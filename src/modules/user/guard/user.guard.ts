import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ReqQuery } from '../decorator/user.decorator';

/**
 * 进行权限判断
 * 如果没有权限则不能获取到想要的数据
 */
@Injectable()
export class UserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roleList = this.reflector.get<string[]>('role', context.getHandler());
    if (roleList.includes(ReqQuery(context).role as string)) {
      console.log('UserGuard -- true');
      return true;
    } else {
      console.log('UserGuard -- false');
      return false;
    }
  }
}
