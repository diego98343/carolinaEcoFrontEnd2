import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CartServiceService } from 'src/app/services/cartService/cart-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


   totalQuantity: number =0;

   isAuthenticated: boolean = false;
   userFullName: string='';


  constructor(private _cartService:CartServiceService,
               public auth: AuthService
              ) { }

  ngOnInit(): void {

    this.updataCartComponent();
  }


updataCartComponent(){
  this._cartService.totalQuantity.subscribe(data=>{
    this.totalQuantity=data;
  })
}
  

}
