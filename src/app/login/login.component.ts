import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../AuthenticationService.service';

import {IdentityService} from '../IdentityService.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName:string;
  password:string;

constructor(private authservice:AuthenticationService,private identity:IdentityService) { }

  ngOnInit() {
  }

  login():void{
    this.authservice.signin(this.userName,this.password).subscribe((data)=>console.log(data));
  }

  getClaims(){
    this.identity.GetClaims().subscribe((data)=>console.log(data));
  }






}
