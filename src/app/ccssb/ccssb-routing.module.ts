import { NgModule } from  "@angular/core";
import {RouterModule, Routes } from "@angular/router";

//Components
import { MainComponent } from "./main/main.component";
import { PredefinedComponent } from "./predefined/predefined.component";
import { CustomComponent } from "./custom/custom.component";

const ccsbRoutes:Routes = [
  {
    path:"",
    redirectTo: "ccsb-panel",
    pathMatch:"full"
  },
  {
    path:"ccsb-panel",
    component: MainComponent,
    children:[
      {path: "",redirectTo: "predefined",pathMatch:"full"},
      {path: "predefined", component:PredefinedComponent},
      {path: "custom", component: CustomComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ccsbRoutes)
  ],
  exports: [RouterModule]
})

export class CcsbRoutingModule { }
