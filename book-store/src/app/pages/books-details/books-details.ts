import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart';
import { Book } from '../../services/book';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-books-details',
  imports: [RouterLink],
  templateUrl: './books-details.html',
  styleUrl: './books-details.css',
})
export class BooksDetails {

  bookid: string = '';

  book = signal<Book | null>(null);

  constructor(
    private router: ActivatedRoute,
    private books: Book,
    private cart: CartService) {

    this.bookid = this.router.snapshot.paramMap.get('id') || '';

    this.books
      .getBookById(this.bookid)
      .subscribe((data: any) => {

        this.book.set(data);

        console.log(this.bookid);

      });
  }

  cleanDescription(description: any): string {
    if (!description) {
      return "";
    }
    let text = typeof description === 'string' ? description : description.value
    if (text.includes('https://')) {
      text = text.split('https://')[0]
    }
    return text.trim()
  }
  addtocart() {
    const book = this.book()
    if (book) {
      this.cart.addtocart(book)
    }
  }

}
