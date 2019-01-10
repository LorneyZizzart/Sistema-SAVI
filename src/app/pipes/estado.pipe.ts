import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    switch (value) {
      case true:
        value = 'HABILITADO';
        break;
      case false:
        value = 'DESHABILITADO';
      break;
      default:
        break;
    }

    return value;
  }

}
