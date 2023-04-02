import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit, OnDestroy {
  book: any = {};
  subscriptions: Subscription[] = [];
  constructor(
    private bookService: BookService,
    private router: ActivatedRoute,
    private routerNavigate: Router
  ) {}

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id') as string;

    this.subscriptions.push(
      this.bookService.getBook(id).subscribe((book: any) => {
        this.book = book.data;
      })
    );
  }

  deleteBook(id: string): void {
    this.subscriptions.push(
      this.bookService.deleteBook(id).subscribe((response: any) => {
        this.routerNavigate.navigate(['/books']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
