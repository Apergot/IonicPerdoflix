import { OnInit, Input, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';
import { Movie } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() freshMovies: Movie[] = [];

  slidesOpts = {
    slidesPerView: 3.15,
    freeMode: true,
    spaceBetween: 0
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
 
  }

  async showDetail(id: String){
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}
