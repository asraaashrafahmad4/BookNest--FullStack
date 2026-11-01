import { Component, OnInit } from '@angular/core';
import { Book } from '../../services/book';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Orders } from '../../services/orders';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {


  showAddForm = false
  activeTab = "books";
  selectorBook: Book | null = null
  showEditForm = false

  books: Book[] = []
  user: any[] = []
  orderlist: any[] = []
  selectorOrder: any = null


  showOrderModel = false

  newbook = {
    title: "",
    author: "",
    image: "",
    price: 0,
    description: "",
    tags: [] as string[],

  }
  tagsInput = ""
  editTagsInput = ""

  settab(tab: string) {
    this.activeTab = tab
    if (tab === "users") {
      this.getUser()
    }
    else if (tab === "orders") {
      this.getOrders()

    }
  }

  getUser() {
    this.auth.getAllUsers()
      .subscribe((data: any) => {
        console.log(data)
        this.user = data.users
      })
  }
  deleteUser(user: any) {
    this.auth.deleteUser(user._id)
      .subscribe((Response) => {
        this.user = this.user.filter(item => item._id !== user._id)
      })
  }
  constructor(
    private book: Book,
    private auth: Auth,
    private orders: Orders

  ) { }


  ngOnInit(): void {
    this.book.getAllBook()
      .subscribe((data: Book[]) => {
        this.books = data
      })
    this.getOrders()
  }

  addBook() {
    this.newbook.tags = this.tagsInput
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== "")


    this.book.addBook(this.newbook)
      .subscribe((Response) => {
        console.log(Response)

        this.book.getAllBook()
          .subscribe((data: Book[]) => {
            this.books = data

          })
      })
  }




  deleteBook(book: Book) {
    this.book.deleteBook(book._id)
      .subscribe((Response) => {
        console.log(Response)

        this.book.getAllBook()
          .subscribe((data: Book[]) => {
            this.books = data

          })

      })
  }

  getOrders() {
    this.orders.getAllOrders()
      .subscribe((data: any) => {
        console.log(data)
        this.orderlist = data
      })

  }

  viewOrder(order: any) {
    console.log('selsectors order', order)
    this.selectorOrder = order,
      this.showOrderModel = true
  }

  closeOrderModel() {
    this.showOrderModel = false

  }

  editBook(book: Book) {
    this.selectorBook = book,
      this.editTagsInput = book.tags.join(',')
    this.showEditForm = true
  }

  saveEdit() {
    if (!this.selectorBook) {
      return;
    }
    this.selectorBook.tags = this.editTagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== "")

    this.book.updateBookById(
      this.selectorBook._id, this.selectorBook
    )
      .subscribe(Response);
    this.book.getAllBook()
      .subscribe((data: Book[]) => {
        this.books = data
      })
    this.showEditForm = false
    this.selectorBook = null
  }

  updateOrderStatus(order: any, event: Event) {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value;
    this.orders.updateOrder(
      order._id,
      { status: newStatus }
    )
      .subscribe((Response) => {
        order.status = newStatus
        if (this.selectorOrder?._id === order._id) {
          this.selectorOrder.status = newStatus
        }
      })
  }

}
