import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  freshMovies: Movie[] = [];

  constructor(private MoviesService: MoviesService) {}

  ngOnInit(){
    this.MoviesService.getTheatreMovies()
    .subscribe(resp => {
      console.log('Response', resp);
      this.freshMovies = resp.results;
    });
  }

}
