import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AvatarModule} from 'ngx-avatar';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {BusinessLogicService} from './business-logic.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AvatarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [BusinessLogicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
