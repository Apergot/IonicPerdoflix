import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MovieDetail, MovieDBResponse, Movie, MovieCast, SearchResults, Genre } from '../interfaces/interfaces';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularsPage = 0;
  freshMovies: Movie[] = [];
  genres: Genre[] = [];

  constructor(private http: HttpClient) { }

  private executeQuery<T>(query: string){
    query = URL+query;
    query += `&api_key=${apiKey}`;
    return this.http.get<T>(query);
  }

  getTheatreMovies(){

    const today = new Date();
    const lastMonthDay = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
    const month = today.getMonth() + 1;
    let monthString;
    
    if(month<10){
      monthString = '0'+ month;
    }else{
      monthString = month;
    }

    const start = `${today.getFullYear()}-${monthString}-01`;
    const end   = `${today.getFullYear()}-${monthString}-${lastMonthDay}`;
    
    return this.executeQuery<MovieDBResponse>(`/discover/movie?primary_release_date.gte=${start}&primary_release_date.lte=${end}`);
  }

  getPopularMovies(){
    this.popularsPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularsPage}`;
    return this.executeQuery<MovieDBResponse>(query);
  }

  getMovieDetail(id: string){
    //we use ?a=1 for angular not to complete url with &
    return this.executeQuery<MovieDetail>(`/movie/${id}?a=1`);
  }

  getMovieCast(id: string){
    //we use ?a=1 for angular not to complete url with &
    return this.executeQuery<MovieCast>(`/movie/${id}/credits?a=1`);
  }
  
  searchMovies(textSearch: string){
    return this.executeQuery<SearchResults>(`/search/movie?query=${textSearch}`);
  }

  loadGenres(): Promise<Genre[]>{

    return new Promise(resolve=>{
      this.executeQuery(`/genre/movie/list?a=1`)
        .subscribe(response => {
          this.genres = response['genres'];
          resolve(this.genres);
        }
      );
    });
  }

}
