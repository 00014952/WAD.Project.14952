import { Component, OnInit, ViewChild } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  slides = [
    {
      id: 0,
      title: 'World of Books',
      image:
        'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_960_720.jpg',
      description: 'The best books of all time',
    },
    {
      id: 1,
      title: "Audio books so you don't have to read ",
      image:
        'https://cdn.pixabay.com/photo/2018/01/25/20/34/audiobook-3106985_960_720.jpg',
      description: 'The best books of all time',
    },
    {
      id: 2,
      title: "The best classic books you've never heard of",
      image:
        'https://cdn.pixabay.com/photo/2016/03/26/22/21/books-1281581_960_720.jpg',
      description: 'The best books of all time',
    },
  ];
  slide = this.slides[0];
  currentIndex = 0;

  prevSlide() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.slides.length - 1;
    } else {
      this.currentIndex--;
    }
    this.slide = this.slides[this.currentIndex];
  }

  nextSlide() {
    if (this.currentIndex === this.slides.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.slide = this.slides[this.currentIndex];
  }
}
