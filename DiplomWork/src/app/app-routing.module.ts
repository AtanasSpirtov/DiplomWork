import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../pages/login/login.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
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
