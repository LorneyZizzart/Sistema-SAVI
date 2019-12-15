import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { InformeFinanzas } from '../../interfaces/informe-finanzas.interface';
import { AppInformeFinanzasService } from '../../services/app-informe-finanzas.service';
import { InformeEstudiante } from '../../interfaces/informe-estudiante.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';
import { Departamento } from '../../interfaces/departamento.interface';
import { AppDepartamentoService } from '../../services/app-departamento.service';
import { AppAcreedorService } from '../../services/app-acreedor.service';
import { Acreedor } from '../../interfaces/acreedor.interface';
import { AppRegistroHoraService } from '../../services/app-registroHora.service';
import { RegistroHora } from '../../interfaces/registroHora.interface';
import { Convenio } from 'src/app/interfaces/convenio.interface';
import { AppAreaService } from '../../services/app-area.service';
import { Area } from 'src/app/interfaces/area.interface';

@Component({
  selector: 'app-gestionar-informe-finanzas-aprobado',
  templateUrl: './gestionar-informe-finanzas-aprobado.component.html',
  styleUrls: ['./gestionar-informe-finanzas-aprobado.component.css']
})
export class GestionarInformeFinanzasAprobadoComponent implements OnInit {

  //iDUSUARIO
  IdUsuario:string = "4";
  informeFinanzas:InformeFinanzas[];
  //se utiliza para el buscador
  informeArray:InformeFinanzas[];
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
  estadoConvenio:string;
  nombreDepartamento:string;
  fotocopiaCI;
  solicitudWork;
  fechaInicio;
  fechaFinal;
  observacionesRegistroHora
  areas:any[] = [];
  // aprobar informe estudiante x finanzas
  informeEstudiante:InformeEstudiante = {};
  //para archivar
  informesFinanzas:InformeFinanzas = {};
  //Lista de estudiantes del departameto
  estudiantes:Convenio[];
  //acreditacion
  Horas:string; Saldo:string; menosHoras:string = '00:00'; masHoras:string = '00:00';
  //List departament
  departamentos:Departamento[];
  departamento:Departamento = {};
  //confirmar aprobacion
  idInformeEstudiante:string;
  opcion:string;
  idRegistroHora:string;
  montoBs:string;
  idConvenio:string;
  //RegisterAcreedor
  acreedor:Acreedor = {};
  //lista de acreedores
  listAcreedores:Acreedor[];
  //Para aprobar el informe de Registro Hora por FInanzas
  registroHora:RegistroHora = {};
  //opcion para proceder en la acreditacion
  procesoAcreditacion:boolean = false;
  //InfoInforme Finanzas
  idInformeFinanzas:string; fechaAprobada:string; usuario:string = "Jhonny San"; totalHorasF:string; totalSaldoF:string; obsrevacionFinanzas:string;
  //ALERTS
  titleAlert:string = null;
  messageAlert:string = null;
  activateAlert:boolean = false;
  alertSuccess:Boolean = false;
  alertError:Boolean = false;
  alertWarning:boolean = false;

  constructor( private _appInformeEstudianteService:AppInformeEstudianteService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appAcreedorService:AppAcreedorService,
              private _appInformeFinanzasService:AppInformeFinanzasService,
              private _appRegistroHora:AppRegistroHoraService,
              private _appDepartamentoService:AppDepartamentoService,
              private _appAreaService:AppAreaService ) { }

  ngOnInit() {
    this.getInformFinanzas();
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
    for(let registro of this.informeFinanzas){
      this.numStudent++;
      this.numHour = this.sumarHoras(this.numHour, registro.totalHoras);
      this.totalSaldo = parseFloat(this.totalSaldo) + parseFloat(registro.totalSaldo);
      this.totalSaldo = this.totalSaldo.toFixed(2);
    }
  }  

