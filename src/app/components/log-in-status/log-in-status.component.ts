import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';



@Component({
  selector: 'app-log-in-status',
  templateUrl: './log-in-status.component.html',
  styleUrls: ['./log-in-status.component.css']
})
export class LogInStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string='';

  constructor( 
              // private oktaAuthService: OktaAuthStateService,
              //  @Inject(OKTA_AUTH) private OktaAuth:OktaAuth ,
              public auth: AuthService

               ) { }

  ngOnInit(): void {
    //Subscribe to the authentication state changes
    // this.oktaAuthService.authState$.subscribe(
    //   (result)=>{
    //     this.isAuthenticated= result.isAuthenticated;
    //     this.getUserDetails();
    //   }
    // )

    
  }

  // getUserDetails() {

  //   if(this.isAuthenticated){
  //     // fetch the logged in user details

  //     this.OktaAuth.getUser().then(
  //       (res)=>{
  //         this.userFullName =res.name as string;
  //       }
  //     )
  //   }
  // }


  //  logOut(){
  //   //terminate hte session with okta and remove the tokens
  //   this.OktaAuth.signOut();
  //  }

}
