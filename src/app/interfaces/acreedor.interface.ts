import { User } from './user.interface';

export interface Acreedor extends User{
  idAcreedor?:string;
  idInformeEstudiante?:string;
  idConvenio?:string
  idUsuario?:string;
  fechaAsignado?:string;
  montoBs?:string;
  estadoAcreedor?:string;
}
