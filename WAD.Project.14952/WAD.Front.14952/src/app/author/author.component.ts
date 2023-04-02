import { Component, ErrorHandler, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit, OnDestroy {
  author: any = {};
  authorBooks: any = [];
  isNoBooks = false;
  error!: string;
  subscriptions: Subscription[] = [];
  constructor(
    private authorService: AuthorService,
    private router: Router,
    private r: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.r.snapshot.paramMap.get('id') as string;
    this.subscriptions.push(
      this.authorService.getAuthor(id).subscribe((author: any) => {
        this.author = author.data;
      })
    );

    this.subscriptions.push(
      this.authorService.getBooksByAuthor(id).subscribe((books: any) => {
        this.authorBooks = books.data;
        this.isNoBooks = books.total === 0 ? true : false;
      })
    );
  }

  deleteAuthor(id: string): void {
    this.subscriptions.push(
      this.authorService.deleteAuthor(id).subscribe(
        (response: any) => {
          this.router.navigate(['/authors']);
        },
        (error: any) => {
          console.log(error);

          this.error = error.error.message;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
