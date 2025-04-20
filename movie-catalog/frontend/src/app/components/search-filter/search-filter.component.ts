import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Добавьте этот импорт
import { Genre } from '../../models/genre.model';
import { Director } from '../../models/director.model';
import { MovieParams } from '../../models/movie.model';

@Component({
  selector: 'app-search-filter',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent {
  @Input() genres: Genre[] = [];
  @Input() directors: Director[] = [];
  @Output() search = new EventEmitter<MovieParams>();

  params: MovieParams = {};
  minYear = 1900;
  maxYear = new Date().getFullYear();

  onSearch(): void {
    this.search.emit(this.params);
  }

  resetFilters(): void {
    this.params = {};
    this.onSearch();
  }
}