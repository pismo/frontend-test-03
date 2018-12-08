import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private movieService: MovieService, private translate: TranslateService) {}

  popular: []

  ngOnInit() {
    this.getPopular()

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getPopular()
    });
  }

  getPopular(){
    this.movieService.getPopularMovie().subscribe(data => {
      this.popular = data.results;
    });
  }

}
