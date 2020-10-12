import { Component, OnInit,DoCheck, Inject } from '@angular/core';
import { CustomService } from "../services/custom.service";
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

/*export interface DialogData{
  name:string;
  user:string;
}*/

@Component({
  selector: 'pre-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})

export class CustomComponent implements OnInit {

  title="CustomCSS";
  //inputs paleta de colores
  inputR:string;
  inputG:string;
  inputB:string;
  //inputs tipo range (gradients) de paleta de colores
  rangeR:string="0";
  rangeG:string="0";
  rangeB:string="0";
  //gradiente del input type range de la paleta
  linearGradient:string[]=[];

  //valor seleccionado del grupo de botones, reset por defecto
  buttonToggleGroup:string="reset";
  //color del panel de la paleta, negro por defecto
  colorCss:string="#000000";
  //tooltip del grupo de botones, reset (desactivado) por defecto
  tooltip="reset";
  //código (string) CSS de la clase de las propiedades comunes del botón
  currentButton =[];
  //código (string) CSS de la clase de las propiedades no comunes del botón
  propsButton:string;
  //código (string) HTML del elemento button con sus clases asignadas
  buttonHTML:string;
  className:string="";
  //errorColor es un interruptor que permite activar un mensaje oculto que aparece si no se ha introducido un color hexadecimal válido
  errorColor:boolean=false;
  //errorColor es un interruptor que permite activar un mensaje oculto que aparece si no se ha introducido un color hexadecimal válido
  errorShadow:boolean=false;
  //color de letra que se almacena temporalmente para el efecto de estado active del botón de muestra
  colorFontTemp;
  colorShadowTemp;
  mssgeNameRequired:boolean=false;
  mssgeName:string="Nombre";
  //opciones seleccionables y configurables con un valor inicial por defecto
  Selected={
    //medida de botón seleccionada, medium por defecto
    size:"medium",
    //duración de transición seleccionada, 0.1s por defecto
    timeTrans:"0.1",
    //tamaño de fuente seleccionada,15 por defecto (correspondiente a la medida medium)
    font:"15",
    //formato de tipografía seleccionado, por defecto bold (bold o negrita)
    format:"bold",
    //cursor seleccionado
    cursor:"pointer",
    //polígono seleccionado (rectangular o circular)
    polygon:"rectangle"
  }

  //fondo del botón, color del botón, sombra del botón y color de sombra del botón
  Button={
    background: "#1C1C1C",
    darkBackground: "#000000",
    color: "#FFFFFF",
    //sombra del botón (string)
    shadow: null,
    //color de sombra del botón (hexadecimal)
    colorShadow: "#696969",
    //color de fuente (por defecto desactivado) cuando el botón se encuentra en estado activo (pulsado)
    colorActive: null,
    //color de sombra cuando el botón se encuentra en estado activo (pulsado)
    shadowActive: null,
    //rectangular o circular
    borderRadius:"5px"
  }
  //slice (opciones avanzadas)
  Checked={
    fontSize: false,
    timeTrans: false,
    format: true,
    cursor: false,
    colorActive: false,
    shadowActive: false
  }
  //opciones tamaños de botón (4 distintos)
  Sizes={
    widths:{"mini":"60px","medium":"80px","max":"100px","xl":"120px"},
    heights:{"mini":"25px","medium":"30px","max":"40px","xl":"50px" },
    fontSizes:{"mini":"13","medium":"15","max":"17","xl":"19"},
    widths_heightsCircle:{"mini":"35px","medium":"45px","max":"65px","xl":"75px"}

  }

  //anchura, altura y fuente asignadas por defecto
  sizeW=this.Sizes.widths.medium;
  sizeH=this.Sizes.heights.medium;
  fontSize=this.Sizes.fontSizes.medium;
  texto:string="Enviar";

  constructor(public dialog: MatDialog,private _route:ActivatedRoute, private _customService:CustomService) { }

  ngOnInit() {
    //pasamos en nombre del componente actual para mostrar el texto correspondiente
    const result=this._route.snapshot.routeConfig.path;
    this._customService.success(result);
  }

  ngDoCheck(){ }

  getCSS(){

    if(this.className=="" || this.className==null){
      this.mssgeName="";
      this.mssgeNameRequired=true;
      return;
    }

    //comprobamos si la opción de color activo no está vacío y si el
    //código de color introducido es un hexadecimal válido (con # y 6 cifras e.g. #696969)

    if(this.Checked.colorActive && !(/^#[0-9A-F]{6}$/i.test(this.Button.colorActive))){
      this.errorColor=true;
      return;
    }
    if(this.Checked.shadowActive && !(/^#[0-9A-F]{6}$/i.test(this.Button.shadowActive))){
      this.errorShadow=true;
      return;
    }
    //ocultamos mensaje de color hexadecimal inválido (si estuviera visible y pasa la condición anterior)
    this.errorColor=false;
    this.errorShadow=false;
    this.currentButton=this._customService.getButtonForSize(this.Selected.size,this.Selected.font,this.Selected.format,this.Selected.timeTrans,this.Selected.polygon);
    this.propsButton = this._customService.getPropButton(this.className,this.Button.background,this.Button.color,this.Button.colorShadow,this.Selected.cursor,this.Button.colorActive,this.Button.shadowActive);
    this.buttonHTML='<button class="'+this.currentButton[0]+' ccssb_'+this.className+'">'+this.texto+'</button>';
    this.openDialog();
  }

  openDialog():void{
    const dialogRef = this.dialog.open(CustomComponentDialog,{
      width:"600px",
      data: {html:this.buttonHTML, currentCSS:this.currentButton[1],propsCSS:this.propsButton}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("el diálogo se ha cerrado");
    })
  }

  //establece las opciones del grupo de botones (fondo, color, sombra)
  paint(){
    switch(this.buttonToggleGroup){
      case "background":
        this.Button.background=this.colorCss;
        this.Button.darkBackground=this._customService.oscurecerColor(this.colorCss,60);
        this.Button.shadow="0 3px 0 "+this.Button.darkBackground+", 2px 2px 2px "+ this.Button.colorShadow+" inset, -2px -2px 2px "+this.Button.colorShadow+" inset";
        break;
      case "font":
        this.Button.color=this.colorCss;
        break;
      case "shadow":
        this.Button.shadow="0 3px 0 "+this.Button.darkBackground+", 2px 2px 2px "+ this.colorCss+" inset, -2px -2px 2px "+this.colorCss+" inset";
        this.Button.colorShadow=this.colorCss;
        break;
    }
    this.buttonToggleGroup="reset";
  }

  //interruptores de opciones avanzadas
  //si se anula alguno de los interruptores (excepto el slice formato) vuelve al estado por defecto
  changeSlice(event,data){
    switch(data){
      case "cursor":
        this.Checked.cursor=event;
        console.log("event cursor: ",event);
        if(event==false)
          this.Selected.cursor="pointer";
      break;
      case "fontSize":
        this.Checked.fontSize=event;
        if(event==false)
          this.Selected.font=this.Sizes.fontSizes[this.Selected.size];
          this.fontSize=this.Selected.font;
      break;
      case "timeTrans":
        this.Checked.timeTrans=event;
        if(event==false)
          this.Selected.timeTrans="0.1";
      break;
      case "format":
        this.Checked.format=event;
        this.Selected.format=(this.Selected.format=="bold") ? "normal":"bold";
      break;
      case "colorActive":
        this.Checked.colorActive=event;
        if(event==false)
          this.Button.colorActive=null;
      break;
      case "shadowActive":
        this.Checked.shadowActive=event;
        if(event==false)
          this.Button.shadowActive=null;
      break;
    }
  }

  changeLabelName(){
    this.mssgeNameRequired=false;
    this.mssgeName="Nombre";
  }

  //se asignan las variables de los valores seleccionados (enteros) de cada color de la paleta (type range)
  set(){
    this.inputR=this.rangeR;
    this.inputG=this.rangeG;
    this.inputB=this.rangeB;
    //setColor() actualiza los gradientes a cada unidad (de 1 en 1) que se desliza el slider type range
    this.setColor();
  }
  //actualiza los gradientes en input type range
  setColor(){
    //convierte entero a hexadecimal
    const rHex = parseInt(this.rangeR).toString(16);
    const gHex = parseInt(this.rangeG).toString(16);
    const bHex = parseInt(this.rangeB).toString(16);
    //se concatenan los códigos convertidos de cada canal para obtener el código de color en formato hexadecimal
    this.colorCss="#"+this.formatDigit(rHex)+this.formatDigit(gHex)+
    this.formatDigit(bHex);
    //asigna los nuevos gradientes al array linearGradient
    this.generateGradient();
  }
  //establece la medida seleccionada
  setSize(){
    switch(this.Selected.size||this.Selected.polygon){
      case "mini":
        if(this.Selected.polygon=="rectangle"){
          this.sizeW=this.Sizes.widths.mini;
          this.sizeH=this.Sizes.heights.mini;
          this.Button.borderRadius="5px";
          this.texto="Enviar";
        }else{
          this.sizeW=this.Sizes.widths_heightsCircle.mini;
          this.sizeH=this.Sizes.widths_heightsCircle.mini;
          this.Button.borderRadius="50%";
          this.texto="OK";
        }
        this.fontSize=this.Sizes.fontSizes.mini;
        break;
      case "max":
      if(this.Selected.polygon=="rectangle"){
        this.sizeW=this.Sizes.widths.max;
        this.sizeH=this.Sizes.heights.max;
        this.Button.borderRadius="5px";
        this.texto="Enviar";
      }else{
        this.sizeW=this.Sizes.widths_heightsCircle.max;
        this.sizeH=this.Sizes.widths_heightsCircle.max;
        this.Button.borderRadius="50%";
        this.texto="OK";
      }
        this.fontSize=this.Sizes.fontSizes.max;
        break;
      case "xl":
        if(this.Selected.polygon=="rectangle"){
        this.sizeW=this.Sizes.widths.xl;
        this.sizeH=this.Sizes.heights.xl;
        this.Button.borderRadius="5px";
        this.texto="Enviar";
      }else{
        this.sizeW=this.Sizes.widths_heightsCircle.xl;
        this.sizeH=this.Sizes.widths_heightsCircle.xl;
        this.Button.borderRadius="50%";
        this.texto="OK";
      }
        this.fontSize=this.Sizes.fontSizes.xl;
        break;
      default:
        if(this.Selected.polygon=="rectangle"){
          this.sizeW=this.Sizes.widths.medium;
          this.sizeH=this.Sizes.heights.medium;
          this.Button.borderRadius="5px";
          this.texto="Enviar";
      }else{
        this.sizeW=this.Sizes.widths_heightsCircle.medium;
        this.sizeH=this.Sizes.widths_heightsCircle.medium;
        this.Button.borderRadius="50%";
        this.texto="OK";
      }
        this.fontSize=this.Sizes.fontSizes.medium;
        break;
    }
    this.Selected.font=this.fontSize;
    console.log(this.sizeW);
  }

  //convierte en dos dígitos si es necesario
  formatDigit(digit){
    return (digit.length<2) ? "0"+digit : digit;
  }

  //actualiza el array linearGradient con los nuevos gradientes
  generateGradient(){
    this.linearGradient[0]="linear-gradient(to right,rgb(0,"
  +this.inputG+","+this.inputB+"),rgb(255,"+this.inputG+","+this.inputB+"))";
    this.linearGradient[1]="linear-gradient(to right,rgb("+this.inputR+",0,"+this.inputB+"),rgb("+this.inputR+",255,"+this.inputB+"))";
    this.linearGradient[2]="linear-gradient(to right,rgb("+this.inputR+","
  +this.inputG+",0),rgb("+this.inputR+","+this.inputG+",255))";
  }
  //pinta las distintas partes del botón (fondo, letra y sombra)


  //comprueba si el dato es un color hexadecimal, almohadilla y 6 cifras (#XXXXXX)
  testColorHexadecimal(colorCode){
    return (/^#[0-9A-F]{6}$/i.test(colorCode)) ? true:false;
  }

  //efecto del estilo de sombra del botón con Javascript para simular el CSS
  keyp(event){
    if(event.type=="mousedown"){
      //comprobamos si se ha introducido algún color y es válido en la opción avanzada de color en estado active
      if(this.Button.colorActive && this.testColorHexadecimal(this.Button.colorActive)){
        console.log("colorActive: ",this.Button.colorActive);
        //asignamos el color actual en la variable colorFontTemp para después volver a asignarlo
        this.colorFontTemp=this.Button.color;
        console.log("colorFontTemp: ",this.colorFontTemp);
        this.Button.color=this.Button.colorActive;
        console.log("actualizado colorButton con colorFontActive: ",this.Button.color);
      }
      if(this.Button.shadowActive && this.testColorHexadecimal(this.Button.shadowActive)){
        this.colorShadowTemp = this.Button.colorShadow;
        this.Button.shadow="0 0 0 "+this.Button.darkBackground+", 2px 2px 2px " +this.Button.shadowActive+" inset,-2px -2px 2px " +this.Button.shadowActive+" inset";
      }else{
        this.Button.shadow="0 0 0 "+this.Button.darkBackground+", 2px 2px 2px " +this.Button.darkBackground+" inset,-2px -2px 2px " +this.Button.darkBackground+" inset";
      }
    }else{
      //asignamos el color oscuro del box-shadow (sombra) de color negro que es el botón de muestra
      this.Button.shadow="0 3px 0 "+this.Button.darkBackground+", 2px 2px 2px " +this.Button.colorShadow+" inset,-2px -2px 2px " +this.Button.colorShadow+" inset";
      //comprobamos si se ha introducido un color hexadecimal y devolvemos el color de la fuente al valor anterior
      if(this.Button.colorActive && this.testColorHexadecimal(this.Button.colorActive)){
        this.Button.color=this.colorFontTemp;
        console.log(this.colorFontTemp);
        console.log("entra en if en mouseup");
      }
      if(this.Button.shadowActive && this.testColorHexadecimal(this.Button.shadowActive)){
        this.Button.shadow="0 3px 0 "+this.Button.darkBackground+", 2px 2px 2px " +this.colorShadowTemp+" inset,-2px -2px 2px " +this.colorShadowTemp+" inset";
      }
    }
  }
  //actualiza el tamaño de fuente del botón de muestra
  updateFontSize(){
    this.fontSize=this.Selected.font;
  }
  //actualiza el tiempo de transición del botón de muestra
  /*updateTimeTransSelected(){
    console.log(this.Selected.timeTrans);
  }*/

}

@Component({

  selector: "pre-custom-dialog",
  templateUrl: "./custom.component-dialog.html",
  styleUrls: ["./custom.component.css"]
})
export class CustomComponentDialog{

  constructor(
    public dialogRef: MatDialogRef<CustomComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _customService:CustomService){

  }

  ngOnInit(){

  }
  onNoClick(): void{
    this.dialogRef.close();
  }

  copyCode(data){
    this._customService.copyCode(data);
  }

}

