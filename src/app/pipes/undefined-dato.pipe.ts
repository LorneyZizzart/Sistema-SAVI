import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'undefinedDato'
})
export class UndefinedDatoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == null || value == undefined){
      value = '';
    }
    return value;
  }

}
