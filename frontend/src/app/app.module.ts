import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { EarthingGraphComponent } from './software/earthing-graph/earthing-graph.component';
import { HomeComponent } from './info-pages/home/home.component';
import { ReviewEarthPotentialRiseComponent } from './software/review-earth-potential-rise/review-earth-potential-rise.component';
import { AboutComponent } from './info-pages/about/about.component';
import { PortfolioComponent } from './info-pages/portfolio/portfolio.component';
import { OrgChartComponent } from './info-pages/org-chart/org-chart.component';
import { ContactComponent } from './info-pages/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    EarthingGraphComponent,
    HomeComponent,
    ReviewEarthPotentialRiseComponent,
    AboutComponent,
    PortfolioComponent,
    OrgChartComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
