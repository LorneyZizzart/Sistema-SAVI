import { HistorialDepartamento } from './historialDepartamento.interface';
import { Organizacion } from './organizacion.interface';
import { Persona } from './persona.interface';

export interface Departamento extends Organizacion, HistorialDepartamento {
  idDepartamento?:string
  idDepartamentoSelect?:string
  nombreDepartamento?:string
  fechaRegistroDepartamento?:string
  estadoDepartamento?:string
  editDepartamento?:string
  historialDepartamento?:HistorialDepartamento;
  organizacionDepartamento?:Organizacion;
  persona?:Persona
}
