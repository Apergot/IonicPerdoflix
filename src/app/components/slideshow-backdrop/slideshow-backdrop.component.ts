import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';
import { Movie } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

@Input() freshMovies: Movie[] = [];

slidesOpts = {
  slidesPerView: 1.2,
  freeMode: true
};

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {}

  async showDetail(id: string){
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

}
