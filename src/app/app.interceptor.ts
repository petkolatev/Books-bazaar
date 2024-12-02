import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { inject } from '@angular/core';
import { ErrorMsgService } from './core/error-msg/error-msg.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

const { apiUrl } = environment

export const appInterceptor: HttpInterceptorFn = (req, next) => {


    const API = '/api';
    if (req.url.startsWith(API)) {
        req = req.clone({
            url: req.url.replace(API, apiUrl),
            withCredentials: true
        })
    }
    const errMsgService = inject(ErrorMsgService)
    const router = inject(Router)

    console.log(req);
    return next(req)
        .pipe(catchError((err) => {
            if (err.status === 401) {
                router.navigate(['/login'])
            } else {
                errMsgService.setErrors(err)
                router.navigate(['/error'])
            }
            return [err]
        })
        )
};
