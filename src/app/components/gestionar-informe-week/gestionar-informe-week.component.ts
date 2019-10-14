import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppDepartamentoService } from '../../services/app-departamento.service';
import { Departamento } from '../../interfaces/departamento.interface';
import { AppRegistroHoraService } from '../../services/app-registroHora.service';
import { RegistroHora } from '../../interfaces/registroHora.interface';
import { InformeEstudiante } from '../../interfaces/informe-estudiante.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';
import { Convenio } from 'src/app/interfaces/convenio.interface';
import { AppAreaService } from '../../services/app-area.service';
import { Area } from 'src/app/interfaces/area.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-gestionar-informe-week',
  templateUrl: './gestionar-informe-week.component.html',
  styleUrls: ['./gestionar-informe-week.component.css']
})
export class GestionarInformeWeekComponent implements OnInit {

  //Variable global para almacenar el id del departamento
  IdDepartamento:string = "0";
  IdUser:string = "1";
  fechaAnterior:any;
  fechaPosterior:any;
  //ALERTS
  titleAlert:string = null;
  messageAlert:string = null;
  activateAlert:boolean = false;
  alertSuccess:Boolean = false;
  alertError:Boolean = false;
  alertWarning:boolean = false;
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
  //info del departamento
  departamento:Departamento [];
  auxDepartamento:Departamento;
  //Registro de week
  informesRegistrosWeek:RegistroHora[];
  //FOOTER
  numStudent:number = 0;
  numHour:any = '00:00';
  totalSaldo:any = 0;
  //list of hours the students
  listHours:any[] = ['00:00'];
  listSaldo:any[] = ['0'];
  //Objeto para registrar asistencia del estudiante
  registro:RegistroHora = {};
  //Message de save InformeJefe
  messageInformeSave:boolean = false;
  //save informeEstudiante
  informeEstudiante:InformeEstudiante = {};
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
  fotocopiaCI;
  solicitudWork;
  fechaInicio;
  fechaFinal;
  observacionesRegistroHora:string;
  areas:any[] = [];
  //Lista de estudiantes del departameto
  estudiantes:Convenio[];
  //title de observacion
  titleObservation:string;
  btnConfirmacion:string;
  //Confirmacion
  idRegistroHora:string;
  fecha:string;
  

  constructor(private _appDepartamentoService:AppDepartamentoService,
              private _appRegistroHoraService:AppRegistroHoraService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appInformeEstudianteService:AppInformeEstudianteService,
              private _appAreaService:AppAreaService,
              private _authService : AuthService,) { }

  ngOnInit() {
    this.fechaPosterior = new Date();
    this.fechaPosterior = new Date(this.fechaPosterior.getTime() - 24*60*60*1000)
    this.starWeek();
    this.getDepartamentoUser();
    this.getDepartament(this.IdDepartamento);
    this.getInformeRegisterWeek(this.IdDepartamento);
  }
  
