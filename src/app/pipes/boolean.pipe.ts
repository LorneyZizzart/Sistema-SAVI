import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boleano'
})
export class BoleanpPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    switch (value) {
      case true:
        value = 'SI';
        break;
      case false:
        value = 'NO';
      break;
      default:
        break;
    }

    return value;
  }

}
