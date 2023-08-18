import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface data<T> {
  data: T;
}

/**
 * 响应拦截器 - 全局
 * 利用拦截器将所有返回的数据进行统一的数据封装
 */
@Injectable()
export class Response<T = any> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<data<T> & any> {
    console.log('进入全局响应拦截器');
    return next.handle().pipe(
      map((res) => {
        console.log('全局响应拦截器返回内容后');
        let data = '';
        let message = '操作成功';

        if (res) {
          if (typeof res === 'object') {
            if (res.message) {
              message = res.message;
              // delete res.message
            }
            data = res;
          } else {
            message = res;
          }
        }

        return {
          data,
          status: 200,
          success: true,
          message,
        };
      }),
    );
  }
}
