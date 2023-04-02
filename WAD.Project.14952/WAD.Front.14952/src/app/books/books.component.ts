import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, OnDestroy {
  books: any = [];
  subscriptions: Subscription[] = [];
  isBooksEmpty = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.bookService.getBooks().subscribe((data: any) => {
        this.books = data.data;
        this.isBooksEmpty = data.total === 0;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