  getEstudiantes(){
    this._appTipoPersonaService.getInfoStudentFinanzas()
    .subscribe((estudiantes : Persona[]) => {this.estudiantes = estudiantes});
  }
  //Departamentos get
  getDepartamentos(){
    this._appDepartamentoService.getDepartamentos()
    .subscribe((departamentos : Departamento[]) => {this.departamentos = departamentos})
  }

  informacionEstudiante(idRegistroHora, idEstudiante, idDepartamento){
    this.areas = [];

    this._appTipoPersonaService.getInfoEstudiantes(idDepartamento, idEstudiante)
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

    
    // for(let registro of this.informeFinanzas){
    //   if(registro.idPersona == idEstudiante && registro.idRegistroHora == idRegistroHora){
    //     this.observacionesRegistroHora = registro.observacionRegistroHora;
    //   }
    // }
  }

  eliminarInformeFinanzas(idInformeEstudiante:string){
    this._appInformeFinanzasService.deleteInformeFinanzas(idInformeEstudiante)
    .subscribe((data: InformeFinanzas[]) => {});
    
  }

  putInformeEstudianteAprobacion(idEstudiante, opcion){
    this.informeEstudiante.aprobadoFinanzas = opcion;
    this._appInformeEstudianteService.putInformeEstudianteAprobarFinanzas(idEstudiante, this.informeEstudiante)
    .subscribe((informe : InformeEstudiante[]) => {
      
      if(this.opcion == '0'){
        this.alert(1, 'Registro exitoso', 'El informe fue desaprobado.');
      }else{
        this.alert(1, 'Registro exitoso', 'El informe fue aprobado.');
      }
      this.getInformFinanzas();
    });
  }

  inputReducir(){
    this.masHoras = '00:00';
    if(this.informesFinanzas.totalHorasF.length > 3){
      this.informesFinanzas.totalHorasF = this.restarHoras(this.Horas, this.menosHoras);
      this.informesFinanzas.totalSaldoF = this.calculadoraSaldo(this.informesFinanzas.totalHorasF, this.departamento.costoHora);
    }else{
      this.informesFinanzas.totalHorasF = '00:00';
    }    
  }

  inputIncrementar(){
    this.menosHoras = '00:00';
    if(this.informesFinanzas.totalHorasF.length > 3){
      this.informesFinanzas.totalHorasF = this.sumarHoras(this.Horas, this.masHoras);
      this.informesFinanzas.totalSaldoF = this.calculadoraSaldo(this.informesFinanzas.totalHorasF, this.departamento.costoHora);
    }else{
      this.informesFinanzas.totalHorasF = '00:00';
    } 
  }

