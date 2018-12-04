import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  text: string
  movies = []
  page: number
  totalPages: number
  totalResults: number

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.text = atob(param.text)
      this.searchMovies()
    });
  }

  searchMovies(){
    this.movieService.searchMovies(this.text).subscribe(data => {
      this.movies = data.results
      this.page = data.page
      this.totalPages = data.total_pages
      this.totalResults = data.total_results
    });
  }

  loadMore(){
    this.movieService.searchMovies(this.text, this.page + 1).subscribe(data => {
      this.movies = this.movies.concat(data.results)
      this.page = data.page
      this.totalPages = data.total_pages
      this.totalResults = data.total_results
    });
  }

}
