import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { CreateAuthorComponent } from './forms/create-author/create-author.component';
import { CreateBookComponent } from './forms/create-book/create-book.component';
import { EditAuthorComponent } from './forms/edit-author/edit-author.component';
import { EditBookComponent } from './forms/edit-book/edit-book.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'books/:id',
    component: BookComponent,
  },
  {
    path: 'authors',
    component: AuthorsComponent,
  },
  {
    path: 'authors/:id',
    component: AuthorComponent,
  },
  {
    path: 'create-book',
    component: CreateBookComponent,
  },
  {
    path: 'create-author',
    component: CreateAuthorComponent,
  },
  {
    path: 'edit-book/:id',
    component: EditBookComponent,
  },
  {
    path: 'edit-author/:id',
    component: EditAuthorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
