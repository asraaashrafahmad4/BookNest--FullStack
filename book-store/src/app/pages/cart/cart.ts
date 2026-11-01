import { Component } from '@angular/core';
import { CartService } from '../../services/cart';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartitem: any[] = []

  constructor(private cart: CartService) {
    this.cartitem = this.cart.cartitem
  }
  removefromcart(book: any) {
    this.cart.removefromcart(book);
    this.cartitem = this.cart.cartitem

  }
  increasequantity(item: any) {
    this.cart.increasequantity(item)
    this.cartitem = this.cart.cartitem
  }
  decreasequantity(item: any) {
    this.cart.decreasequantity(item)
    this.cartitem = this.cart.cartitem
  }
  gettotal() {
    return this.cart.gettotal()
  }

}
