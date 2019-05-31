import { AuthGuardService } from './services/auth-guard.service';
import { ForgotComponent } from './forgot/forgot.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SimplyFormBuilderComponent } from './simply-form-builder/simply-form-builder.component';
import { AllFormsComponent } from './all-forms/all-forms.component';
import { SimplyFormComponent } from './simply-form/simply-form.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '', component: AllFormsComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'about', component: ForgotComponent
  },
  {
    path: 'builder', component: SimplyFormBuilderComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'all', component: AllFormsComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'all/:userKey', component: AllFormsComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'form', component: SimplyFormComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'form/:key', component: SimplyFormComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'details', component: DetailsComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'details/:key', component: DetailsComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
