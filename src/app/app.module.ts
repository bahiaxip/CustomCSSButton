import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { MatToolbarModule} from "@angular/material/toolbar";
import { CommonModule } from "@angular/common";
import { CCSSBModule } from "./ccssb/ccssb.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    //MatToolbarModule,
    CCSSBModule
  ],
  exports:[
  //CCSSBModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  //entryComponents:[AppComponent,]
})
export class AppModule { }
