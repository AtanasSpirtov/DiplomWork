import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuPageComponent} from "../pages/menu-page/menu-page.component";
import {MatMenuModule} from '@angular/material/menu';
import {LoginComponent} from "../pages/login/login.component";
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SignUpUserComponent} from "../pages/sign-up-user/sign-up-user.component";
import {SignUpBusinessComponent} from "../pages/sign-up-business/sign-up-business.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BasicHttpInterceptorService} from "../pages/basic-http-interceptor.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSelectModule} from '@angular/material/select';
import {UserHomePageComponent} from "../pages/user-home-page/user-home-page.component";
import {BusinessHomePageComponent} from "../pages/business-home-page/business-home-page.component";
import {MatTableModule} from '@angular/material/table';
import {CreateBusinessComponent} from "../pages/create-business/create-business.component";
import {DatePipe} from "@angular/common";
import {ViewBusinessComponent} from "../pages/view-business/view-business.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ConfirmationModalComponent} from "../pages/dialogs/confirmation-modal.components";
import {AddUserToSlotComponent} from "../pages/add-user-to-slot/add-user-to-slot.component";
import {MyProfileComponent} from "../pages/my-profile/my-profile.component";
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [
    AppComponent,
    MenuPageComponent,
    LoginComponent,
    SignUpUserComponent,
    SignUpBusinessComponent,
    UserHomePageComponent,
    BusinessHomePageComponent,
    CreateBusinessComponent,
    ViewBusinessComponent,
    ConfirmationModalComponent,
    AddUserToSlotComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: BasicHttpInterceptorService, multi: true
  },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
