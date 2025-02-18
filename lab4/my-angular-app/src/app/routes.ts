import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  }
];

export default routeConfig;

// import {Routes} from '@angular/router';

// import {HomeComponent} from './home/home.component';
// import {UserComponent} from './user/user.component';

// export const routes: Routes = [
//   {
//     path: '',
//     title: 'App Home Page',
//     component: HomeComponent,
//   },
//   {
//     path: 'user',
//     title: 'App User Page',
//     component: UserComponent,
//   },
// ];


