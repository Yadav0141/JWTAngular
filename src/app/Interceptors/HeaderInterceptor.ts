import { Injectable } from '@angular/core'  
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';  
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/do';  
import {Config} from '../config';  
@Injectable()  
export class HeaderInterceptor implements HttpInterceptor {  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
         


        if(req.url.toLowerCase().indexOf("www.googleapis.com")!=-1)
        {
            return next.handle(req);  
        }
        const dummyrequest = req.clone({  
            setHeaders: {  
                'Authorization': "Bearer "+localStorage.getItem('token'),
             //   'Access-Control-Allow-Origin': Config.DOMAIN_URL,
             //   'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
             //   'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
                 
            }  
        })  


     
        console.log("Cloned Request");   
        console.log(dummyrequest);   
        return next.handle(dummyrequest);  
    }  
}  