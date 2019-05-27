import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo" ];
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var returnDate;
    let date = new Date(value);
    var fechaNum = date.getDate()+1;
    var mes_name = date.getMonth();  
    if(fechaNum >= 32){
      fechaNum = 1;
    } 
    switch (args) {
      case 1: 
        returnDate =  fechaNum + " de " + meses[mes_name] + " de " + date.getFullYear();
        break;    
      default:
        break;
    }

    return returnDate;
    
  }

}
