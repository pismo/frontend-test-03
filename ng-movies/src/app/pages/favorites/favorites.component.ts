import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  favorits: any

  ngOnInit() {
    this.getFavorites()

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getFavorites()
    });
  }

  getFavorites(){
    this.favorits = JSON.parse(localStorage.getItem('favorites'))
    if (!this.favorits) {
      this.favorits = []
    }
  }

}
