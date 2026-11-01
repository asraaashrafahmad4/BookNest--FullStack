import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  description: string;
  tags: string[]
}

@Injectable({
  providedIn: 'root',
})
export class Book {

  private apiURL = `${environment.apiURL}/books`;
  constructor(private http: HttpClient) { }

  getAllBook(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL)
  }


  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiURL}/${id}`)
  }

  addBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${this.apiURL}`, book)
  }


  updateBookById(id: string, book: Partial<Book>): Observable<Book> {
    return this.http.patch<Book>(`${this.apiURL}/${id}`, book)
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`)
  }



}

