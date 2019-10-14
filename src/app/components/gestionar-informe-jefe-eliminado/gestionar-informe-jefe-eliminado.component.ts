import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';
import { InformeEstudiante } from 'src/app/interfaces/informe-estudiante.interface';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';
import { Convenio } from 'src/app/interfaces/convenio.interface';
import { AppAreaService } from '../../services/app-area.service';
import { Area } from 'src/app/interfaces/area.interface';

@Component({
  selector: 'app-gestionar-informe-jefe-eliminado',
  templateUrl: './gestionar-informe-jefe-eliminado.component.html',
  styleUrls: ['./gestionar-informe-jefe-eliminado.component.css']
})
export class GestionarInformeJefeEliminadoComponent implements OnInit {
  
  IdDepartamento:string = "0";
  auxDepartamento:Departamento;
   //Lista de los estudiantes del total horas/saldos
   listInformeEstudiante:InformeEstudiante[];
   //Info Estudiante
  codEstudiante:string;
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
  estadoConvenio:string;
  fotocopiaCI;
  solicitudWork;
  fechaInicio;
  fechaFinal;
  observacionesRegistroHora:string;
  areas:any[] = [];
  //Lista de estudiantes del departameto
   estudiantes:Convenio[];

  constructor(private _appInformeEstudianteService:AppInformeEstudianteService,
              private _authService : AuthService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appAreaService:AppAreaService) { }

  ngOnInit() {
    this.getDepartamentoUser();
    this.getInformeEliminado();
  }

  getDepartamentoUser(){
    this.auxDepartamento =  this._authService.getDatosDepartamento();  
    this.IdDepartamento = this.auxDepartamento[0].idDepartamento;
  }

  getInformeEliminado(){
    this._appInformeEstudianteService.getInformeEliminado(this.IdDepartamento)
    .subscribe((data:InformeEstudiante[]) => {
      this.listInformeEstudiante = data;
    })
  }

  informacionEstudiante(idRegistroHora, idEstudiante){
    this.areas = [];

    this._appTipoPersonaService.getInfoEstudiantes(this.IdDepartamento , idEstudiante)
    .subscribe((estudiantes : Persona[]) => {
      this.estudiantes = estudiantes;
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
            this.codEstudiante = estudiante.codEstudiante;
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
            this._appAreaService.getAsignacionByConvenio(estudiante.idConvenio)
              .subscribe((data: Area[]) => {
                if(data.length > 0){
                  for(let a of data){
                    this.areas.push(a.nombreArea);
                  }
                }
              });
        }
      }
    });

    for(let registro of this.listInformeEstudiante){
      if(registro.idPersona == idEstudiante && registro.idRegistroHora == idRegistroHora){
        this.observacionesRegistroHora = registro.observacionRegistroHora;
      }
    }
  }

}
