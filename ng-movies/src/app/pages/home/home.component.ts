import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  genres: []
  popular: []

  ngOnInit() {
    this.getGenres()
    this.getPopular()
  }

  getGenres(){
    this.movieService.getGenres().subscribe(data => {
      this.genres = data.genres;
    });
  }

  getPopular(){
    this.movieService.getPopularMovie().subscribe(data => {
      this.popular = data.results;
    });
  }

}
