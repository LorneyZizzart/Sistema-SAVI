import { Component, OnInit } from '@angular/core';
import { InformeEstudiante } from '../../interfaces/informe-estudiante.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';
import { InformeFinanzas } from '../../interfaces/informe-finanzas.interface';
import { AppInformeFinanzasService } from '../../services/app-informe-finanzas.service';
import { AppAcreedorService } from '../../services/app-acreedor.service';
import { Acreedor } from '../../interfaces/acreedor.interface';
import { AppRegistroHoraService } from '../../services/app-registroHora.service';
import { RegistroHora } from '../../interfaces/registroHora.interface';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';

@Component({
  selector: 'app-gestionar-informe-finanzas',
  templateUrl: './gestionar-informe-finanzas.component.html',
  styleUrls: ['./gestionar-informe-finanzas.component.css']
})
export class GestionarInformeFinanzasComponent implements OnInit {
  //iDUSUARIO
  IdUsuario:string = "4";
  //FOOTER
  numStudent:number = 0;
  numHour:any = '00:00';
  totalSaldo:any = 0;
  //Lista de los estudiantes del total horas/saldos
  listInformeEstudiante:InformeEstudiante[];
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
  estadoConvenio:boolean;
  nombreDepartamento:string;
  fotocopiaCI;
  solicitudWork;
  fechaInicio;
  fechaFinal;
  observacionesRegistroHora:string;
  areas:any[] = [];
  // aprobar informe estudiante x finanzas
  informeEstudiante:InformeEstudiante = {};
  //save informe finanzas
  informeFinanzas:InformeFinanzas = {};
  //messagge aprobacion and not 
  MessageInformeAprobado:boolean=false;
  MessageInformeNoAprobado:boolean=false;
  //RegisterAcreedor
  acreedor:Acreedor = {};
  //messagge acreditacion
  MessageAcreditado:boolean = false;
  //lista de acreedores
  listAcreedores:Acreedor[];
  //opcion para proceder en la acreditacion
  procesoAcreditacion:boolean = false;
  //Para aprobar el informe de Registro Hora por FInanzas
  registroHora:RegistroHora = {};
  //Lista de estudiantes del departameto
  estudiantes:Persona[];
  //Confirmar Aprobacion
  opcion:string;
  idInformeEstudiante:string;
  idRegistroHora:string;
  idConvenio:string;
  montoBs:string;
 
  constructor( private _appInformeEstudianteService:AppInformeEstudianteService,
              private _appInformeFinanzasService:AppInformeFinanzasService,
              private _appAcreedorService:AppAcreedorService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appRegistroHora:AppRegistroHoraService) { }

  ngOnInit() {
    this.getInfomeEstudiante();
    this.getlistaAcreedores();
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
    for(let registro of this.listInformeEstudiante){
      this.numStudent++;
      this.numHour = this.sumarHoras(this.numHour, registro.totalHoras);
      this.totalSaldo = parseFloat(this.totalSaldo) + parseFloat(registro.totalSaldo);
      this.totalSaldo = this.totalSaldo.toFixed(2);
    }
  }

  //informe Estudiante
  getInfomeEstudiante(){
    this._appInformeEstudianteService.getInformeEstudianteAll()
    .subscribe((informe : InformeEstudiante[]) => {this.listInformeEstudiante = informe})
    setTimeout(() => {
      this.numStudent = 0;
      this.numHour= '00:00';
      this.totalSaldo = 0;
      this.totalDatos();
    }, 3000);
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
          this.nombreCompleto = estudiante.primerApellido + " " + estudiante.segundoApellido+ " " + estudiante.primerNombre ;
        } else if (estudiante.segundoNombre == null && estudiante.segundoApellido == null){
          this.nombreCompleto = estudiante.primerApellido + " " + estudiante.primerNombre; 
        }else if (estudiante.segundoNombre != null && estudiante.segundoApellido == null){ 
          this.nombreCompleto = estudiante.primerApellido + " " + estudiante.primerNombre + " " + estudiante.segundoNombre;
        }else{
          this.nombreCompleto = estudiante.primerApellido + " " + estudiante.segundoApellido + " " + estudiante.primerNombre + " " + estudiante.segundoNombre;
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
      for(let registro of this.listInformeEstudiante){
        if(registro.idPersona == idEstudiante && registro.idRegistroHora == idRegistroHora){
          this.observacionesRegistroHora = registro.observacionRegistroHora;
        }
      }
  }

