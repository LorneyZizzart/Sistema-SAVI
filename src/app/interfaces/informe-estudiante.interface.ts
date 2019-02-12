export interface InformeEstudiante {
  idInformeEstudiante?:string
  idRegistroHora?:string
  idConvenio?:string
  fecha?:string
  totalHoras?:string
  totalSaldo?:string
  aprobadoJefeDep?:string
  aprobadoFinanzas?:string
  archivar?:string
  //registro Hora
  observacionRegistroHora?:string
  //datos personales
  idPersona?: string;
  codEstudiante?:string
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
  carrera?:string
  semestre?:string
  idDepartamento?:string
  departamento?:string
  idBeca?:string
  beca?:string
  fechaInicio?:any
  fechaFinal?:any
  fotocopiaCarnet?:string
  solicitudTrabajo?:string
  estadoConvenio?:string
}
