import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

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

  @Input() detail: any

  constructor() { }

  ngOnInit() {
  }

  addFavorite(detail){
    console.log('add favorite', detail)
  }

}
