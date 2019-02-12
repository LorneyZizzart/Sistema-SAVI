import { Component, OnInit } from '@angular/core';
import { InformeFinanzas } from '../../interfaces/informe-finanzas.interface';
import { AppInformeFinanzasService } from '../../services/app-informe-finanzas.service';
import { InformeEstudiante } from '../../interfaces/informe-estudiante.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';

@Component({
  selector: 'app-gestionar-informe-finanzas-aprobado',
  templateUrl: './gestionar-informe-finanzas-aprobado.component.html',
  styleUrls: ['./gestionar-informe-finanzas-aprobado.component.css']
})
export class GestionarInformeFinanzasAprobadoComponent implements OnInit {

  //iDUSUARIO
  IdUsuario:string = "4";
  informeFinanzas:InformeFinanzas[];
   //FOOTER
   numStudent:number = 0;
   numHour:any = '00:00';
   totalSaldo:any = 0;
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
  observacionesRegistroHora
  areas:any[] = [];
  // aprobar informe estudiante x finanzas
  informeEstudiante:InformeEstudiante = {};
  //messagge aprobacion and not 
  MessageInformeNoAprobado:boolean=false;
  MessageInformeAprobado:boolean=false;
  //para archivar
  informesFinanzas:InformeFinanzas = {};
  //messsage de archivar
  MessageInformeArchivado:boolean = false;
  //Lista de estudiantes del departameto
  estudiantes:Persona[];

  constructor( private _appInformeEstudianteService:AppInformeEstudianteService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appInformeFinanzasService:AppInformeFinanzasService) { }

  ngOnInit() {
    this.getInformFinanzas();
    this.getEstudiantes();
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
    for(let registro of this.informeFinanzas){
      this.numStudent++;
      this.numHour = this.sumarHoras(this.numHour, registro.totalHoras);
      this.totalSaldo = parseFloat(this.totalSaldo) + parseFloat(registro.totalSaldo);
      this.totalSaldo = this.totalSaldo.toFixed(2);
    }
  }

  getInformFinanzas(){
    this._appInformeFinanzasService.getInformesFinanzas()
    .subscribe((informe : InformeFinanzas[]) => {this.informeFinanzas = informe})
    setTimeout(() => {
      console.log(this.informeFinanzas);
      this.numStudent = 0;
      this.numHour= '00:00';
      this.totalSaldo = 0;
      this.totalDatos();
    }, 2000);
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

  eliminarInformeFinanzas(idInformeEstudiante:string){
    this._appInformeFinanzasService.deleteInformeFinanzas(idInformeEstudiante)
    .subscribe((data: InformeFinanzas[]) => {console.log(data)});
    
  }

  aprobarInformeEstudiante(idInformeEstudiante:string, opcion:string){
    this.informeEstudiante.aprobadoFinanzas = opcion;
    this._appInformeEstudianteService.putInformeEstudianteAprobarFinanzas(idInformeEstudiante, this.informeEstudiante)
    .subscribe((informe : InformeEstudiante[]) => {console.log(informe)});

    if(opcion == '0'){
      this.MessageInformeNoAprobado=true;
      setTimeout(() => {
        this.MessageInformeNoAprobado=false;
      }, 6000);
    }else if(opcion == '1'){
      this.MessageInformeAprobado=true;
      setTimeout(() => {
        this.MessageInformeAprobado=false;
      }, 6000);
    }

    setTimeout(() => {
      this.getInformFinanzas();
    }, 2000);
  }

  archivarInformeFinanzas(idInformeFinanzas:string){
    this.informesFinanzas.archivar = "SI";
    this._appInformeFinanzasService.putInformeFinanzasArchivar(idInformeFinanzas, this.informesFinanzas)
    .subscribe((informe : InformeFinanzas[]) => {console.log(informe)});
    this.MessageInformeArchivado = true;
    setTimeout(() => {
    this.MessageInformeArchivado = false;      
    }, 6000);
    setTimeout(() => {
      this.getInformFinanzas();
    }, 2000);
  }

}
