import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(value >= 0 && value <= 9){
      value = '0'+value;
    }
    return value;
  }

}
