import { AngularFireAuth } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormioModule } from 'angular-formio';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AgGridModule } from 'ag-grid-angular';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SimplyFormComponent } from './simply-form/simply-form.component';
import { AllFormsComponent } from './all-forms/all-forms.component';
import { SimplyFormBuilderComponent } from './simply-form-builder/simply-form-builder.component';
import { environment } from 'src/environments/environment';
import { DetailsComponent } from './details/details.component';
import { ForgotComponent } from './forgot/forgot.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SimplyFormComponent,
    AllFormsComponent,
    SimplyFormBuilderComponent,
    DetailsComponent,
    ForgotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormioModule,
    FormsModule,
    NgbModule,
    GoogleChartsModule.forRoot(),
    AgGridModule.withComponents([]),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
