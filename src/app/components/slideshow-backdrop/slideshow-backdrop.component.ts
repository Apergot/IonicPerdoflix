import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

@Input() freshMovies: Movie[] = [];

slidesOpts = {
  slidesPerView: 1.2,
  freeMode: true
};

  constructor() { }

  ngOnInit() {}

}
