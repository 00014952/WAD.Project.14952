import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit, OnDestroy {
  authors: any = [];
  subscriptions: Subscription[] = [];
  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private router: Router,
    private r: ActivatedRoute
  ) {}

  book: any = {
    id: '',
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
    const id = this.r.snapshot.params['id'];
    this.subscriptions.push(
      this.bookService.getBook(id).subscribe((book: any) => {
        this.book = book.data;
      })
    );
    this.subscriptions.push(
      this.authorService.getAuthors().subscribe((authors: any) => {
        this.authors = authors.data;
      })
    );
  }

  onSubmit(form: NgForm) {
    this.book.author.id = parseInt(this.book.author.id);
    this.subscriptions.push(
      this.bookService
        .updateBook(this.book.id, this.book)
        .subscribe((book: any) => {
          this.router.navigate(['/books']);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
