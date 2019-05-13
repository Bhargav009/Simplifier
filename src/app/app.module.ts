import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { FormioModule } from 'angular-formio';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { getLoginConfig } from 'src/LoginConfig';
import { SimplyFormComponent } from './simply-form/simply-form.component';
import { AllFormsComponent } from './all-forms/all-forms.component';
import { SimplyChartComponent } from './simply-chart/simply-chart.component';
import { SimplyFormBuilderComponent } from './simply-form-builder/simply-form-builder.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SimplyFormComponent,
    AllFormsComponent,
    SimplyChartComponent,
    SimplyFormBuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    FormioModule,
    FormsModule,
    AngularFireDatabaseModule,  
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {
        path: '', component: LoginComponent
      },
      {
        path: 'builder', component: SimplyFormBuilderComponent
      },
      {
        path: 'form', component: SimplyFormComponent
      }
    ])
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getLoginConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
