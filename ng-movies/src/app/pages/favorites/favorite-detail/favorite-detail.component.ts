import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MovieService } from 'src/app/services/movie.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-favorite-detail',
  templateUrl: './favorite-detail.component.html'
})
export class FavoriteDetailComponent implements OnInit {

  constructor(private movieService: MovieService, 
              private route: ActivatedRoute,
              private translate: TranslateService) { }

  detail: {}
  
  ngOnInit() {
    this.getDetail()

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getDetail()
    });
  }

  getDetail(){
    this.movieService.getMovieDetail(this.route.snapshot.params['id']).subscribe(data => {
      this.detail = data;
    });
  }

}
