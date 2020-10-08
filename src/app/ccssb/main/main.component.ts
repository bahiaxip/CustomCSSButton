import { Component, OnInit, DoCheck,ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import { ActivatedRoute } from "@angular/router";
import { CustomService } from "../services/custom.service";
//import { Subscription } from "rxjs";

@Component({
  selector: 'pre-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title= "CustomCSSButton";
  text:any="PredefinedComponent";
  panelTemp:string="0";
  zIndex:string="0";

  constructor(
    public _bottomSheet: MatBottomSheet,
    public _route:ActivatedRoute,
    public _customService:CustomService,
    private cd:ChangeDetectorRef) { }

  ngOnInit() {
    //este servicio obtiene en cual de los 2 componentes nos encontramos y así poder cambiar el texto del panel derecho
    this._customService.getMessage().subscribe(message => {
      if(message.text){
        this.text=message.text;
      }
    })
    //getPanelTemp() detecta la pulsación del botón Copiar HTML y Copiar CSS para
    //mostrar ventana modal con el mensaje de que ha sido guardado en el portapapeles
    this._customService.getPanelTemp().subscribe(data => {
      if(data==true && this.panelTemp=="0"){
        this.panelTemp="1";
        this.zIndex="1001";
        setTimeout(() => {
          this.panelTemp="0";
          this.zIndex="0";
        },3000);
      }
    })
  }

  //evita mensaje error de detección de cambios con ngif en div main.component.html
  ngAfterViewChecked(){
    this.cd.detectChanges();
  }

  openBottomSheet():void{
    this._bottomSheet.open(MainComponentDialog);
  }
}

@Component({
  selector:'pre-main-dialog',
  templateUrl:'./main.component-dialog.html',
  styleUrls:['./main.component.css']
})
export class MainComponentDialog {

  constructor(private _bottomSheetRef: MatBottomSheetRef<MainComponentDialog>){}

  openLink(event: MouseEvent):void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
