import { Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { FavoritesComponent } from './pages/favorites/favorites.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { SearchComponent } from './pages/search/search.component';
import { SearchDetailComponent } from './pages/search/search-detail/search-detail.component';
import { PopularDetailComponent } from './pages/home/popular-detail/popular-detail.component';
import { FavoriteDetailComponent } from './pages/favorites/favorite-detail/favorite-detail.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'movie-detail/:id', component: PopularDetailComponent},
    {path: 'favorites', component: FavoritesComponent},
    {path: 'favorites/movie-detail/:id', component: FavoriteDetailComponent},
    {path: 'search/:text', component: SearchComponent},
    {path: 'search/:text/movie-detail/:id', component: SearchDetailComponent},
    {path: '**', component: NotFoundComponent}
];