import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { CustomService } from "../services/custom.service";
import { ActivatedRoute } from "@angular/router";

/*export interface DialogData{
  name:string;
  user:string;
}*/

@Component({
  selector: 'pre-predefined',
  templateUrl: './predefined.component.html',
  styleUrls: ['./predefined.component.css']
})
export class PredefinedComponent implements OnInit {

  title= "BaseCSS";
  currentButton=[];
  propsButton:string;
  buttonHTML:string;
  result:any;

  constructor(public dialog: MatDialog, private _customService:CustomService, private _route:ActivatedRoute) { }

  ngOnInit() {
    //pasamos en nombre del componente para mostrar el texto correspondiente
      //component.name  da error al generar el comando ng build --prod
      //const result = this._route.component.name;
      //component['name'] permite el comando ng build --prod pero no funciona
      //const result = this._route.component['name'];
      //finalmente routeConfig.path
    const result = this._route.snapshot.routeConfig.path;
    this._customService.success(result);
  }

  /* ventana métodos diálogo material */
  openDialog():void {

    const dialogRef = this.dialog.open(PredefinedComponentDialog,{
      width:'600px',
      data:{html:this.buttonHTML,currentCSS:this.currentButton[1], propsCSS:this.propsButton},
    });

    //no necesario (no se espera ningún resultado)
    /*dialogRef.afterClosed().subscribe(result => {
      //console.log("The dialog was close: ", result);
    });*/
  }
    /* fin  métodos ventana diálogo material */

    //se inicia al clicar el icono (en forma de ojo) de cada botón, llama al método que genera los datos y llama al método openDialog de Angular Material
  getCSS(predefined){
    //Si modifico el tamaño del botón se debe actualizar el tamaño de la fuente
    //el size es fijo y no es necesario en el html
    //código HTML del botón
    this.buttonHTML = '<button class="ccssb ccssb_'+predefined+'">'+predefined+'</button>';
    //código de propiedades comunes del botón
    this.currentButton=this._customService.getButtonForSize("medium","15","bold","0.1","rectangle");
    //actualiza propiedades no comunes del botón
    this.getPropsDefinedButton(predefined);
    //método openDialog de Angular Material
    this.openDialog();
  }

  //actualiza la variable propsButton con el método getPropButton()
  getPropsDefinedButton(predefined){

    switch (predefined) {
      case "negro":
        this.propsButton = this._customService.getPropButton("negro","#1C1C1C","#FFF","#000","pointer");
        break;
      case "azul":
        this.propsButton = this._customService.getPropButton("verde","#20B2AA","#FFF","#53868B","pointer");
        break;
      case "verde":
        this.propsButton = this._customService.getPropButton("azul","#1E90FF","#FFF","#4682B4","pointer");
        break;
      case "rojo":
        this.propsButton = this._customService.getPropButton("rojo","#CD0000","#FFF","#8B0000","pointer");
        break;
      case "naranja":
        this.propsButton = this._customService.getPropButton("naranja","#ff5100","#FFF","#ffb400","pointer");
        break;
      case "amarillo":
        this.propsButton = this._customService.getPropButton("amarillo","#ffbb00","#FFF","#ffff81","pointer");
        break;
      case "fucsia":
        this.propsButton = this._customService.getPropButton("fucsia","#CD1076","#FFF","#8B0A50","pointer");
        break;
      case "lila":
        this.propsButton = this._customService.getPropButton("lila","#8A2BE2","#FFF","#68228B","pointer");
        break;
      case "marron":
        this.propsButton = this._customService.getPropButton("marron","#833b00","#FFF","#ba8265","pointer");
        break;
      case "rojoB":
        this.propsButton = this._customService.getPropButton("rojoB","#c41c5a","#FFF","#ed366d","pointer");
        break;
      case "verdeB":
        this.propsButton = this._customService.getPropButton("verdeB","#20B2AA","#FFF","#00FA9A","pointer");
        break;
      case "rosa":
        this.propsButton = this._customService.getPropButton("rosa","#ff74b1","#FFF","#ffc7ff","pointer");
        break;
      case "azulB":
        this.propsButton = this._customService.getPropButton("azulB","#1E90FF","#FFF","#00FFFF","pointer");
        break;
      default:
        this.propsButton = this._customService.getPropButton("normal","#BEBEBE","#000","rgba(105,105,105,0.4)","pointer");
        break;
    }
  }

}

@Component({
  selector:"pre-predefined-dialog",
  templateUrl: "./predefined.component-dialog.html",
  styleUrls: ["./predefined.component.css"]

})
export class PredefinedComponentDialog{

  constructor(
    public dialogRef: MatDialogRef<PredefinedComponentDialog>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(MAT_DIALOG_DATA) public data,
    private _customService:CustomService
    ){
    console.log("inicia modal",data.html);
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  copyCode(data){
    this._customService.copyCode(data);
  }
}
