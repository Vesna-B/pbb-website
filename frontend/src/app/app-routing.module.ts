import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './user/auth.guard';

import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { EarthingGraphComponent } from './software/earthing-graph/earthing-graph.component';
import { HomeComponent } from './info-pages/home/home.component';
import { ReviewEarthPotentialRiseComponent } from './software/review-earth-potential-rise/review-earth-potential-rise.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'earthing-graph', component: EarthingGraphComponent, canActivate: [AuthGuard] },
  { path: 'review-earth-potential-rise', component: ReviewEarthPotentialRiseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
