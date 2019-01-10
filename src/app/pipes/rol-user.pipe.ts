import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolUser'
})
export class RolUserPipe implements PipeTransform {

  transform(value: any): any {
    switch (value) {
      case 1:
        return 'Jefe de GHT';
      break;
      case 2:
        return 'Jefatura de Finanzas';
      break;
      case 3:
        return 'Finanzas';
      break;
       case 4:
        return 'Jefe de Departamento';
      break;
      case 5:
        return 'Estudiante';
       break;
    }
    return 'Error: En el rol de Usuario';
  }

}
