import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'undefineSaldo'
})
export class UndefineSaldoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == null || value == undefined){
      value = '0:00'
    }
    return value;
  }

}
