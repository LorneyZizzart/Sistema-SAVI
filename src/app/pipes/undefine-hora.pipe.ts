import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'undefineHora'
})
export class UndefineHoraPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(value == null || value == undefined){
      value = '00:00'
    }
    return value;
  }

}
