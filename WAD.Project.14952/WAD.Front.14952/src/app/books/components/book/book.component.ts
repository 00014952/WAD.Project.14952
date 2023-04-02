import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-item',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input() book: any;
  constructor() {}

  ngOnInit(): void {}

  randomBook() {
    // I dont know how to store images, thats why I use this function
    const randomNum = Math.floor(Math.random() * (6 - 1 + 1) + 1);

    return './assets/img/book-' + randomNum + '.jpg';
  }
}
