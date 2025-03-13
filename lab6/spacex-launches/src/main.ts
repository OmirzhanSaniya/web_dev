import { bootstrapApplication } from '@angular/platform-browser';
import { SpacexLaunchesComponent } from './app/spacex-launches/spacex-launches.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(SpacexLaunchesComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));

