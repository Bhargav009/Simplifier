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
    path: '', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'forgot', component: ForgotComponent
  },
  {
    path: 'builder', component: SimplyFormBuilderComponent
  },
  {
    path: 'all', component: AllFormsComponent
  },
  {
    path: 'form', component: SimplyFormComponent
  },
  {
    path: 'form/:key', component: SimplyFormComponent
  },
  {
    path: 'details', component: DetailsComponent
  },
  {
    path: 'details/:key', component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
