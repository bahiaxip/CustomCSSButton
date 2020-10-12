import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CcsbRoutingModule } from "./ccssb-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from  "@angular/material/form-field";
import { PredefinedComponent } from './predefined/predefined.component';
import { PredefinedComponentDialog } from "./predefined/predefined.component";
import { CustomComponent } from './custom/custom.component';
import { CustomComponentDialog } from "./custom/custom.component";
import { MainComponent } from './main/main.component';
import { MainComponentDialog } from './main/main.component';
import { FormsModule } from "@angular/forms";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatTabsModule } from "@angular/material/tabs";
//import { MatInputModule } from "@angular/material/input";


@NgModule({
  declarations: [PredefinedComponent,PredefinedComponentDialog, CustomComponent, MainComponent,CustomComponentDialog,MainComponentDialog],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    CcsbRoutingModule,
    FormsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatTooltipModule,
    MatGridListModule,
    MatExpansionModule,
    MatInputModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatTabsModule
  ],
  exports: [
    PredefinedComponent,
    MainComponent,
    CustomComponentDialog
  ],
  entryComponents:[
    PredefinedComponentDialog,
    CustomComponentDialog,
    MainComponentDialog

  ]
})
export class CCSSBModule { }
