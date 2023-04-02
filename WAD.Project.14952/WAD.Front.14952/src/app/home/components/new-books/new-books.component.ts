import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
  styleUrls: ['./new-books.component.css'],
})
export class NewBooksComponent implements OnInit, OnDestroy {
  books = [];
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
