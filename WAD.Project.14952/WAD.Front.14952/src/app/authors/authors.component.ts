import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit, OnDestroy {
  authors: any = [];
  subscriptions: Subscription[] = [];
  constructor(private authorService: AuthorService) {}
  isAuthorsEmpty = false;

  ngOnInit(): void {
    this.subscriptions.push(
      this.authorService.getAuthors().subscribe((data: any) => {
        this.authors = data.data;
        this.isAuthorsEmpty = data.total === 0;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
