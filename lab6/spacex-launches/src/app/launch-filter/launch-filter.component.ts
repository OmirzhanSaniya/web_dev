import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-launch-filter',
  standalone: true,
  templateUrl: './launch-filter.component.html',
  styleUrls: ['./launch-filter.component.css']
})
export class LaunchFilterComponent {
  @Output() filterChange = new EventEmitter<boolean>();

  filterSuccess(successful: boolean) {
    this.filterChange.emit(successful);
  }
}