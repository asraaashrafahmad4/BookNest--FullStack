import { Component, OnInit, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-books',
  imports: [RouterLink, FormsModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
  searchtext: string = "";

  filterbooks = signal<any[]>([])

  books = signal<any[]>([])


  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/books')
      .subscribe((data: any) => {
        console.log(data);
        this.books.set (data);
        this.filterbooks.set (this.books())
      });
  }

  constructor(private http: HttpClient) {

  }
  searchbooks() {
    if (this.searchtext.trim() === '') {
      this.filterbooks.set (this.books())
    }
    else {
      this.filterbooks.set ( this.books().filter((books: any) =>
        books.title?.toLowerCase().includes(
          this.searchtext.toLowerCase())
       ) );
    }
  }
}
