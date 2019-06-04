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
import { Departamento } from '../../interfaces/departamento.interface';
import { AppDepartamentoService } from '../../services/app-departamento.service';
import { Convenio } from 'src/app/interfaces/convenio.interface';


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
  listInformeEstudianteArray:InformeEstudiante[];
  //ALERTS
  titleAlert:string = null;
  messageAlert:string = null;
  activateAlert:boolean = false;
  alertSuccess:Boolean = false;
  alertError:Boolean = false;
  alertWarning:boolean = false;
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
  // aprobar informe estudiante x finanzas
  informeEstudiante:InformeEstudiante = {};
  //save informe finanzas
  informeFinanzas:InformeFinanzas = {};
  //RegisterAcreedor
  acreedor:Acreedor = {};
  //lista de acreedores
  listAcreedores:Acreedor[];
  //opcion para proceder en la acreditacion
  procesoAcreditacion:boolean = false;
  //Para aprobar el informe de Registro Hora por FInanzas
  registroHora:RegistroHora = {};
  //Lista de estudiantes del departameto
  estudiantes:Convenio[];
  //Confirmar Aprobacion
  opcion:string;
  idInformeEstudiante:string;
  idRegistroHora:string;
  idConvenio:string;
  montoBs:string;
  Horas:string; Saldo:string; menosHoras:string = '00:00'; masHoras:string = '00:00';
  //List departament
  departamentos:Departamento[];
  departamento:Departamento = {};
 
  constructor( private _appInformeEstudianteService:AppInformeEstudianteService,
              private _appInformeFinanzasService:AppInformeFinanzasService,
              private _appAcreedorService:AppAcreedorService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appRegistroHora:AppRegistroHoraService,
              private _appDepartamentoService:AppDepartamentoService) { }

  ngOnInit() {
    this.getInfomeEstudiante();
    this.getlistaAcreedores();
    this.getEstudiantes();
    this.getDepartamentos();
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

  calculadoraSaldo(hora, saldo){
    var hour = hora.split(":");
    var auxSaldo = parseFloat(saldo);
    var totalSald;
    
    for (let i = 0; i <= 60; i++) {
      if(hour[1] == i){
        auxSaldo = auxSaldo/60 * i
        break;
      }
    }
    var balance = hour[0] * saldo;
    var saldo1 = parseFloat(balance.toString());
    var saldo2 = parseFloat((auxSaldo.toFixed(2)).toString());
    totalSald = saldo1 + saldo2;    
    return totalSald;
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

  restarHoras(hora1, hora2){
    var horas1=hora1.split(":");
    var horas2=hora2.split(":");
    var horatotale = new Array();
    for(let a=0;a<3;a++){
      horas1[a]=(isNaN(parseInt(horas1[a])))?0:parseInt(horas1[a])
      horas2[a]=(isNaN(parseInt(horas2[a])))?0:parseInt(horas2[a])
      horatotale[a]=(horas1[a]-horas2[a]); // Suma o resta 
    }
    if(horatotale[1] < 0){
      horatotale[0] = horatotale[0] - 1;
      horatotale[1] = 60 + horatotale[1];
    }

    if(horatotale[0] < 10){
      horatotale[0] = "0"+horatotale[0];
    }
    if(horatotale[1] < 10){
      horatotale[1] = "0"+horatotale[1];
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
  //Departamentos get
  getDepartamentos(){
    this._appDepartamentoService.getDepartamentos()
    .subscribe((departamentos : Departamento[]) => {this.departamentos = departamentos})
  }

  //informe Estudiante
  getInfomeEstudiante(){
    this._appInformeEstudianteService.getInformeEstudianteAll()
    .subscribe((informe : InformeEstudiante[]) => {
      this.listInformeEstudiante = informe;
      this.listInformeEstudianteArray = informe;
      this.numStudent = 0;
      this.numHour= '00:00';
      this.totalSaldo = 0;
      this.totalDatos();
    })
  }

  getEstudiantes(){
    this._appTipoPersonaService.getInfoStudentFinanzas()
    .subscribe((estudiantes : Persona[]) => {this.estudiantes = estudiantes});
  }

  buscarInforme(value){
    let array:InformeEstudiante[] = [];
    var name;
    value = value.toLowerCase();
    this.listInformeEstudiante = this.listInformeEstudianteArray;
    for(let informe of this.listInformeEstudiante){
      if (informe.segundoNombre == null && informe.segundoApellido != null ) {
        name = informe.primerApellido + " " + informe.segundoApellido+ " " + informe.primerNombre ;
      } else if (informe.segundoNombre == null && informe.segundoApellido == null){
        name = informe.primerApellido + " " + informe.primerNombre; 
      }else if (informe.segundoNombre != null && informe.segundoApellido == null){ 
        name = informe.primerApellido + " " + informe.primerNombre + " " + informe.segundoNombre;
      }else{
        name = informe.primerApellido + " " + informe.segundoApellido + " " + informe.primerNombre + " " + informe.segundoNombre;
      }
      name = name.toLowerCase();
      if(name.indexOf(value) >= 0){
        array.push(informe);        
      } 
    }
    this.listInformeEstudiante = array;   
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

  registrarInformeFinanzas(idInformeEstudiante:string, opcion){
    this.informeFinanzas.idUsuario = this.IdUsuario;
    this.informeFinanzas.idInformeEstudiante = idInformeEstudiante;
    this._appInformeFinanzasService.postInformeFinanzas(this.informeFinanzas)
    .subscribe((informe : InformeFinanzas []) => {
      if(opcion == '0') {
        this.alert(3, 'Advertencia', 'El informe fue deshaprobado.');
        this.getInfomeEstudiante();
      }
    });
  }

  putInformeEstudianteAprobacion(idEstudiante, opcion){
    this.informeEstudiante.aprobadoFinanzas = opcion;
    this._appInformeEstudianteService.putInformeEstudianteAprobarFinanzas(idEstudiante, this.informeEstudiante)
    .subscribe((informe : InformeEstudiante[]) => {
      //
      
      this.registrarInformeFinanzas(idEstudiante, opcion);
      if(opcion == '1'){
        this.aprobarRegistroHora(this.idRegistroHora, this.opcion);        
      }
    });
  }
  //Registro Hora
  aprobarRegistroHora(idRegistroHora:string, opcion:string){
    this.registroHora.aprobadoFinanzas = opcion;
    this._appRegistroHora.putRegsitroAprobarFinanzas(idRegistroHora, this.registroHora)
    .subscribe((registro : RegistroHora[]) => {
      this.saveAcreedor(this.idInformeEstudiante, this.idConvenio, this.informeFinanzas.totalSaldoF);       
    });
  }
  // Inputs
  inputReducir(){
    this.masHoras = '00:00';
    if(this.menosHoras.length > 4){
      this.informeFinanzas.totalHorasF = this.restarHoras(this.Horas, this.menosHoras);
      this.informeFinanzas.totalSaldoF = this.calculadoraSaldo(this.informeFinanzas.totalHorasF, this.departamento.costoHora);
    }else{
      this.informeFinanzas.totalHorasF = this.Horas;
      this.informeFinanzas.totalSaldoF = this.Saldo;
    }    
  }

  inputIncrementar(){
    this.menosHoras = '00:00';
    if(this.masHoras.length > 4){
      this.informeFinanzas.totalHorasF = this.sumarHoras(this.Horas, this.masHoras);
      this.informeFinanzas.totalSaldoF = this.calculadoraSaldo(this.informeFinanzas.totalHorasF, this.departamento.costoHora);
    }else{
      this.informeFinanzas.totalHorasF = this.Horas;
      this.informeFinanzas.totalSaldoF = this.Saldo;
    } 
  }

  aprobarInformeEstudiante(idDepartamento, idRegistroHora, idInformeEstudiante:string, opcion:string, idConvenio:string, montoBs:string){
    this.idRegistroHora = idRegistroHora;
    this.idInformeEstudiante = idInformeEstudiante;
    this.opcion = opcion;
    this.idConvenio = idConvenio;
    this.montoBs = montoBs;

    for(let departament of this.departamentos){
      if(departament.idDepartamento == idDepartamento){
        // this.departamento.costoHora = departament.costoHora;
        this.departamento.nombreDepartamento = departament.nombreDepartamento;
      }
    }
    for(let informe of this.listInformeEstudiante){
      if(informe.idInformeEstudiante == idInformeEstudiante){
        this.Horas = informe.totalHoras;
        this.informeFinanzas.totalHorasF = informe.totalHoras;
        this.Saldo = informe.totalSaldo + ' Bs.';
        this.informeFinanzas.totalSaldoF = informe.totalSaldo
      }
    }
    this.menosHoras = '00:00';    
    this.masHoras = '00:00'; 
    
    if(this.opcion == '0'){
      this.putInformeEstudianteAprobacion(this.idInformeEstudiante, this.opcion);
    }       
  }

  confirmarAprobarInformeEstudiante(){
    this.putInformeEstudianteAprobacion(this.idInformeEstudiante, this.opcion);
  }

  //GESTIONAR ACREEDOR
  
  getlistaAcreedores(){
    this._appAcreedorService.getListAcredor().subscribe((acreedores : Acreedor[]) => {this.listAcreedores =  acreedores});
  }

  saveAcreedor(idInformeEstudiante:string, idConvenio:string, montoBs:string){
    // this.getlistaAcreedores();
    this.acreedor.idUsuario = this.IdUsuario;
    this.acreedor.idInformeEstudiante = idInformeEstudiante;
    this.acreedor.idConvenio = idConvenio;
    var saldoTotal;
    //verificamos si existe el registro
    for(let acreedor of this.listAcreedores){
      if(acreedor.idConvenio == idConvenio){
        this.procesoAcreditacion = true;
        saldoTotal = parseFloat(acreedor.montoBs) + parseFloat(montoBs);
        this.acreedor.montoBs = saldoTotal.toFixed(2);
        break;
      }else{
        this.procesoAcreditacion = false;
      }
    }
    if(this.procesoAcreditacion == false){      
      this.acreedor.montoBs = montoBs;
      this._appAcreedorService.postAcreedor(this.acreedor)
      .subscribe((acreedor : Acreedor[]) => {
        this.alert(1, 'Registro exitoso', 'El informe fue aprobado y registrado satisfactoriamente.');
        this.getInfomeEstudiante();
      });
    }else{
      this.acreditarSaldo(idConvenio, this.acreedor);
    }  
  }

  acreditarSaldo(idConvenio:string, acreedor:Acreedor){
    this._appAcreedorService.putSaldoAcreedor(idConvenio, acreedor)
    .subscribe((acreedor : Acreedor[]) => {
      this.alert(1, 'Registro exitoso', 'El informe fue aprobado y registrado satisfactoriamente.');
      this.getInfomeEstudiante();
    });
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
