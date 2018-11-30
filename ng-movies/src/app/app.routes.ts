import { Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component'
import { FavoritesComponent } from './pages/favorites/favorites.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'movies/:id', component: MovieDetailComponent},
    {path: 'favorites', component: FavoritesComponent},
    {path: '**', component: NotFoundComponent}
];