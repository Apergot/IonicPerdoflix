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

}