  aprobarInformeEstudiante(idPersona, idInformeFinanzas, idConvenio:string, totalSaldoF, montoBs, idDepartamento, idRegistroHora, idInformeEstudiante:string, opcion:string){
    console.log("entro");
    this.informacionEstudiante(idRegistroHora, idPersona, idDepartamento);
    this.idRegistroHora = idRegistroHora;
    this.idInformeEstudiante = idInformeEstudiante;
    this.opcion = opcion;
    this.idConvenio = idConvenio;
    this.montoBs = montoBs;

    for(let departament of this.departamentos){
      if(departament.idDepartamento == idDepartamento){
        this.departamento.costoHora = departament.costoHora;
        this.departamento.nombreDepartamento = departament.nombreDepartamento;
      }
    }

    for(let informe of this.informeFinanzas){
      if(informe.idInformeEstudiante == idInformeEstudiante){
        this.Horas = informe.totalHoras;
        this.informesFinanzas.totalHorasF = informe.totalHoras;
        this.Saldo = informe.totalSaldo + ' Bs.';
        this.informesFinanzas.totalSaldoF = informe.totalSaldo
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

    if(this.opcion == '1'){
      this.aprobarRegistroHora(this.idRegistroHora, this.opcion);
      this.editarInformeFinanzas(this.idInformeEstudiante, this.informesFinanzas);
      this.saveAcreedor(this.idInformeEstudiante, this.idConvenio, this.informesFinanzas.totalSaldoF);
    }

  }
  //Registro hORA
  aprobarRegistroHora(idRegistroHora:string, opcion:string){
    this.registroHora.aprobadoFinanzas = opcion;
    this._appRegistroHora.putRegsitroAprobarFinanzas(idRegistroHora, this.registroHora)
    .subscribe((registro : RegistroHora[]) => {console.log(registro)});
  }
  //crud INFORME FINANZAS

  buscarInforme(nombre:string){
    let array:InformeFinanzas[] = [];
    nombre = nombre.toLowerCase();
    var name;
    this.informeFinanzas = this.informeArray;
    for(let informe of this.informeFinanzas){
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
      if(name.indexOf(nombre) >= 0){
        array.push(informe);        
      }  
    }
    this.informeFinanzas = array;
  
  }

  getInformFinanzas(){
    this._appInformeFinanzasService.getInformesFinanzas()
    .subscribe((informe : InformeFinanzas[]) => {
      this.informeFinanzas = informe;
      this.informeArray = this.informeFinanzas;
      this.numStudent = 0;
      this.numHour= '00:00';
      this.totalSaldo = 0;
      this.totalDatos();
    });
  }

  editarInformeFinanzas(idInformeFinanzas:string, informe:InformeFinanzas){
    informe.idUsuario = this.IdUsuario;
    this._appInformeFinanzasService.putInformeFinanzas(idInformeFinanzas, this.informesFinanzas)
    .subscribe((informe : InformeFinanzas[]) => {
      // if(this.opcion == '1'){
      //   this.alert(1, 'Registro exitoso', 'El informe fue aprobado.');
      // }
    }, res => {
      this.alert(2, 'Error en el registro', 'Se ha producido un error en el servidor.');
    });
  }

  archivarInformeFinanzas(idInformeFinanzas:string){
    this.informesFinanzas.archivar = "SI";
    this._appInformeFinanzasService.putInformeFinanzasArchivar(idInformeFinanzas, this.informesFinanzas)
    .subscribe((informe : InformeFinanzas[]) => {
      this.alert(1, 'Registro exitoso', 'El informe fue archivado satistactoriamente.');
      this.getInformFinanzas();

    }, res => {
      this.alert(2, 'Error al archivar', 'Se ha producido un error en el servidor.');
    });
  }

  infoInformeFinanzas(idInformeFinanzas, fechaAprobada, totalHorasF, totalSaldoF, obsrevacionFinanzas){
    this.idInformeFinanzas = idInformeFinanzas;
    this.fechaAprobada =  fechaAprobada;
    this.totalHorasF = totalHorasF; 
    this.totalSaldoF = totalSaldoF; 
    this.obsrevacionFinanzas = obsrevacionFinanzas;
  }

  //crud ACREEDOR
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
        this.getInformFinanzas();        
      });
    }else{
      this.acreditarSaldo(idConvenio, this.acreedor);
    }  
  }
  
  acreditarSaldo(idConvenio:string, acreedor:Acreedor){
    this._appAcreedorService.putSaldoAcreedor(idConvenio, acreedor)
    .subscribe((acreedor : Acreedor[]) => {});
  }
  
  restarSaldo(idInformeFinanzas, idInformeEstudiante:string, idConvenio:string, montoBs:string){
    this.acreedor.idInformeEstudiante = idInformeEstudiante;
    this.informesFinanzas.totalHorasF = '00:00';
    this.informesFinanzas.totalSaldoF = '0';
    this.informesFinanzas.obsrevacionFinanzas = null;
    var saldo;
    for(let acreedor of this.listAcreedores){
      if(acreedor.idConvenio == idConvenio){
        saldo = parseFloat(acreedor.montoBs) - parseFloat(montoBs);
        this.acreedor.montoBs = saldo;
        break;
      }
    }
    this.acreditarSaldo(idConvenio, this.acreedor);
    this.editarInformeFinanzas(idInformeFinanzas, this.informesFinanzas);
    
  }

}
