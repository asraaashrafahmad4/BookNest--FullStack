import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartitem: any[] = []
  addtocart(book: any) {

    const existing = this.cartitem.find(
      item => item.book._id === book._id
    )
    if (existing) {
      existing.quantity++
    } else {
      const item = {
        book: book,
        price: book.price,
        quantity: 1
      }
      this.cartitem.push(item)
    }
  }


  removefromcart(item: any) {
    this.cartitem = this.cartitem.filter(cartitem =>
      cartitem.book._id !== item.book._id
    )
  }
  increasequantity(item: any) {
    item.quantity++
  }



  decreasequantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--
    }
  }
  gettotal() {
    return this.cartitem.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

}
