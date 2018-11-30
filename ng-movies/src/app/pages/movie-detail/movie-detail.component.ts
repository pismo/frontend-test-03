import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  animations: [
    trigger('detailAppeared', [
      state('', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('600ms 0s ease-in-out')
      ])
    ])
  ]
})
export class MovieDetailComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  detailState: string = 'ready'
  detail: {}

  ngOnInit() {
    this.getMovieDetail(this.route.snapshot.params['id'])
  }

  getMovieDetail(movie_id){
    this.movieService.getMovieDetail(movie_id).subscribe(data => {
      this.detail = data;
    });
  }

}
