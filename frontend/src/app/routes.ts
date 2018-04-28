import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import LoginFeature from './login';

const routes: Routes = [
  { path : ':id', component: HomeComponent },
  { path : '', component: HomeComponent, pathMatch : 'full'}
];

// LoginFeature.addGuard(http, []);

export {routes};
