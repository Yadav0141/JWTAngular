import { Injectable } from '@angular/core';  
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';  
  
import { tokenNotExpired,JwtHelper } from 'angular2-jwt';  
  
import { AuthenticationService } from './AuthenticationService.service';  
  
/** 
 * Decides if a route can be activated. 
 */  
@Injectable() export class AuthGuard implements CanActivate {  
  
    constructor(public authenticationService: AuthenticationService, private router: Router) { }  
  
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {  
  
        if (tokenNotExpired()) {  
            // Signed in.  
debugger;
            // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = new JwtHelper().decodeToken(token);
    if ( tokenPayload.role.filter((x)=>x.toLowerCase()==expectedRole).length<1) {
      this.router.navigate(['login']);
      return false;
    }
    
    return true;  
 }  
        // Stores the attempted URL for redirecting.  
        let url: string = state.url;  
        this.authenticationService.redirectUrl = url;  
        // Not signed in so redirects to signin page.  
        this.router.navigate(['/login']);  
        return false;  
    }  
  
}  