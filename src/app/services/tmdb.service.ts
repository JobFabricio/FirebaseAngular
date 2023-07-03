import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private readonly apiKey = '4f5f43495afcc67e9553f6c684a82f84'; // Reemplaza 'TU_API_KEY' con tu propia clave de API de TMDB

  constructor(private http: HttpClient) {}

  getCartelera() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`;

    return this.http.get(url);
  }

  searchMovies(query: string) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${query}`;

    return this.http.get(url);
  }

  getMovieDetails(movieId: number) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}`;

    return this.http.get(url);
  }
}
