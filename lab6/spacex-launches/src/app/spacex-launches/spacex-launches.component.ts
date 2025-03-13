import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LaunchFilterComponent } from '../launch-filter/launch-filter.component';

@Component({
  selector: 'app-spacex-launches',
  standalone: true,
  imports: [CommonModule, LaunchFilterComponent],
  templateUrl: './spacex-launches.component.html',
  styleUrls: ['./spacex-launches.component.css']
})
export class SpacexLaunchesComponent implements OnInit {
  launches: any[] = [];
  filteredLaunches: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLaunches();
  }

  fetchLaunches(): void {
    this.http.get('https://api.spacexdata.com/v4/launches')
      .subscribe((data: any) => {
        this.launches = data;
        this.filteredLaunches = data;
        console.log('Launches loaded:', this.filteredLaunches);
      });
  }

  filterLaunches(successful: boolean) {
    this.filteredLaunches = this.launches.filter(launch => launch.success === successful);
  }
}