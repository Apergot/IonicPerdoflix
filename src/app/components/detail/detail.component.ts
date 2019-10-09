import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoviesService } from '../../services/movies-service';
import { MovieDetail, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() id;
  movie: MovieDetail = {};
  cast: Cast[] = [];
  hidden = 100;
  currentlySaved = 'star-outline';
  slideOotCast = {
    slidesPerView: 3.2,
    freeMode: true,
    spaceBetween: -10
  }

  constructor( private moviesService: MoviesService,
              private modalCtrl: ModalController,
              private dataLocalService: DataLocalService) { }

  async ngOnInit() {
    const exists = await this.dataLocalService.existsMovie(this.id);
    if(exists){
      this.currentlySaved = 'star';
    }else{
      this.currentlySaved = 'star-outline';
    }

    this.moviesService.getMovieDetail(this.id)
    .subscribe(resp => {
      this.movie = resp;
    });
    this.moviesService.getMovieCast(this.id)
    .subscribe(resp => {
      this.cast = resp.cast;
    });
  }

  back(){
    this.modalCtrl.dismiss();
  }

  async favorite(){
    if(this.currentlySaved === 'star-outline'){
      this.currentlySaved = 'star';
    }else{
      this.currentlySaved = 'star-outline';
    }
    this.dataLocalService.saveMovie(this.movie);
  }

}
