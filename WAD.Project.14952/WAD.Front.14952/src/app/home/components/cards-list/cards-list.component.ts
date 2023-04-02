import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css'],
})
export class CardsListComponent {
  cards = [
    {
      title: 'Paper Books',
      src: 'https://cdn.pixabay.com/photo/2016/04/30/13/12/sutterlin-1362879_960_720.jpg',
    },
    {
      title: 'Audio Books',
      src: 'https://cdn.pixabay.com/photo/2021/10/13/20/39/headphones-6707573_960_720.jpg',
    },
    {
      title: 'E-Books',
      src: 'https://cdn.pixabay.com/photo/2016/11/29/06/16/kindle-1867751_960_720.jpg',
    },
  ];
}
