import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Router, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { YouTubeSearchComponent } from './you-tube-search/you-tube-search.component';
import { youTubeSearchInjectables } from "./you-tube-search/you-tube-search.injectables";
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchBoxComponent } from './you-tube-search/search-box.component';
import { SearchResultComponent } from './you-tube-search/search-result.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {AuthGuard} from './AuthGuard';
import {IdentityService} from './IdentityService.service';
import {AuthenticationService} from './AuthenticationService.service';
import { AuthHttp, AUTH_PROVIDERS, provideAuth, AuthConfig } from 
    'angular2-jwt/angular2-jwt';
import {HttpModule} from '@angular/http';
import {HeaderInterceptor} from './Interceptors/HeaderInterceptor'  
const appRoutes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'youtube',component:YouTubeSearchComponent,canActivate:[AuthGuard],data: { expectedRole: 'admin'}},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    YouTubeSearchComponent,
    SearchBoxComponent,
    SearchResultComponent,
    LoginComponent,
    NotFoundComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    youTubeSearchInjectables,
    AuthGuard,  
    AuthenticationService,  AuthHttp,
    IdentityService,  
    AUTH_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

