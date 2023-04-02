import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}

  getAuthors() {
    return this.http.get('http://localhost:51662/authors');
  }

  getAuthor(id: string) {
    return this.http.get(`http://localhost:51662/authors/${id}`);
  }

  addAuthor(author: any) {
    return this.http.post('http://localhost:51662/authors', author);
  }

  updateAuthor(id: string, author: any) {
    return this.http.put(`http://localhost:51662/authors/${id}`, author);
  }

  deleteAuthor(id: string) {
    return this.http
      .delete(`http://localhost:51662/authors/${id}`)
      .pipe(catchError((error) => throwError(error)));
  }

  getBooksByAuthor(id: string) {
    return this.http.get(`http://localhost:51662/authors/${id}/books`);
  }
}
