import { OnInit, Input, Component } from '@angular/core';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() freshMovies: Movie[] = [];

  slidesOpts = {
    slidesPerView: 3.15,
    freeMode: true
  };

  constructor() { }

  ngOnInit() {
 
  }

}
