import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  animations: [
    trigger('detailAppeared', [
      state('', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class MovieDetailComponent implements OnInit {

  detailState: string = 'ready'
  favorite: boolean
  favorites = JSON.parse(localStorage.getItem('favorites')) || []

  @Input() detail: any

  constructor(private ns: NotificationService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes.detail.currentValue) {
      this.favorite = this.isFavorite()
    }
  }

  isFavorite(): boolean {
    return this.favorites.find(f => f.id === this.detail.id) ? true : false
  }

  addFavorite(){
    if (!this.isFavorite()) {
      this.favorites.push(this.detail);
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
      this.ns.notify(`Filme adicionado aos favoritos`)
      this.favorite = this.isFavorite()
    }
  }

  removeFavorite(){
    let index = this.favorites.findIndex(f => f.id === this.detail.id)
    this.favorites.splice(index, 1)
    localStorage.setItem('favorites', JSON.stringify(this.favorites))
    this.ns.notify(`Filme removido dos favoritos`)
    this.favorite = this.isFavorite()
  }

}
