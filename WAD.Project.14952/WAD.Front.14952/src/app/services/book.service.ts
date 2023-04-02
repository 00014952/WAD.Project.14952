import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get('http://localhost:51662/books');
  }

  getBook(id: string) {
    return this.http.get(`http://localhost:51662/books/${id}`);
  }

  addBook(book: any) {
    return this.http.post('http://localhost:51662/books', book);
  }

  updateBook(id: string, book: any) {
    return this.http.put(`http://localhost:51662/books/${id}`, book);
  }

  deleteBook(id: string) {
    return this.http.delete(`http://localhost:51662/books/${id}`);
  }
}
