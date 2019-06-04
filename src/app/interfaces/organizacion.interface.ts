import { Persona } from "./persona.interface";

export interface Organizacion extends Persona {
    idOrganizacion?:string
    fechaRegistroOrganizacion?:string
    estadoOrganizacion?:string
    editOrganizacion?:string
  }