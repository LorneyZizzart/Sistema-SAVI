export interface Persona {
  idPersona?: string;
  codEstudiante?: string;
  idEstudiante?:string;
  nombres?:string;
  apellidos?:string;
  primerNombre?: string;
  segundoNombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  nacionalidad?: string;
  direccion?: string;
  ci?: string;
  celular?: string;
  fechaNacimiento?: string;
  estadoPersona?: boolean;
  fechaRegistroPersona?:string
  editPersona?:string
  idCarrera?:string
  carrera?:string
  semestre?:string
  // idUsuario?: string;
  // idRol?: string;
  // rol?:string
  // usuario?: string;
  // password?: string;
  // estadoUsuario?: string
//Se utiliza para dar info del estudiante en convenio
  // departamento?:string;
  // nombreArea?:string
  // beca?:string;
  // fechaInicio?:string;
  // fechaFinal?:string;
  // fotocopiaCarnet?:boolean;
  // solicitudTrabajo?:boolean;
//SE UTILIZA PARA REGISTRAR ASISTENCIA
  // idConvenio?:string;
}
