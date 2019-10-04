import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  freshMovies: Movie[] = [];

  constructor(private http: HttpClient) { }

  private executeQuery<T>(query: string){
    query = URL+query;
    query += `&api_key=${apiKey}`;
    return this.http.get(query);
  }

  getTheatreMovies(){
    return this.executeQuery<MovieDBResponse>('/discover/movie?primary_release_date.gte=2019-09-01&primary_release_date.lte=2019-09-28');
  }

}
