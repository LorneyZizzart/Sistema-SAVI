export interface InformeFinanzas {
  idInformeFinanzas?:string
  idUsuario?:string
  idInformeEstudiante?:string
  fechaAprobada?:string
  archivar?:string
  //convenio
  idConvenio?:string
  idPersona?: string;
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
  //informeJefe
  idInformeJefe?:string
  fecha?:string
  detalle?:string
  observacion?:string
  aprobadoJefeDep?:string
  aprobadoFinanzas?:string
  totalHoras?:string
  totalSaldo?:string

}
