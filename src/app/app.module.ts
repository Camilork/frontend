import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PersonComponent } from './componets/person/person.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './componets/login/login.component';

import { app_routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    app_routing,
    FormsModule,
    HttpModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
