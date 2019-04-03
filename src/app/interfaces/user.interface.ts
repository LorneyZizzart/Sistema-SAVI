import { Persona } from './persona.interface';

export interface User extends Persona  {
  idUsuario?: string;
  idPersona?: string;
  idRol?: string;
  usuario?: string;
  password?: string;
  estado?: string
}
