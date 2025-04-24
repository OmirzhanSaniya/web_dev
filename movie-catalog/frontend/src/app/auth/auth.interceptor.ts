// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = localStorage.getItem('token');
  
//   if (token) {
//     const authReq = req.clone({
//       setHeaders: {
//         Authorization: `Token ${token}`
//       }
//     });
//     return next(authReq);
//   }
  
//   return next(req);
// };
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  // Добавляем токен к запросу, если он есть
  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      // Обрабатываем только 401 ошибки и не для запросов на обновление токена
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes('/api/token/refresh/') &&
        !req.url.includes('/api/login/') &&
        !req.url.includes('/api/register/')
      ) {
        // Пробуем обновить токен
        return authService.refreshToken().pipe(
          switchMap(() => {
            // После успешного обновления повторяем оригинальный запрос
            const newAccessToken = authService.getAccessToken();
            const clonedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });
            return next(clonedReq);
          }),
          catchError((refreshError) => {
            // Если обновление токена не удалось, делаем logout
            authService.logout().subscribe();
            return throwError(() => refreshError);
          })
        );
      }
      
      // Для всех других ошибок просто пробрасываем ошибку дальше
      return throwError(() => error);
    })
  );
};