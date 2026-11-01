import { Component } from '@angular/core';
import { CartService } from '../../services/cart';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  cartitem: any[] = []

  email: string = "";
  name: string = "";
  phone: string = "";
  address: string = ""

  placeorder(form: NgForm) {
    if (form.invalid) {
      alert('please fill in all required fields')
      return
    }

    const order = {
      customer: {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address

      },
      items: this.cartitem,
      total: this.gettotal()
    }
    this.http.post('http://localhost:3000/orders', order)
      .subscribe({
        next: (response) => {

          console.log('ORDER RESPONSE:', response);

          alert('Order created successfully');

          this.router.navigate(['/order']);

        },

        error: (error) => {

          console.log('ORDER ERROR:', error);

          alert('Something went wrong');

        }
      })

  }
  constructor(
    private cart: CartService,
    private http: HttpClient,
    private router: Router

  ) {
    this.cartitem = this.cart.cartitem;

  }
  gettotal() {
    return this.cart.gettotal()
  }

}
