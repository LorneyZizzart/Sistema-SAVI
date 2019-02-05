import { Component, OnInit, ɵConsole } from '@angular/core';
import { AppRegistroHoraService } from '../../services/app-registroHora.service';
import { RegistroHora } from '../../interfaces/registroHora.interface';
import { AppDepartamentoService } from '../../services/app-departamento.service';
import { Departamento } from '../../interfaces/departamento.interface';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';
import { InformeEstudiante } from '../../interfaces/informe-estudiante.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';





@Component({
  selector: 'app-gestionar-informe-hoy',
  templateUrl: './gestionar-informe-hoy.component.html',
  styleUrls: ['./gestionar-informe-hoy.component.css']
})
export class GestionarInformeHoyComponent implements OnInit {
  
  //Variable global para almacenar el id del departamento
  IdDepartamento:string = "1"
  fechaHoy:any;
  //FOOTER
  numStudent:number = 0;
  numHour:any = '00:00';
  totalSaldo:any = 0;
  //info del departamento
  departamento:Departamento [];
  //Registro de hoy
  informesRegistrosNow:RegistroHora[];
  //list of hours the students
  listHours:any[] = ['00:00'];
  listSaldo:any[] = ['0'];
  //Lista de estudiantes del departameto
  estudiantes:Persona[];
  //Objeto para registrar asistencia del estudiante
  registro:RegistroHora = {};
  idConvenio:string;
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
  //Message of exit the student
  messageExit:boolean = false;
  //Message de registro de asistencia
  messageDelete:boolean = false;
  messageSuccess:boolean = false;
  messageFail:boolean = false;
  //para guardar el informe de estudiante
  informeEstudiante:InformeEstudiante = {}
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
  fotocopiaCI;
  solicitudWork;
  fechaInicio;
  fechaFinal;


  constructor(private _appRegistroHoraService:AppRegistroHoraService,
              private _appDepartamentoService:AppDepartamentoService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appInformeEstudianteService:AppInformeEstudianteService ) { 
  }

  ngOnInit() {
    this.fechaHoy = new Date();
    this.getDepartament(this.IdDepartamento);
    this.getInformeRegisterNow(this.IdDepartamento);
    this.getEstudiantes(this.IdDepartamento);
  }


  calculadoraSaldo(hora, saldo){
    var hour = parseInt(hora.substr(0,2));
    var min = parseInt(hora.substr(3,2));
    var auxSaldo = parseFloat(saldo);
    var totalSald;

    if(min >= 0 && min <= 7){
      auxSaldo = 0 ;
    }else if(min >=8 && min <= 10){
      auxSaldo = auxSaldo/6 * 1;
    }    else if(min >=11 && min <= 20){
      auxSaldo = auxSaldo/6 * 2;
    }else if(min >=21 && min <= 30){
      auxSaldo = auxSaldo/6 * 3;
    }else if(min >=31 && min <= 40){
      auxSaldo = auxSaldo/6 * 4;
    }else if(min >=41 && min <= 50){
      auxSaldo = auxSaldo/6 * 5;
    }else if(min >=51 && min <= 60){
      auxSaldo = auxSaldo
    }
    
      var balance = hour * saldo;
      var saldo1 = parseFloat(balance.toString());
      var saldo2 = parseFloat(auxSaldo.toString());
      totalSald = saldo1 + saldo2;

    return totalSald;
  }

  restarHoras(inicio, fin) {
    var inicioMinutos = parseInt(inicio.substr(3,2));
    var inicioHoras = parseInt(inicio.substr(0,2));
    var finMinutos = parseInt(fin.substr(3,2));
    var finHoras = parseInt(fin.substr(0,2));
  
    var transcurridoMinutos = finMinutos - inicioMinutos;
    var transcurridoHoras = finHoras - inicioHoras;
    
    if (transcurridoMinutos < 0) {
      transcurridoHoras--;
      transcurridoMinutos = 60 + transcurridoMinutos;
    }

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
    return horatotale[0]+":"+horatotale[1];
  }

