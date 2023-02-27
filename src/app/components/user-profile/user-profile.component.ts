import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileJson: string= null;

  constructor( public auth: AuthService) { }

  ngOnInit(): void {

    this.auth.user$.subscribe(
      data=>{
      this.profileJson = JSON.stringify(data,null,2)
      console.log(this.profileJson)
    })

    

  }

}
