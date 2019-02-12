import { Component, OnInit } from '@angular/core';
import { InformeEstudiante } from '../../interfaces/informe-estudiante.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';

@Component({
  selector: 'app-gestionar-informe-jefe-arhivado',
  templateUrl: './gestionar-informe-jefe-arhivado.component.html',
  styleUrls: ['./gestionar-informe-jefe-arhivado.component.css']
})
export class GestionarInformeJefeArhivadoComponent implements OnInit {

  //Variable global para almacenar el id del departamento
  IdDepartamento:string = "1";
  IdUser:string = "1";
  //Lista de los estudiantes del total horas/saldos
  listInformeEstudiante:InformeEstudiante[];
  //Info Estudiante
  nombreCompleto:string;
  nacionalidad: string;
  direccion: string;
  ci: string;
  celular: string;
  nombreDepartamento:string;
  fechaNacimiento: string;
  estadoPersona: boolean;
  carrera:string
  semestre:string
  beca:string;
  estadoConvenio:boolean;
  fotocopiaCI;
  solicitudWork;
  fechaInicio;
  fechaFinal;
  observacionesRegistroHora:string;
  areas:any[] = [];
  //
  informeEstudiante:InformeEstudiante = {};
  //messagge
  MessageSuccessArchivar:boolean = false;
  //Lista de estudiantes del departameto
  estudiantes:Persona[];

  constructor(private _appInformeEstudianteService:AppInformeEstudianteService,
              private _appTipoPersonaService:AppTipoPersonaService,) { }
  ngOnInit() {
    this.getInfomeEstudiante(this.IdDepartamento);
    this.getEstudiantes(this.IdDepartamento);
  }

  //gestionar informe estudiante
  //informe Estudiante horas and balance
  getInfomeEstudiante(idDepartamento:string){
    this._appInformeEstudianteService.getInformeArchivado(idDepartamento)
    .subscribe((informe : InformeEstudiante[]) => {this.listInformeEstudiante = informe})
    setTimeout(() => {
      console.log(this.listInformeEstudiante);
    }, 2000);
  }
  getEstudiantes(idDepartamento:string){
    this._appTipoPersonaService.getInfoEstudiantes(idDepartamento)
    .subscribe((estudiantes : Persona[]) => {this.estudiantes = estudiantes});
  }

  informacionEstudiante(idRegistroHora, idEstudiante){
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
    for(let registro of this.listInformeEstudiante){
      if(registro.idPersona == idEstudiante && registro.idRegistroHora == idRegistroHora){
        this.observacionesRegistroHora = registro.observacionRegistroHora;
      }
    }
  }

  archivarInforme(idInformeEstudiante){
    this.informeEstudiante.archivar = "NO";
    this._appInformeEstudianteService.putInformeArchivar(idInformeEstudiante, this.informeEstudiante)
    .subscribe((informe : InformeEstudiante[]) => {console.log(informe)});
    this.MessageSuccessArchivar = true;
    setTimeout(() => {
      this.getInfomeEstudiante(this.IdDepartamento);
    }, 2000);
    setTimeout(() => {
      this.MessageSuccessArchivar=false;
    }, 6000);
  }

}
