import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MockMovieService } from '../../services/mock-movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent {
  movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private service: MockMovieService,
    public router: Router
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getMovieById(id).subscribe(m => {
      if (!m) {
        this.router.navigate(['/movies']);
      }
      this.movie = m!;
    });
  }
}
