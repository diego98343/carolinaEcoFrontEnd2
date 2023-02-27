import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/models/userClass/user';
import { LogINService } from 'src/app/services/logInService/log-in.service';

import myAppConfig from 'src/app/config/my-app-config';




@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.css']
})
export class UserLogInComponent implements OnInit {



  user:User=new User();

  oktaSignin:any;


  constructor(private userService:LogINService,
              // @Inject(OKTA_AUTH)private oktaAuth:OktaAuth,
              ) {

      //  this.oktaSignin = new OktaSignIn({
      //   logo: '',
      //   baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      //   clientId: myAppConfig.oidc.clientId,
      //   redirectUrl: myAppConfig.oidc.redirectUri,
      //   authParams:{

      //     pkce: true,
      //     issuer: myAppConfig.oidc.issuer,
      //     scopes: myAppConfig.oidc.scopes

      //   }
      //  });
      }

  ngOnInit(): void {

    // this.oktaSignin.remove();
    // this.oktaSignin.renderEl({
    //   el:'#okta-signin-widget'},//this name should be the same as the html id
    //   (response:any)=>{
    //     if(response.status==='SUCCESS'){
    //       this.oktaAuth.signInWithRedirect();
    //     }
    //   },
    //   (error:any)=>{
    //     throw error;
    //   }
    //   );
  
  }

  // userLogIn(){
  //   this.userService.logInUser(this.user).subscribe(data=>{
  //     alert("log in successfully")
  //   },error=>alert("sorry enter the right password"));
    
  // }



}
