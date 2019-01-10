import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mes'
})
export class MesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 1:
        value = 'enero'
        break;
      case 2:
        value = 'febrero'
        break;
      case 3:
        value = 'marzo'
        break;
      case 4:
        value = 'abril'
        break;
      case 5:
        value = 'mayo'
        break;
      case 6:
        value = 'junio'
        break;
      case 7:
        value = 'julio'
        break;
      case 8:
        value = 'agosto'
        break;
      case 9:
        value = 'septiembre'
        break;
      case 10:
        value = 'octubre'
        break;
      case 11:
        value = 'noviembre'
        break;
      case 12:
        value = 'diciembre'
        break;

      default:
        break;
    }
    return value;
  }

}
