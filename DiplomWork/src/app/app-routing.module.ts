import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "../pages/login/login.component";
import {SignUpUserComponent} from "../pages/sign-up-user/sign-up-user.component";
import {SignUpBusinessComponent} from "../pages/sign-up-business/sign-up-business.component";
import {UserHomePageComponent} from "../pages/user-home-page/user-home-page.component";
import {BusinessHomePageComponent} from "../pages/business-home-page/business-home-page.component";
import {CreateBusinessComponent} from "../pages/create-business/create-business.component";
import {ViewBusinessComponent} from "../pages/view-business/view-business.component";

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
  {
    path: 'user-home', component: UserHomePageComponent
  },
  {
    path: 'business-home', component: BusinessHomePageComponent
  },
  {
    path: 'create-business', component: CreateBusinessComponent
  },
  {
    path: 'view-business', component: ViewBusinessComponent
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
