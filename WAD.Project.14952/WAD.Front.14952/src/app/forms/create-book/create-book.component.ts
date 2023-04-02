import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})
export class CreateBookComponent implements OnInit, OnDestroy {
  authors: any = [];
  isAuthorsEmpty = false;
  subscriptions: Subscription[] = [];
  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private router: Router
  ) {}

  book: any = {
    title: '',
    description: '',
    genre: '',
    quantity: null,
    price: null,
    author: {
      id: null,
    },
  };

  ngOnInit(): void {
    this.subscriptions.push(
      this.authorService.getAuthors().subscribe((data: any) => {
        this.authors = data.data;
        this.isAuthorsEmpty = data.total === 0;
      })
    );
  }

  onSubmit(form: NgForm) {
    this.book.author.id = parseInt(this.book.author.id);
    this.subscriptions.push(
      this.bookService.addBook(this.book).subscribe((book: any) => {
        this.router.navigate(['/books']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
