import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor() { }

  favorits: any

  ngOnInit() {
    this.favorits = JSON.parse(localStorage.getItem('favorits'))
    if (!this.favorits) {
      this.favorits = []
    }
    console.log('this.favorits', this.favorits);
  }

}
