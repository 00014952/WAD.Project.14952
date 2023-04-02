import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './home/components/slider/slider.component';
import { CardsListComponent } from './home/components/cards-list/cards-list.component';
import { CardItemComponent } from './home/components/card-item/card-item.component';
import { NewBooksComponent } from './home/components/new-books/new-books.component';
import { BookComponent } from './books/components/book/book.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorComponent } from './author/author.component';
import { CreateBookComponent } from './forms/create-book/create-book.component';
import { CreateAuthorComponent } from './forms/create-author/create-author.component';
import { EditAuthorComponent } from './forms/edit-author/edit-author.component';
import { EditBookComponent } from './forms/edit-book/edit-book.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    CardsListComponent,
    CardItemComponent,
    NewBooksComponent,
    BookComponent,
    BooksComponent,
    AuthorsComponent,
    AuthorComponent,
    CreateBookComponent,
    CreateAuthorComponent,
    EditAuthorComponent,
    EditBookComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
