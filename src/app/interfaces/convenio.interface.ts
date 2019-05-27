import { User } from './user.interface';

export interface Convenio extends User {
  idConvenio?:string
  idDepartamento?:string
  departamento?:string
  idBeca?:string
  beca?:string
  fechaInicio?:any
  fechaFinal?:any
  fotocopiaCarnet?:string
  solicitudTrabajo?:string
  estadoConvenio?:string
  nombreArea?:string
}
