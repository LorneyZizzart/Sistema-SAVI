import { Persona } from './persona.interface';

export interface Acreedor extends Persona{
  idAcreedor?:string;
  idInformeEstudiante?:string;
  idConvenio?:string
  idUsuario?:string;
  fechaAsignado?:string;
  montoBs?:string;
  estadoAcreedor?:string;
}
