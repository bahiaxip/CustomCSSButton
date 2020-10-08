import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
//import { of } from "rxjs";
import { Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CustomService {

//onGetData: EventEmitter<string> = new EventEmitter();
//public dato:any="hola";
private subject=new Subject<any>();

  constructor() {

   }

   public success(message:string){
     this.subject.next({type:'success',text:message});
   }
   public error(message:string){
     this.subject.next({type:'error',text:message});
   }

   public getMessage():Observable<any>{
     return this.subject.asObservable();
   }

   /*getObservable():Observable<any>{
     return of(this.dato);
   }

   setObservable(dato:any):void{
     this.dato=dato;
   }


  getCustom(){
    //console.log("mensaje desde CustomService");

  }
  */
  //genera y devuelve el código CSS de la clase de las propiedades comunes del botón
  getCurrentButton(n,w,h,font,format,t,polygon):string {
    //se asigna el nombre de la clase a name para comprobar si se ha desmarcado el slice de negrita
    //si no es negrita (que es la que viene por defecto) se añade -n al nombre de la clase
    //Estas modificaciones en el nombre se realizan para no generar conflictos cuando se
    //crean varios botones.

    //actualizamos el nombre de la clase para el código CSS (se actualiza tb desde el getButtonForSize para el código HTML)
    let name=this.testTransitionAndBold(n,format,t,polygon);
    //actualizamos con sufijo "-circle" por si es circular en lugar de rectangular
    //y actualizamos el border-radius
    let radius="5px";
    if(polygon!="rectangle"){
      //name=name+"-circle";
      radius="50%";
    }
    //name=(t==null || t=="0.1") ? name : name+"-t"+t.substring(2,3);
    //const name=(format=="bold") ? n : n+"-n";

    const currentButtonAndSize = "\n."+name+"\n"+
    "{\n"+
    "font-family:'Palatino Linotype', 'Book Antiqua', Palatino, serif;\n"+
    "padding:2px 8px 4px 8px;\n"+
    "border:none;border-radius:"+radius+";\n"+
    "font-weight:"+format+";font-size:"+font+"px;\n"+
    "width:"+w+"px;height:"+h+"px;\n"+
    "transition:all "+t+"s linear;\n"+
    "position:relative;bottom:0;\n"+
    "outline:none;\n"+
    "overflow:hidden;\n"+
    "display:inline;\n"+
    "text-align:center\n"+
    "}\n"+
    "."+name+":active\n"+
    "{\n"+
    "bottom:-3px;\n"+
    "}";
    return currentButtonAndSize;
  }

  //devuelve el código de estilos del botón con las propiedades comunes del botón estableciendo una de las 4 posibles medidas
  getButtonForSize(size,fontSize,format,transition,polygon){
    let currentButton=[];
    switch (size) {

      case "mini":
      //se modifica el nombre de la clase para no crear conflictos con botones distintos
        currentButton[0] = (fontSize=="13") ? "ccssb-mini" : "ccssb-mini-"+fontSize;
        (polygon=="rectangle") ?
        currentButton[1]= this.getCurrentButton(currentButton[0],60,25,fontSize,format,transition,polygon):
        currentButton[1]= this.getCurrentButton(currentButton[0],35,35,fontSize,format,transition,polygon);
        break;
      case "max":
        currentButton[0] = (fontSize=="17") ? "ccssb-max" : "ccssb-max-"+fontSize;
        (polygon=="rectangle") ?
        currentButton[1] = this.getCurrentButton(currentButton[0],100,40,fontSize,format,transition,polygon):
        currentButton[1] = this.getCurrentButton(currentButton[0],65,65,fontSize,format,transition,polygon);
        break;
        case "xl":
        currentButton[0] = (fontSize=="19") ? "ccssb-xl" : "ccssb-xl-"+fontSize;
        (polygon=="rectangle") ?
        currentButton[1] = this.getCurrentButton(currentButton[0],120,50,fontSize,format,transition,polygon):
        currentButton[1] = this.getCurrentButton(currentButton[0],75,75,fontSize,format,transition,polygon);
        break;
      default:
        currentButton[0] = (fontSize=="15") ? "ccssb" : "ccssb-"+fontSize;
        (polygon=="rectangle") ?
        currentButton[1]=this.getCurrentButton(currentButton[0],80,30,fontSize,format,transition,polygon):
        currentButton[1]=this.getCurrentButton(currentButton[0],45,45,fontSize,format,transition,polygon);
        break;
    }
      //actualizamos el nombre de la clase para poder pasarlo al código HTML
      currentButton[0]=this.testTransitionAndBold(currentButton[0],format,transition,polygon)
      return currentButton;
  }

  testTransitionAndBold(n,format,transition,polygon){
    let name=n;
    if(transition=="0.01" || transition=="0.05"){
      name=n+"-t"+transition.substring(2,4);
    }else if(transition!="0.1") name=n+"-t"+transition.substring(2,3);

    if(format!="bold") name=name+"-n";
    if(polygon!="rectangle") name=name+"-circle";
    return name;
  }
  //genera y devuelve el código CSS de la clase de las propiedades no comunes del botón
  getPropButton(n,b,c,s,cursor,colorActive=null,shadowActive=null):string{

    const s2 = this.oscurecerColor(b,60);
    let colorAct=(colorActive!=null) ? 'color:'+colorActive+";" : "";
    let shadowAct=(shadowActive!=null) ? shadowActive : s2;

    const boton = "\n.ccssb_"+n+"\n"+
    "{\n"+
    "box-shadow:0 3px 0 "+s2+", 2px 2px 2px "+s+" inset,\n"+
    "-2px -2px 2px "+s+" inset;\n"+
    "background-color:"+b+";\n"+
    "color:"+c+";\n"+
    "cursor:"+cursor+
    "}\n"+
    ".ccssb_"+n+":active\n"+
    "{\n"+
    "box-shadow:0 0 0 "+s2+", 1px 1px 2px "+shadowAct+" inset,-1px -1px 2px "+shadowAct+" inset;\n"+colorAct+
    "}";

    return boton;
  }

  //método de oscurecer y aclarar un color en formato hexadecimal (string)
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
     if (introjo-cant>=0) {
       introjo = introjo-cant;
       //en caso de que cant sea muy alto y el color ya sea oscuro los oscurecemos solo un poco(10)
     }else if(introjo-10>=0){
       introjo=introjo-10;
     }
     if (intverd-cant>=0){
       intverd = intverd-cant;
       //en caso de que cant sea muy alto y el color ya sea oscuro los oscurecemos solo un poco(10)
     }else if(intverd-10>=0){
       intverd=intverd-10;
     }
     if (intazul-cant>=0){
       intazul = intazul-cant;
       //en caso de que cant sea muy alto y el color ya sea oscuro los oscurecemos solo un poco(10)
     }else if(intazul-10>=0){
       intazul = intazul-10;
     }

     //sumar para aclarar en lugar de restar
     /*
     if (introjo+cant>=0) introjo = introjo+cant;
     if (intverd+cant>=0) intverd = intverd+cant;
     if (intazul+cant>=0) intazul = intazul+cant;
     */

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

    //copiar código al portapapeles
  copyCode(data){
    data.focus();
    data.select();
    document.execCommand("copy");
    //document.focus()
    //removeAllRanges (al cambiar de pestaña en el navegador y volver aparece seleccionado)
    //para evitar esto mejor la opción collapseToEnd()
    //document.getSelection().removeAllRanges();
    document.getSelection().collapseToEnd();
    this.setPanelTemp();
  }

  setPanelTemp(){
    this.subject.next(true);
  }
  getPanelTemp():Observable<any>{
    return this.subject.asObservable();
  }
}
