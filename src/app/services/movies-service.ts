import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  freshMovies: Movie[] = [];

  constructor(private http: HttpClient) { }

  getTheatreMovies(){
    return this.http.get<MovieDBResponse>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-09-01&primary_release_date.lte=2019-09-28&api_key=b6983f6c96c58e499d0eb32611b236ff`);
  }

}
