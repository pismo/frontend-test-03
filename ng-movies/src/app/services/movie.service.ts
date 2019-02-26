import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable()
export class MovieService {

    url: string = environment.api

    constructor(private http: HttpClient) { }

    getPopularMovie(): Observable<any> {
        return this.http.get(`${this.url}/movie/popular`)
    }

    getMovieDetail(movie_id): Observable<any> {
        return this.http.get(`${this.url}/movie/${movie_id}`)
    }

    searchMovies(query, page?): Observable<any> {
        let params = new HttpParams();
        params = params.append('query', query);
        if (page) {
            params = params.append('page', page);
        }
        return this.http.get(`${this.url}/search/movie`, {params: params})
    }

}