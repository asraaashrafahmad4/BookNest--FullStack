import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { Orders } from '../../services/orders';


@Component({
  selector: 'app-order',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  order=signal<any[]>([])

  constructor(private orders: Orders) {
    this.orders.getAllOrder().subscribe((data: any) => {
      console.log(data)
      this.order.set  (data)
    })

  }
}
