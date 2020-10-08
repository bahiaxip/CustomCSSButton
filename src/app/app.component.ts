import { Component, Inject } from '@angular/core';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

export interface DialogData{
  name:string;
  user:string;
}

@Component({
  selector: 'pre-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CustomCSSButton';
  //currentButton="mini";
  //propsButton:string;
  //buttonHTML:string;

  constructor(
    //public dialog: MatDialog
    ){
    //const color=this.oscurecerColor("#ffbb00",20);
    //console.log(color);
  }

  /*
  getCSS(size,predefined){
    this.getButtonForSize(size);

    this.getDataPredefinedButton(predefined);
    console.log(this.currentButton);
    this.openDialog();
  }
  */
  /* ventana métodos diálogo material */
  /*
  openDialog():void {

    const dialogRef = this.dialog.open(AppComponentDialog,{
      width:'600px',
      data:{html:this.buttonHTML,currentCSS:this.currentButton, propsCSS:this.propsButton},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was close: ", result);
    });
  }
  */
    /* fin  métodos ventana diálogo material */

    //obtener propiedades comunes del botón pasando parámetros de anchura y altura
    /*
    getCurrentButton(w,h):string {
      const currentButton = "\n.boton\n"+
    "{\n"+
    "font-family:'Palatino Linotype', 'Book Antiqua', Palatino, serif;\n"+
    "padding:2px 8px 4px 8px;\n"+
    "border:none;border-radius:5px;\n"+
    "font-weight:bold;font-size:15px;\n"+
    "width:"+w+"px;height:"+h+"px;\n"+
    "transition:all 0.2s linear;\n"+
    "position:relative;bottom:0;\n"+
    "outline:none;\n"+
    "display:inline;\n"+
    "text-align:center\n"+
    "}\n"+
    ".boton:active\n"+
    "{\n"+
    "bottom:-3px;\n"+
    "}";
      return currentButton;
    }
*/
    //obtener propiedades específicas del botón (excepto anchura y altura)
    //n:name, b: background, c: color, s:shadow
    /*
    getPropButton(n,b,c,s):string{
      const s2 = this.oscurecerColor(b,20);
      const boton = "\n."+n+"\n"+
    "{\n"+
    "box-shadow:0 3px 0 "+s+", 2px 2px 2px "+s+" inset,\n"+
    "-2px -2px 2px "+s+" inset;\n"+
    "background-color:"+b+";\n"+
    "color:"+c+";\n"+
    "}\n"+
    "."+n+":active\n"+
    "{\n"+
    "box-shadow:0 0 0 "+s2+", 1px 1px 2px "+s2+" inset,-1px -1px 2px "+s2+" inset;\n"+
    "}";
    return boton;
    }


    getDataPredefinedButton(predefined){
      this.buttonHTML = '<button class="boton '+predefined+'">'+predefined+'</button>';
      switch (predefined) {
        case "negro":
          this.propsButton = this.getPropButton("negro","#1C1C1C","#FFF","#000");
          break;
        case "verde":
          this.propsButton = this.getPropButton("verde","#20B2AA","#FFF","#53868B");
          break;
        case "azul":
          this.propsButton = this.getPropButton("azul","#1E90FF","#FFF","#4682B4");
          break;
        case "rojo":
          this.propsButton = this.getPropButton("rojo","#CD0000","#FFF","#8B0000");
          break;
        case "fucsia":
          this.propsButton = this.getPropButton("fucsia","#CD1076","#FFF","#8B0A50");
          break;
        case "lila":
          this.propsButton = this.getPropButton("lila","#8A2BE2","#FFF","#68228B");
          break;
        default:
          this.propsButton = this.getPropButton("normal","#BEBEBE","#000","rgba(105,105,105,0.4)");
          break;
      }

    }

    //asigna a la variable currentButton las propiedades comunes del botón pasando una de las 3 posibles medidas

    getButtonForSize(size){

      switch (size) {
        case "mini":
          this.currentButton= this.getCurrentButton(80,30);
          break;
        case "medium":
          this.currentButton = this.getCurrentButton(100,40);
          break;
        case "maxi":
          this.currentButton = this.getCurrentButton(120,50);
          break;
        default:
          this.currentButton=this.getCurrentButton(100,40);
          break;
      }

      //this.sizeButton=result;
    }
    */

    /*
    oscurecerColor(color,cant){

      if(color.substr(0,1)!="#"){
        return color;
      }
      //extraer los 3 colores
     var rojo = color.substr(1,2);
     var verd = color.substr(3,2);
     var azul = color.substr(5,2);

     //convertir cadenas a enteros
     var introjo = parseInt(rojo,16);
     var intverd = parseInt(verd,16);
     var intazul = parseInt(azul,16);

     //comprobar que no es negativo y restar para oscurecer
     if (introjo-cant>=0) introjo = introjo-cant;
     if (intverd-cant>=0) intverd = intverd-cant;
     if (intazul-cant>=0) intazul = intazul-cant;
*/
     //sumar para aclarar en lugar de restar
     /*
     if (introjo+cant>=0) introjo = introjo+cant;
     if (intverd+cant>=0) intverd = intverd+cant;
     if (intazul+cant>=0) intazul = intazul+cant;
     */
/*
     //volver a convertir de enteros a cadenas
     rojo = introjo.toString(16);
     verd = intverd.toString(16);
     azul = intazul.toString(16);

     //asegurar los 2 caracteres por color
     if (rojo.length<2) rojo = "0"+rojo;
     if (verd.length<2) verd = "0"+verd;
     if (azul.length<2) azul = "0"+azul;
     //hexadecimal
     var oscuridad = "#"+rojo+verd+azul;

     return oscuridad;
    }
    */

}

/*@Component({
  selector:"app.component-dialog",
  templateUrl: "./app.component-dialog.html",
  styleUrls: ["./app.component.css"]

})
export class AppComponentDialog{

  constructor(
    public dialogRef: MatDialogRef<AppComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){
    console.log("inicia modal",data.name);
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}*/

