import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "../pages/login/login.component";
import {SignUpUserComponent} from "../pages/sign-up-user/sign-up-user.component";
import {SignUpBusinessComponent} from "../pages/sign-up-business/sign-up-business.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {path: 'login', component: LoginComponent},
  {
    path: 'signUp',
    children: [
      {
        path: 'user', component: SignUpUserComponent
      },
      {
        path: 'business', component: SignUpBusinessComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    anchorScrolling: "enabled",
    onSameUrlNavigation: 'reload',
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
