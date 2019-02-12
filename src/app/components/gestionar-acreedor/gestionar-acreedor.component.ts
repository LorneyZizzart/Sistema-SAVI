import { Component, OnInit } from '@angular/core';
import { AppAcreedorService } from '../../services/app-acreedor.service';
import { Acreedor } from '../../interfaces/acreedor.interface';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';

@Component({
  selector: 'app-gestionar-acreedor',
  templateUrl: './gestionar-acreedor.component.html',
  styleUrls: ['./gestionar-acreedor.component.css']
})
export class GestionarAcreedorComponent implements OnInit {
  //Lista de acreedores
  acreedores:Acreedor[];
  //Lista de estudiantes del departameto
  estudiantes:Persona[];
   //Info Estudiante
   nombreCompleto:string;
   nacionalidad: string;
   direccion: string;
   ci: string;
   celular: string;
   fechaNacimiento: string;
   estadoPersona: boolean;
   carrera:string
   semestre:string
   beca:string;
   estadoConvenio:boolean;
   nombreDepartamento:string;
   fotocopiaCI;
   solicitudWork;
   fechaInicio;
   fechaFinal;
   observacionesRegistroHora:string;
   areas:any[] = [];

  constructor(private _appAcreedorService:AppAcreedorService,
              private _appTipoPersonaService:AppTipoPersonaService) { }

  ngOnInit() {
    this.listaAcreedores();
    this.getEstudiantes();
  }

  listaAcreedores(){
    this._appAcreedorService.getAcreedor().subscribe((acreedores : Acreedor[]) => {this.acreedores = acreedores})
  }

  getEstudiantes(){
    this._appTipoPersonaService.getInfoStudentFinanzas()
    .subscribe((estudiantes : Persona[]) => {this.estudiantes = estudiantes});
  }

  informacionEstudiante(idEstudiante){
    this.areas = [];
    for(let estudiante of this.estudiantes){
      if(estudiante.idPersona == idEstudiante){
        if (estudiante.segundoNombre == null && estudiante.segundoApellido != null ) {
          this.nombreCompleto = estudiante.primerNombre + " " + estudiante.primerApellido + " " + estudiante.segundoApellido;
        } else if (estudiante.segundoNombre == null && estudiante.segundoApellido == null){
          this.nombreCompleto = estudiante.primerNombre + " " + estudiante.primerApellido; 
        }else if (estudiante.segundoNombre != null && estudiante.segundoApellido == null){ 
          this.nombreCompleto = estudiante.primerNombre + " " + estudiante.segundoNombre + " " + estudiante.primerApellido;   
        }else{
          this.nombreCompleto = estudiante.primerNombre + " " + estudiante.segundoNombre + " " + estudiante.primerApellido + " " + estudiante.segundoApellido;
        }
          this.nacionalidad = estudiante.nacionalidad;
          this.direccion = estudiante.direccion;
          this.celular = estudiante.celular;
          this.ci = estudiante.ci;
          this.fechaNacimiento = estudiante.fechaNacimiento;
          this.estadoPersona = estudiante.estadoPersona;
          this.carrera = estudiante.carrera;
          this.semestre = estudiante.semestre;
          this.nombreDepartamento = estudiante.departamento;
          this.beca = estudiante.beca;
          this.estadoConvenio = estudiante.estadoConvenio;
          this.fechaInicio = estudiante.fechaInicio;
          this.fechaFinal = estudiante.fechaFinal;
          this.fotocopiaCI = estudiante.fotocopiaCarnet;
          this.solicitudWork = estudiante.solicitudTrabajo;
          this.areas.push(estudiante.nombreArea);
      }
    }
    // for(let registro of this.informeFinanzas){
    //   if(registro.idPersona == idEstudiante && registro.idRegistroHora == idRegistroHora){
    //     this.observacionesRegistroHora = registro.observacionRegistroHora;
    //   }
    // }
  }

}