  registrarInformeFinanzas(idInformeEstudiante:string){
    this.informeFinanzas.idUsuario = this.IdUsuario;
    this.informeFinanzas.idInformeEstudiante = idInformeEstudiante;
    this._appInformeFinanzasService.postInformeFinanzas(this.informeFinanzas)
    .subscribe((informe : InformeFinanzas []) => {console.log(informe)});
    this.MessageInformeAprobado=true;
    setTimeout(() => {
      this.MessageInformeAprobado=false;
    }, 6000);
  }

  aprobarRegistroHora(idRegistroHora:string, opcion:string){
    this.registroHora.aprobadoFinanzas = opcion;
    this._appRegistroHora.putRegsitroAprobarFinanzas(idRegistroHora, this.registroHora)
    .subscribe((registro : RegistroHora[]) => {console.log(registro)});
  }

  aprobarInformeEstudiante(idRegistroHora, idInformeEstudiante:string, opcion:string, idConvenio:string, montoBs:string){

    this.idRegistroHora = idRegistroHora;
    this.idInformeEstudiante = idInformeEstudiante;
    this.opcion = opcion;
    this.idConvenio = idConvenio;
    this.montoBs = montoBs;
  }

  confirmarAprobarInformeEstudiante(){
    this.informeEstudiante.aprobadoFinanzas = this.opcion;
    this._appInformeEstudianteService.putInformeEstudianteAprobarFinanzas(this.idInformeEstudiante, this.informeEstudiante)
    .subscribe((informe : InformeEstudiante[]) => {console.log(informe)});

    if(this.opcion == '0'){
      this.MessageInformeNoAprobado=true;
      setTimeout(() => {
        this.MessageInformeNoAprobado=false;
      }, 6000);
    }
    if(this.opcion == '1'){
      setTimeout(() => {
      this.aprobarRegistroHora(this.idRegistroHora, this.opcion);
      this.registrarInformeFinanzas(this.idInformeEstudiante);
      this.saveAcreedor(this.idInformeEstudiante, this.idConvenio, this.montoBs);
      }, 1000);
    }

    setTimeout(() => {
      this.getInfomeEstudiante();
    }, 2000);
  }

  //GESTIONAR ACREEDOR
  
  getlistaAcreedores(){
    this._appAcreedorService.getListAcredor().subscribe((acreedores : Acreedor[]) => {this.listAcreedores =  acreedores});
  }

  saveAcreedor(idInformeEstudiante:string, idConvenio:string, montoBs:string){
    this.acreedor.idUsuario = this.IdUsuario;
    this.acreedor.idInformeEstudiante = idInformeEstudiante;
    this.acreedor.idConvenio = idConvenio;
    var saldoTotal;
    //verificamos si existe el registro
    for(let acreedor of this.listAcreedores){
      if(acreedor.idConvenio == idConvenio){
        this.procesoAcreditacion = true;
        saldoTotal = parseFloat(acreedor.montoBs) + parseFloat(montoBs);
        this.acreedor.montoBs = saldoTotal;
        break;
      }else{
        this.procesoAcreditacion = false;
      }
    }
    
    if(this.procesoAcreditacion == false){      
      this.acreedor.montoBs = montoBs;
      this._appAcreedorService.postAcreedor(this.acreedor)
      .subscribe((acreedor : Acreedor[]) => {console.log(acreedor)});
      this.MessageAcreditado=true;
      console.log("acreedor:" , this.acreedor);
      setTimeout(() => {
        this.MessageAcreditado=false;
      }, 6000);
      setTimeout(() => {
        this.getInfomeEstudiante();
      }, 1000);
    }else{
      this.acreditarSaldo(idConvenio, this.acreedor);
    }
  }

  acreditarSaldo(idConvenio:string, acreedor:Acreedor){
    console.log("acreedor: ",this.acreedor);
    this._appAcreedorService.putSaldoAcreedor(idConvenio, acreedor)
    .subscribe((acreedor : Acreedor[]) => {console.log(acreedor)});
  }

  deleteAcreedor(idInformeFinanzas:string){
    this._appAcreedorService.deleteAcreedor(idInformeFinanzas)
    .subscribe((acreedor : Acreedor[]) => {console.log(acreedor)});
    // this.MessageNoAcreditado=true;
    setTimeout(() => {
      // this.MessageNoAcreditado=false;
    }, 6000);
    setTimeout(() => {
      this.getInfomeEstudiante();
    }, 1000);
  }
 

}
