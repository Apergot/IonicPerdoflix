import { Component } from '@angular/core';
import { MoviesService } from '../services/movies-service';
import { Result, SearchResults} from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../components/detail/detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  showSpinner = false;
  textSearch = '';
  suggested: string[] = ['Spiderman', 'Joker', 'Batman', 'WonderWoman', 'Pearl Harbour'];
  results: Result[] = [];

  constructor(private moviesService : MoviesService,
              private modalCtrl: ModalController) {}

  search(event){
    const value = event.detail.value;
    if(value !== ''){
      this.showSpinner = true;
      this.moviesService.searchMovies(value)
        .subscribe(resp => {
        this.results = resp.results;
        this.showSpinner = false;
      });
    }else{
      this.results = [];
    }
  }

  setField(item){
    this.textSearch = item;
  }

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
