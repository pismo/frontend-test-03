import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-popular-detail',
  templateUrl: './popular-detail.component.html'
})
export class PopularDetailComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  detail: {}

  ngOnInit() {
    this.getDetail()
  }

  getDetail(){
    this.movieService.getMovieDetail(this.route.snapshot.params['id']).subscribe(data => {
      this.detail = data;
    });
  }

}
