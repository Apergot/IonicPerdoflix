import { Component, OnInit } from '@angular/core';
import { MovieDetail, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies-service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  movies: MovieDetail[] = [];
  genres: Genre[] = [];
  favoriteGenre: any[] =[] ;

  constructor(private dataLocalService: DataLocalService,
              private moviesService: MoviesService) {}

  async ionViewWillEnter(){
    this.movies = await this.dataLocalService.loadFavorites();
    this.genres = await this.moviesService.loadGenres();
    this.moviesPerGenre(this.genres, this.movies);
  }

  moviesPerGenre(genres: Genre[], movies: MovieDetail[]){
    this.favoriteGenre = [];
    var genretemp;
    genres.forEach(genre => {
      genretemp = genre;
      this.favoriteGenre.push({
        genero: genre.name,
        films: movies.filter(film => {
          return film.genres.find(genero2 => genero2.id === genretemp.id);
        })
      });
    });
  }
}
