import { Persona } from './persona.interface';

export interface User extends Persona  {
  idUsuario?: string;
  idRol?: string;
  usuario?: string;
  password?: string;
  estado?: string
  rol?:string
  token?:string
  expira?:string
}
