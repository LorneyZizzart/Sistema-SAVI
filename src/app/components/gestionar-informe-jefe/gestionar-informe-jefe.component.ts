import { Component, OnInit } from '@angular/core';
import { AppDepartamentoService } from '../../services/app-departamento.service';
import { Departamento } from '../../interfaces/departamento.interface';
import { InformeEstudiante } from '../../interfaces/informe-estudiante.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';
import { Convenio } from 'src/app/interfaces/convenio.interface';
import { Organizacion } from 'src/app/interfaces/organizacion.interface';

@Component({
  selector: 'app-gestionar-informe-jefe',
  templateUrl: './gestionar-informe-jefe.component.html',
  styleUrls: ['./gestionar-informe-jefe.component.css']
})
export class GestionarInformeJefeComponent implements OnInit {
  //Variable global para almacenar el id del departamento
  IdDepartamento:string = "1";
  IdUser:string = "1";
  //FOOTER
  numStudent:number = 0;
  numHour:any = '00:00';
  totalSaldo:any = 0;
  //info del departamento
  departamento:Departamento [];
  //Info del Departamento
  idRegistro:string;
  codigoDepartamento:string;
  nombreJefe:string;
  estadoDepartamento;
  fechaRegistroHistorialDep:string;
  limiteEstudiante:string;
  nombreDepartamento:string;
  cantidadEstudiantes:string = "3"; //falta aun sumar and restar
  cupos:string = "5"; //falta aun sumar and restar
  costoHora:string;
  //Lista de los estudiantes del total horas/saldos
  listInformeEstudiante:InformeEstudiante[];
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
  estadoConvenio:string;
  fotocopiaCI;
  solicitudWork;
  fechaInicio;
  fechaFinal;
  observacionesRegistroHora:string;
  areas:any[] = [];
  //
  informeEstudiante:InformeEstudiante = {};
  //message
  MessageSuccessArchivar:boolean = false;
  //Lista de estudiantes del departameto
  estudiantes:Convenio[];

  constructor(private _appDepartamentoService:AppDepartamentoService,
    private _appTipoPersonaService:AppTipoPersonaService,
    private _appInformeEstudianteService:AppInformeEstudianteService) { }

  ngOnInit() {
    this.getDepartament(this.IdDepartamento);
    this.getInfomeEstudiante(this.IdDepartamento);
    setTimeout(() => {
      this.getEstudiantes(this.IdDepartamento);
    }, 1000);
  }

  sumarHoras(hora1, hora2) {
    var horas1=hora1.split(":");
    var horas2=hora2.split(":");
    var horatotale = new Array();
    for(let a=0;a<3;a++){
    horas1[a]=(isNaN(parseInt(horas1[a])))?0:parseInt(horas1[a])
    horas2[a]=(isNaN(parseInt(horas2[a])))?0:parseInt(horas2[a])
    horatotale[a]=(horas1[a]+horas2[a]); // Suma o resta 
    }
    if(horatotale[1] > 60){
      horatotale[1] = horatotale[1] - 60;
      horatotale[0] = horatotale[0] + 1;
    }
    return horatotale[0]+":"+horatotale[1];
  }

  totalDatos(){
    for(let registro of this.listInformeEstudiante){
      this.numStudent++;
      this.numHour = this.sumarHoras(this.numHour, registro.totalHoras);
      this.totalSaldo = parseFloat(this.totalSaldo) + parseFloat(registro.totalSaldo);
      this.totalSaldo = this.totalSaldo.toFixed(2);
    }
  }

  //PARA OBTENER LOS DATOS DEL DEPARTAMENTO LUEGO SE PARA AL METODO infoDepartamento
  getDepartament(idDepartamento:string){
    this._appDepartamentoService.getDepartamento(idDepartamento)
    .subscribe((departamento : Departamento[]) => {this.departamento = departamento});
    setTimeout(() => {
      this.infoDepartamento(idDepartamento);
    }, 2000);
  }

  infoDepartamento(idDepartamento:string){
    for(let departamento of this.departamento){
      if(departamento.idDepartamento == idDepartamento){
        if (departamento.segundoNombre == null && departamento.segundoApellido != null ) {
          this.nombreJefe = departamento.primerNombre + " " + departamento.primerApellido + " " + departamento.segundoApellido;
        } else if (departamento.segundoNombre == null && departamento.segundoApellido == null){
          this.nombreJefe = departamento.primerNombre + " " + departamento.primerApellido; 
        }else if (departamento.segundoNombre != null && departamento.segundoApellido == null){ 
          this.nombreJefe = departamento.primerNombre + " " + departamento.segundoNombre + " " + departamento.primerApellido;   
        }else{
          this.nombreJefe = departamento.primerNombre + " " + departamento.segundoNombre + " " + departamento.primerApellido + " " + departamento.segundoApellido;
        }
          this.codigoDepartamento = departamento.idDepartamento;
          this.nombreDepartamento = departamento.nombreDepartamento;
          this.estadoDepartamento = departamento.estadoDepartamento;
          this.fechaRegistroHistorialDep = departamento.fechaRegistroHistorialDepartamento;
          this.limiteEstudiante = departamento.limiteEstudiante;
          this.costoHora = departamento.costoHora;
      }
    }
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
  //gestionar informe estudiante
  //informe Estudiante horas and balance
  getInfomeEstudiante(idDepartamento:string){
    this._appInformeEstudianteService.getInformeEstudiante(idDepartamento)
    .subscribe((informe : InformeEstudiante[]) => {this.listInformeEstudiante = informe})
    setTimeout(() => {
      this.numStudent = 0;
      this.numHour= '00:00';
      this.totalSaldo = 0;
      this.totalDatos();
    }, 2000);
  }

  archivarInforme(idInformeEstudiante:string){
    this.informeEstudiante.archivar = "SI";
    this._appInformeEstudianteService.putInformeArchivar(idInformeEstudiante, this.informeEstudiante)
    .subscribe((informe : InformeEstudiante[]) => {console.log(informe)});
    this.MessageSuccessArchivar = true;
    setTimeout(() => {
      this.getInfomeEstudiante(this.IdDepartamento);
    }, 2000);

    setTimeout(() => {
      this.MessageSuccessArchivar = false;
    }, 6000);
  }

}
