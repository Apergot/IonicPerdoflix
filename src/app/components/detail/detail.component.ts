import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies-service';
import { MovieDetail, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

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
  slideOotCast = {
    slidesPerView: 3.2,
    freeMode: true,
    spaceBetween: -10
  }

  constructor( private moviesService: MoviesService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
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

  favorite(){
    console.log('added to favorite');
  }

}
