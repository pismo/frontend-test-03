import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable()
export class MovieService {

    url: string = environment.api

    constructor(private http: HttpClient) { }

    getGenres(): Observable<any> {
        return this.http.get(`${this.url}/genre/movie/list`)
    }

    getPopularMovie(): Observable<any> {
        return this.http.get(`${this.url}/movie/popular`)
    }

    getMovieDetail(movie_id): Observable<any> {
        return this.http.get(`${this.url}/movie/${movie_id}`)
    }

    getSimilarMovies(movie_id): Observable<any> {
        return this.http.get(`${this.url}/movie/${movie_id}/similar`)
    }

    searchMovie(): Observable<any> {
        return this.http.get(`${this.url}/search/movie`)
    }

}