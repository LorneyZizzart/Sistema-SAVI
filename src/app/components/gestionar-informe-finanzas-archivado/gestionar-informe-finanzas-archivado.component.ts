import { Component, OnInit } from '@angular/core';
import { InformeFinanzas } from '../../interfaces/informe-finanzas.interface';
import { AppInformeFinanzasService } from '../../services/app-informe-finanzas.service';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';
import { Convenio } from 'src/app/interfaces/convenio.interface';

@Component({
  selector: 'app-gestionar-informe-finanzas-archivado',
  templateUrl: './gestionar-informe-finanzas-archivado.component.html',
  styleUrls: ['./gestionar-informe-finanzas-archivado.component.css']
})
export class GestionarInformeFinanzasArchivadoComponent implements OnInit {
  //iDUSUARIO
  IdUsuario:string = "4";
  informeFinanzas:InformeFinanzas[];
  //para archivar
  informesFinanzas:InformeFinanzas = {};
  //Info Estudiante
  codEstudiante:string;
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
  nombreDepartamento:string;
  fotocopiaCI;
  solicitudWork;
  fechaInicio;
  fechaFinal;
  observacionesRegistroHora:string;
  areas:any[] = [];
  //Lista de estudiantes del departameto
  estudiantes:Convenio[];
   //ALERTS
   titleAlert:string = null;
   messageAlert:string = null;
   activateAlert:boolean = false;
   alertSuccess:Boolean = false;
   alertError:Boolean = false;
   alertWarning:boolean = false;

  constructor(private _appInformeFinanzasService:AppInformeFinanzasService,
              private _appTipoPersonaService:AppTipoPersonaService) { }

  ngOnInit() {
    this.getInformFinanzas();
    this.getEstudiantes();
  }

  alert(opcion:number, title:string, message:string):void{
    if(opcion == 1) this.alertSuccess = true;
    if(opcion == 2) this.alertError = true;      
    if(opcion == 3) this.alertWarning = true;      
    this.titleAlert = title;
    this.messageAlert = message;
    this.activateAlert = true;
    setTimeout(() => {
      this.activateAlert = false;
      this.alertSuccess = false;
      this.alertError = false;
      this.alertWarning = false;
    }, 5000);
  }

  getInformFinanzas(){
    this._appInformeFinanzasService.getInformesFinanzasArchivadas()
    .subscribe((informe : InformeFinanzas[]) => {
      this.informeFinanzas = informe
      console.log(this.informeFinanzas);
    })
  }

  archivarInformeFinanzas(idInformeFinanzas:string){
    this.informesFinanzas.archivar = "NO";
    this._appInformeFinanzasService.putInformeFinanzasArchivar(idInformeFinanzas, this.informesFinanzas)
    .subscribe((informe : InformeFinanzas[]) => {
      this.alert(1, 'Registro exitoso', 'El informe fue desarchivado.');
      this.getInformFinanzas();
    }, res => {
      this.alert(2, 'Error al archivar', 'Se ha producido un error en el servidor.');
    });
  }

  getEstudiantes(){
    this._appTipoPersonaService.getInfoStudentFinanzas()
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
          this.areas.push(estudiante.nombreArea);
      }
    }
    for(let registro of this.informeFinanzas){
      if(registro.idPersona == idEstudiante && registro.idRegistroHora == idRegistroHora){
        this.observacionesRegistroHora = registro.observacionRegistroHora;
      }
    }
  }

}
