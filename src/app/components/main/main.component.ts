import { Component, OnInit } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  cartelera: any[] = []; // Variable para almacenar los datos de la cartelera
  searchTerm: string = ''; // Término de búsqueda

  constructor(private tmdbService: TmdbService, private router: Router) {}

  ngOnInit(): void {
    this.getCartelera(); // Llama a la función para obtener la cartelera al inicializar el componente
  }

  getCartelera(): void {
    this.tmdbService.getCartelera().subscribe((response: any) => {
      this.cartelera = response.results; // Asigna los resultados de la cartelera al arreglo 'cartelera'
      this.getMovieDetails(); // Obtiene los detalles de cada película
    });
  }

  search(): void {
    // Realiza la búsqueda solo si hay un término de búsqueda
    if (this.searchTerm.trim() !== '') {
      this.tmdbService.searchMovies(this.searchTerm).subscribe((response: any) => {
        this.cartelera = response.results; // Asigna los resultados de la búsqueda al arreglo 'cartelera'
        this.getMovieDetails(); // Obtiene los detalles de cada película
      });
    } else {
      // Si no hay un término de búsqueda, obtén la cartelera completa
      this.getCartelera();
    }
  }

  getMovieDetails(): void {
    // Recorre el arreglo de la cartelera y obtén los detalles de cada película
    for (let i = 0; i < this.cartelera.length; i++) {
      const pelicula = this.cartelera[i];
      this.tmdbService.getMovieDetails(pelicula.id).subscribe((response: any) => {
        // Asigna la descripción de la película al objeto correspondiente en el arreglo 'cartelera'
        pelicula.description = response.overview;
      });
    }
  }

  getImagenUrl(posterPath: string): string {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    } else {
      return 'assets/placeholder-image.jpg'; // Ruta de la imagen de reemplazo si no hay poster disponible
    }
  }

  goToFavorites(): void {
    this.router.navigate(['/favoritos']);
  }


}
