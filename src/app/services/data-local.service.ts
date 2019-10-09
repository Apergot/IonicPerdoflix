import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MovieDetail } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService implements OnInit{

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  movies: MovieDetail[] = [];

  constructor(private storage: Storage,
              private toastCtrl: ToastController) { }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 1200
    });
    toast.present();
  }

  saveMovie(movie: MovieDetail){
    let exists = false;
    let message = '';
    for(const film of this.movies){
      if(film.id === movie.id){
        exists = true;
        break;
      }
    }

    if(exists){
      this.movies = this.movies.filter(film=> film.id !== movie.id);
      message="Removed from favorites!"
    }else{
      this.movies.push(movie);
      message="Added to favorites!";
    }
    this.presentToast(message);
    this.storage.set('movies', this.movies);
  }

  async loadFavorites(){
    const movies = await this.storage.get('movies');
    this.movies = movies || [];
    return this.movies;
  }

  async existsMovie(id){
    id = Number(id);
    await this.loadFavorites();
    const exists = this.movies.find(film => film.id === id);
    return (exists) ? true : false;
  }
}