  getInformeRegisterNow(idDepartamento:string){
    this._appRegistroHoraService.getInformeRegisterNow(idDepartamento)
    .subscribe((registro : RegistroHora[]) => {this.informesRegistrosNow = registro});
    
    setTimeout(() => {
      this.listHours = ['00:00'];
      this.listSaldo= ['0'];
      this.numStudent = 0;
      this.numHour= '00:00';
      this.totalSaldo = 0;
      this.totalDatos();   
      }, 2000);
  }

  totalDatos(){
    var horaInicio, horaFinal, auxHE, auxME, auxHS, auxMS, processHours = null;
    var numMoney;
    for(let registro of this.informesRegistrosNow){
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
        processHours = this.restarHoras(horaInicio, horaFinal);
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
  }
  //PARA OBTENER LOS DATOS DEL DEPARTAMENTO LUEGO SE PARA AL METODO infoDepartamento
  getDepartament(idDepartamento:string){
    this._appDepartamentoService.getDepartamento(idDepartamento)
    .subscribe((departamento : Departamento[]) => {this.departamento = departamento});
    setTimeout(() => {
      this.infoDepartamento(idDepartamento);
    }, 2000);
  }
  //Obtener los estudiantes del departamento
  getEstudiantes(idDepartamento:string){
    this._appTipoPersonaService.getListStudentDepto(idDepartamento)
    .subscribe((estudiantes : Persona[]) => {this.estudiantes = estudiantes});
  }

  informacionEstudiante(idEstudiante){
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
      }
    }
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
          this.fechaRegistroHistorialDep = departamento.fechaRegistroHistorialDep;
          this.limiteEstudiante = departamento.limiteEstudiante;
          this.costoHora = departamento.costoHora;
      }
    }
  }

  registrarAsistencia(){
    if(this.idConvenio != undefined || this.idConvenio != null){
      this.registro.idConvenio = this.idConvenio;
      this._appRegistroHoraService.postRegistroHora(this.registro)
      .subscribe((data: RegistroHora[]) => {console.log(data)});
      this.messageSuccess = true;
      setTimeout(() => {
        this.getInformeRegisterNow(this.IdDepartamento);
      }, 2000);
      setTimeout(() => {
        this.messageSuccess = false;
      }, 5000);
    }else{
      this.messageFail = true;
      setTimeout(() => {
        this.messageFail = false;
      }, 5000);
    }    

  }

  registrarSalida(idRegistro:string){
    this._appRegistroHoraService.putRegistroSalida(idRegistro, this.registro)
    .subscribe((data : RegistroHora []) => {console.log(data)});
    this.messageExit = true;
    setTimeout(() => {
      this.messageExit = false;
    }, 5000);
    setTimeout(() => {
      this.getInformeRegisterNow(this.IdDepartamento);
    }, 2000);
  }

  registrarAprovacion(idRegistro:string, aprobado:string, fecha:string, idRegistroHora:string){
    this.registro.aprovadoRegistroHora = aprobado;
    this._appRegistroHoraService.putRegsitroAprovacion(idRegistro, this.registro)
    .subscribe((data : RegistroHora[]) => {console.log(data)});

    if(aprobado == '1'){
      setTimeout(() => {
      this.saveInformeEstudiante(idRegistro);        
      }, 1000);
    }else{
      setTimeout(() => {
        this.eliminarInformeEstudiante(fecha, idRegistroHora);     
        }, 1000);
    }

    setTimeout(() => {
      this.getInformeRegisterNow(this.IdDepartamento);
    }, 2000);
  }

  eliminarAsistencia(idRegistro:string){
   this.idRegistro = idRegistro;
  }

  confirmacionDelete(){
    this._appRegistroHoraService.deleteRegistroHora(this.idRegistro)
    .subscribe((data : RegistroHora[]) => {console.log(data)});
    this.messageDelete = true;
    setTimeout(() => {
      this.messageDelete = false;
    }, 5000);
    setTimeout(() => {
      this.getInformeRegisterNow(this.IdDepartamento);
    }, 2000);
  }
  //GESTION DE INFORME ESTUDIANTE
  saveInformeEstudiante(idRegistroHora:string){
    var i = 0;
    for(var informe of this.informesRegistrosNow){
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
