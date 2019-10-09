import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';
import { Movie } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pairs',
  templateUrl: './slideshow-pairs.component.html',
  styleUrls: ['./slideshow-pairs.component.scss'],
})
export class SlideshowPairsComponent implements OnInit {

  @Input() freshMovies: Movie[] = [];
  @Output() loadMore = new EventEmitter();


  slidesOpts = {
    slidesPerView: 3.15,
    freeMode: true,
    spaceBetween: 0
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}


  onClick(){
    this.loadMore.emit();
  }

  async showDetail(id:string){
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