  //resetear el FORMULARIO no estamos usando
  resetForm(formulario: NgForm) {
    formulario.reset({
    });
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

  getDepartamentoUser(){
    this.auxDepartamento =  this._authService.getDatosDepartamento();    
    this.IdDepartamento = this.auxDepartamento[0].idDepartamento;
  }

  starWeek(){
    var fecha=new Date();
    var haceUnaSemana=new Date(fecha.getTime() - (24*60*60*1000)*7);
    var dd = haceUnaSemana.getDate();
    var mm = haceUnaSemana.getMonth() + 1;
    var yyy = haceUnaSemana.getFullYear();
    var dia = dd.toString();
    var mes = mm.toString();
    if (dd < 10) { dia = '0' + dd; }
    if (mm < 10) { mes = '0' + mm; }
    this.fechaAnterior = dia+"/"+mes+"/"+yyy;
  }

  calculadoraSaldo(hora, saldo){
    var hour = parseInt(hora.substr(0,2));
    var min = parseInt(hora.substr(3,2));
    var auxSaldo = parseInt(saldo);
    var totalSald;

    for (let i = 0; i <= 60; i++) {
      if(min == i){
        auxSaldo = auxSaldo/60 * i
      }
    }
    ;
    var balance = hour * saldo;
    var saldo1 = parseFloat(balance.toString());
    var saldo2 = parseFloat((auxSaldo.toFixed(2)).toString());
    totalSald = saldo1 + saldo2;

    return totalSald;
  }

  horasTranscurrido(day1, hora1, day2, hora2){
    var inicioMinutos = parseInt(hora1.substr(3,2));
    var inicioHoras = parseInt(hora1.substr(0,2));
    var finMinutos = parseInt(hora2.substr(3,2));
    var finHoras = parseInt(hora2.substr(0,2));
    var horastotal;
    
    var transcurridoMinutos;

    if(day1 < day2){
      var hora = inicioHoras - 24;
      horastotal = (-hora) + finHoras;      
    }else if (day1 == day2){
      horastotal = finHoras - inicioHoras;
    }

    if(inicioMinutos > finMinutos){
      transcurridoMinutos = inicioMinutos - finMinutos;
    }else{
      transcurridoMinutos = finMinutos - inicioMinutos; 
    }

    var transcurridoHoras = horastotal; 
    var horas = transcurridoHoras.toString();
    var minutos = transcurridoMinutos.toString();

    if (horas.length < 2) {
      horas = "0"+horas;
    }
    
    if (minutos.length < 2) {
      minutos = "0"+minutos;
    }
    return horas+":"+minutos;  

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
    var horatotal=new Date()
    horatotal.setHours(horatotale[0]);
    horatotal.setMinutes(horatotale[1]);
    horatotal.setSeconds(horatotale[2]);
    var hour = horatotal.getHours();
    var min = horatotal.getMinutes();
    
    if (hour < 10 && min < 10){
      return "0"+hour+":"+"0"+min;
    }else if (hour < 10 && min >= 10){
      return "0"+hour+":"+min;
    }else if (hour >= 10 && min < 10){
      return hour+":"+"0"+min;
    }else if (hour >= 10 && min >= 10){
      return hour+":"+min;
    }
  }

  sumarHorasTotal(hora1, hora2) {
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
    if(horatotale[0] < 10){
      horatotale[0] = "0"+horatotale[0];
    }
    if(horatotale[1] < 10){
      horatotale[1] = "0"+horatotale[1];
    }
    return horatotale[0]+":"+horatotale[1];
  }

  totalDatos(){
    var horaInicio, horaFinal, auxHE, auxME, auxHS, auxMS, processHours = null;
    var numMoney;
    for(let registro of this.informesRegistrosWeek){
      this.numStudent++;
      if(registro.horaSalida != null){
        if(registro.horaEntrada >= '0' && registro.horaEntrada < '10'){
          auxHE = "0" + registro.horaEntrada.toString();
        }
        else{auxHE = registro.horaEntrada.toString();}
        if(registro.minutoEntrada >= '0' && registro.minutoEntrada < '10'){
          auxME = "0" + registro.minutoEntrada.toString();
        }else{auxME = registro.minutoEntrada.toString();}
        horaInicio = auxHE + ":" + auxME;
        if(registro.horaSalida >= '0' && registro.horaSalida < '10'){
          auxHS = "0" + registro.horaSalida;
        }else{auxHS = registro.horaSalida;}
        if(registro.minutoSalida >= '0' && registro.minutoSalida < '10'){
          auxMS = "0" + registro.minutoSalida;
        }else{auxMS = registro.minutoSalida;}
        horaFinal = auxHS + ":" + auxMS;
        processHours = this.horasTranscurrido(registro.dayEntrada, horaInicio, registro.daySalida, horaFinal);
        this.numHour = this.sumarHorasTotal(this.numHour, processHours);
        numMoney = this.calculadoraSaldo(processHours, this.costoHora);
        this.totalSaldo = numMoney + this.totalSaldo;
        this.listSaldo.push(numMoney);
        this.listHours.push(processHours);
      }else{
        this.listSaldo.push('0');
        this.listHours.push('00:00');
      }
    }
    this.totalSaldo = this.totalSaldo.toFixed(2);
  }

  //PARA OBTENER LOS DATOS DEL DEPARTAMENTO LUEGO SE PARA AL METODO infoDepartamento
  getDepartament(idDepartamento:string){
    this._appDepartamentoService.getDepartamento(idDepartamento)
    .subscribe((departamento : Departamento[]) => {
      this.departamento = departamento;
      this.infoDepartamento(idDepartamento);
    });
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
  
    
  informacionEstudiante(idRegistroHora, idEstudiante){

    this.areas = [];

    this._appTipoPersonaService.getInfoEstudiantes(this.IdDepartamento, idEstudiante)
    .subscribe((estudiantes : Persona[]) => {
      this.estudiantes = estudiantes;
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

    
    for(let registro of this.informesRegistrosWeek){
      if(registro.idPersona == idEstudiante && registro.idRegistroHora == idRegistroHora){
        this.observacionesRegistroHora = registro.observacionRegistroHora;
      }
    }
  }
  
  getInformeRegisterWeek(idDepartamento:string){
    this._appRegistroHoraService.getInformeRegisterWeek(idDepartamento)
    .subscribe((registro : RegistroHora[]) => {
      this.informesRegistrosWeek = registro;
      this.listHours = ['00:00'];
      this.listSaldo= ['0'];
      this.numStudent = 0;
      this.numHour= '00:00';
      this.totalSaldo = 0;
      this.totalDatos(); 
    });
  }

  registrarAprobacion(idRegistro:string, aprobado:string, fecha:string, idRegistroHora:string){
    this.idRegistro = idRegistro;
    this.fecha = fecha;
    this.idRegistroHora = idRegistroHora;
    this.registro.aprobadoRegistroHora = aprobado;
    this.btnConfirmacion = 'aprovacion';
    if(aprobado == '1'){
      this.titleObservation = 'Argumentos de aprovación';
    }else{
      this.titleObservation = 'Argumentos de desaprovación';      
    }
  }

  confirmarAprovacion(){
    this._appRegistroHoraService.putRegsitroAprovacion(this.idRegistro, this.registro)
    .subscribe((data : RegistroHora[]) => {
      
      if(this.registro.aprobadoRegistroHora == '1'){
        this.alert(1, 'Registro aprobado', 'El registro fue aprobado satisfactoriamente.');
        this.saveInformeEstudiante(this.idRegistro);      
      }else{
          this.alert(3, 'Registro desaprobado', 'El registro fue desaprobado satisfactoriamente.');
          this.eliminarInformeEstudiante(this.fecha, this.idRegistroHora);     
      }
      this.getInformeRegisterWeek(this.IdDepartamento);
    });
  }

  eliminarAsistencia(idRegistro:string){
    this.idRegistro = idRegistro;
    this.titleObservation = 'Argumentos de eliminación';
    this.btnConfirmacion = 'delete';
  }

  confirmacionDelete(){
    this._appRegistroHoraService.deleteRegistroHora(this.idRegistro, this.registro)
    .subscribe((data : RegistroHora[]) => {
      this.alert(1, 'Registro eliminado', 'El registro fue eliminado satisfactoriamente.');
      this.getInformeRegisterWeek(this.IdDepartamento);
    }, res => {
      this.alert(2, 'Error al aliminar', 'Se ha producido un error en el servidor al eliminar.');
    });
  }

  saveInformeEstudiante(idRegistroHora:string){
    var i = 0;
    for(var informe of this.informesRegistrosWeek){
      i++;
      if(informe.idRegistroHora == idRegistroHora){
        this.informeEstudiante.idRegistroHora = informe.idRegistroHora;
        this.informeEstudiante.fecha = informe.fechaEntrada;
        this.informeEstudiante.totalHoras = this.listHours[i];
        this.informeEstudiante.totalSaldo = this.listSaldo[i];
        
        this._appInformeEstudianteService.postInformeEstudiante(this.informeEstudiante)
        .subscribe((informe : InformeEstudiante[]) => {console.log(informe)});
      }
    }  
  }

  eliminarInformeEstudiante(fecha:string, idRegistroHora:string){
    this._appInformeEstudianteService.deleteInformeEstudiante(fecha, idRegistroHora)
    .subscribe((data : InformeEstudiante[]) => {console.log(data)});
  }

}
