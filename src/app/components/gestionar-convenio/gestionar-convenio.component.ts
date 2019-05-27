import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Convenio } from "../../interfaces/convenio.interface";
import { AppConvenioService } from "../../services/app-convenio.service";
import { AppTipoPersonaService } from "../../services/app-tipoPersona.service";
import { AppDepartamentoService } from "../../services/app-departamento.service";
import { Persona } from 'src/app/interfaces/persona.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';

@Component({
  selector: 'app-gestionar-convenio',
  templateUrl: './gestionar-convenio.component.html',
  styleUrls: ['./gestionar-convenio.component.css']
})
export class GestionarConvenioComponent implements OnInit {
  //estadoCOnvenio
  MessageDesableConvenio:boolean = false;
  MessageEnableConvenio:boolean = false;
  convenios:Convenio [];
  conveniosArray:Convenio[];
  editConvenio:Convenio = {};
  estudiantes: Persona [];
  departamentos:Departamento[];
  becas:any = [{idBeca: 1, nombre:'Industrial'},{idBeca: 2, nombre:'Institucional'}];
  //ALERTS
  titleAlert:string = null;
  messageAlert:string = null;
  activateAlert:boolean = false;
  alertSuccess:Boolean = false;
  alertError:Boolean = false;
  alertWarning:boolean = false;
  //alert message
  MessageSuccessConvenio:boolean = false;
  MessageFailConvenio:boolean = false
  estado = false;
  //Register
  idConvenio = "";
  idEstudiante = ""; 
  fechaInicio = "";
  fechaFinal = "";
  fotocopiaCarnet:boolean = false;
  solicitud:boolean = false;
  aceptoTerminos:boolean = false;
  private convenio: Convenio = {};
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
  departamento:string;
  beca:string;
  estadoConvenio:string;
  fotocopiaCI;
  solicitudWork;
  //Message de confirmacion de delete
  messageYdelete:boolean = false;
  messageNdelete:boolean = false;
  //INPUT REGISTER AGREEMENT
  inputValDateStart:boolean = true; messaggeDateStart:string = null;
  inputValDateFinish:boolean = true;
  //INPUT edit AGREEMENT
  inputValEditDateStart:boolean = true;
  inputValEditDateFinish:boolean = true;
  letters="abcdefghyjklmnñopqrstuvwxyz";
  numbers="0123456789";
  simbolos="/*-+|°!#$%&()=¿?,;. :_{}[]><";

  constructor( private _appConvenioService:AppConvenioService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appDepartamentoService: AppDepartamentoService) {
   }

  ngOnInit() {
    this.getConvenios();
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
  activaRegister(){
    this.getEstudiantes();
    setTimeout(() => {
      this.getDepartamentos();
    }, 2000);
  }
  convertDate(opcion, value){
    let fecha = new Date(value);
    let dia = fecha.getUTCDate();
    let mes = fecha.getUTCMonth()+1;
    let year = fecha.getUTCFullYear();
    var newDay, newMonth, newValue;
    switch (opcion) {
      case 1:
        if(dia<= 9){newDay = '0'+dia}else{newDay = dia}
        if(mes<= 9){newMonth = '0'+mes}else{newMonth = mes}
        newValue = newDay+'/'+newMonth+'/'+year;
        break;
      case 2:
        fecha =  value.split('/');
        newValue = fecha[2]+"/"+fecha[1]+"/"+fecha[0]
        break;
    
      default:
        break;
    }
    return newValue
  }
  //REGISTRAR CONVENIO
  inputDateStart(value, opcion){
    if(value != null){
      var valDay = false, valMonth = false, valYear = false;
      var date = new Date();
      var infYear = parseInt(date.getFullYear().toString());
      if(value.length > 0){
        for (let i = 0; i < value.length; i++) {
          if(this.letters.indexOf(value.charAt(i),0)!=-1){
            if(opcion == 1) this.inputValDateStart = false;
            if(opcion == 2) this.inputValDateFinish = false;
            if(opcion == 3) this.inputValEditDateStart = false;
            if(opcion == 4) this.inputValEditDateFinish = false;
            this.messaggeDateStart = 'No se permite caracteres literarios.';
            break;
          }else {
            if(value.substr(2,1) == '/' && value.substr(5,1) == '/'){            
              if(value.substr(0,2) > 0 && value.substr(0,2) <= 31){
                valDay = true;
              }else{
                if(opcion == 1) this.inputValDateStart = false;
                if(opcion == 2) this.inputValDateFinish = false;
                if(opcion == 3) this.inputValEditDateStart = false;
                if(opcion == 4) this.inputValEditDateFinish = false;
                valDay = false;
                this.messaggeDateStart = 'El valor del día debe ser entre 01 a 31';
              }
              if(value.substr(3,2) > 0 && value.substr(3,2) <= 12){
                valMonth = true;
              }else{
                if(opcion == 1) this.inputValDateStart = false;
                if(opcion == 2) this.inputValDateFinish = false;
                if(opcion == 3) this.inputValEditDateStart = false;
                if(opcion == 4) this.inputValEditDateFinish = false;
                valMonth = false;
                this.messaggeDateStart = 'El valor del mes debe ser entre 01 a 12';
              }
              if(value.length > 6){
                if(parseInt(value.substr(6)) == infYear) {
                  valYear = true;
                }else {
                  if(opcion == 1) this.inputValDateStart = false;
                  if(opcion == 2) this.inputValDateFinish = false;
                  if(opcion == 3) this.inputValEditDateStart = false;
                  if(opcion == 4) this.inputValEditDateFinish = false;
                  valYear =false;
                  this.messaggeDateStart = 'El año no es válido.';
                }
              }            
              if(valDay == true && valMonth == true && valYear == true){
                if(opcion == 1) this.inputValDateStart = true;
                if(opcion == 2) this.inputValDateFinish = true;
                if(opcion == 3) this.inputValEditDateStart = true;
                if(opcion == 4) this.inputValEditDateFinish = true;
              }
            }else{
              if(opcion == 1) this.inputValDateStart = false;
              if(opcion == 2) this.inputValDateFinish = false;
              if(opcion == 3) this.inputValEditDateStart = false;
              if(opcion == 4) this.inputValEditDateFinish = false;
              this.messaggeDateStart = 'La fecha debe ser en el formato día/mes/año.';
            }                  
          }
        }
      }else{
        if(opcion == 1) this.inputValDateStart = false;
        if(opcion == 2) this.inputValDateFinish = false;
        if(opcion == 3) this.inputValEditDateStart = false;
        if(opcion == 4) this.inputValEditDateFinish = false;
        this.messaggeDateStart = 'El campo debe ser llenado obligatoriamente en el formato de día/mes/año.';
      }
    }
  }
  
  //GESTIONAR CONVENIO

  getConvenios(){
    this._appConvenioService.getConvenios().subscribe((convenios: Convenio[]) => {
      this.convenios = convenios; this.conveniosArray = convenios; 
    });
  }

  buscarConvenio(value){
    let array:Convenio[] = [];
    var name;
    value = value.toLowerCase();
    this.convenios = this.conveniosArray;
    for(let informe of this.convenios){
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
    this.convenios = array;   
  }

  saveConvenio(idEstudiante, idDepartamento, idBeca, form:NgForm){
    this.convenio.idPersona = idEstudiante;
    this.convenio.idDepartamento = idDepartamento;
    this.convenio.idBeca = idBeca;
    if(this.convenio.idPersona != "" && this.convenio.idDepartamento != "" && this.convenio.idBeca && this.convenio.fechaInicio !="" && this.convenio.fechaFinal != ""){
      if(this.solicitud == true){
        this.convenio.solicitudTrabajo = "1";
      }else{this.convenio.solicitudTrabajo = "0";}
      if(this.fotocopiaCarnet == true){
        this.convenio.fotocopiaCarnet = "1";
      }else{this.convenio.fotocopiaCarnet = "0";}
      let dateStart = this.convenio.fechaInicio.split('/');
      let date = dateStart[2]+"/"+dateStart[1]+"/"+dateStart[0];
      this.convenio.fechaInicio = date;
      let dateFinish =  this.convenio.fechaFinal.split('/');
      date = dateFinish[2]+"/"+dateFinish[1]+"/"+dateFinish[0];
      this.convenio.fechaFinal = date;
      // console.log(this.convenio);
      this._appConvenioService.postConvenio(this.convenio)
      .subscribe((data: Convenio[]) => {
        this.alert(1, 'Registro exitoso', 'El convenio se registro satisfactoriamente.');
        this.resetForm(form);
        this.getConvenios();
      }, res => {
        this.alert(2, 'Error al registrar', 'Se ha producido un error en el servidor al registrar.');
      });
    }else{
      this.alert(2, 'Error al registrar', 'Se ha producido un error al registrar el convenio.');
    }
  }
  
  searchPutConvenio(idPersona:string, idConvenio){
    this.inputValEditDateStart = true;
    this.inputValEditDateFinish = true;
    this.getDepartamentos();
    this.idConvenio = idConvenio;
    for(let estudiante of this.convenios){
      if(estudiante.idPersona == idPersona){
        if (estudiante.segundoNombre == null && estudiante.segundoApellido != null ) {
          this.nombreCompleto = estudiante.primerNombre + " " + estudiante.primerApellido + " " + estudiante.segundoApellido;
        } else if (estudiante.segundoNombre == null && estudiante.segundoApellido == null){
          this.nombreCompleto = estudiante.primerNombre + " " + estudiante.primerApellido; 
        }else if (estudiante.segundoNombre != null && estudiante.segundoApellido == null){ 
          this.nombreCompleto = estudiante.primerNombre + " " + estudiante.segundoNombre + " " + estudiante.primerApellido;   
        }else{
          this.nombreCompleto = estudiante.primerNombre + " " + estudiante.segundoNombre + " " + estudiante.primerApellido + " " + estudiante.segundoApellido;
        }
        this.editConvenio.idDepartamento = estudiante.idDepartamento;
        this.editConvenio.idBeca = estudiante.idBeca;
        this.editConvenio.fechaInicio = this.convertDate(1, estudiante.fechaInicio);
        this.editConvenio.fechaFinal = this.convertDate(1, estudiante.fechaFinal);
        this.editConvenio.solicitudTrabajo = estudiante.solicitudTrabajo;
        this.editConvenio.fotocopiaCarnet = estudiante.fotocopiaCarnet;
      }
    }
  }
  putConvenio(idDepartamento, idBeca){
    if(this.editConvenio.idDepartamento == "" || this.editConvenio.idBeca == "" || !this.inputValEditDateStart || !this.inputValEditDateFinish){
      this.alert(2, 'Error al actulizar', 'Se ha producido un error en el sistema al actualizar.');
    }else{
      this.editConvenio.idDepartamento = idDepartamento;
      this.editConvenio.idBeca = idBeca;
      this.editConvenio.fechaInicio = this.convertDate(2, this.editConvenio.fechaInicio)
      this.editConvenio.fechaFinal = this.convertDate(2, this.editConvenio.fechaFinal)
      if(this.editConvenio.solicitudTrabajo) this.editConvenio.solicitudTrabajo = '1';
      else this.editConvenio.solicitudTrabajo = '0'
      if(this.editConvenio.fotocopiaCarnet) this.editConvenio.fotocopiaCarnet = '1'
      else this.editConvenio.fotocopiaCarnet = '0';
      this._appConvenioService.putConvenio(this.editConvenio, this.idConvenio)
        .subscribe((data: Convenio[]) => {
          this.alert(1, 'Actualización exitoso', 'El convenio se actualizó satisfactoriamente.');
          this.getConvenios();
        }, res => {
          this.alert(2, 'Error al actulizar', 'Se ha producido un error en el servidor al actualizar.');
        });
    }    
  }

  deleteConvenio(idConvenio:string){
    this.idConvenio = idConvenio;
  }
  //Una vez que confirme la eliminacion
  eliminarConvenio(){
    if(this.idConvenio != null){
      this._appConvenioService.deleteConvenio(this.idConvenio)
      .subscribe((data : Convenio[]) => {
        this.alert(1, 'Registro eliminado', 'El convenio fue eliminado satisfactoriamente.');
        this.getConvenios();
      }, res => {
        this.alert(2, 'Error al eliminar', 'Se ha producido un error en el servidor al eliminar el convenio.');
      })
    }else{
      this.alert(2, 'Error al eliminar', 'Se ha producido un error en el sistema al eliminar el convenio.');
    }
  }

  editEstadoConvenio(idConvenio:string, estado:string){
    this.convenio.estadoConvenio = estado;
    this._appConvenioService.putEstadoConvenio(this.convenio, idConvenio)
    .subscribe((data : Convenio[]) => {
      if(estado == '1') this.alert(1, 'Convenio habilitado', 'El convenio fue habilitado satisfactoriamente.');
      if(estado == '0') this.alert(3, 'Convenio deshabilitado', 'El convenio fue deshabilitado satisfactoriamente.');      
    }, res => {
      this.alert(2, 'Error de cambiar de estado', 'Se ha producido un error en el servidor al cambiar estado.');
    });
    setTimeout(() => {
      this.getConvenios();
    }, 2000);
  }

  //GESTIONAR TIPO PERSONA

  getEstudiantes(){
    this._appTipoPersonaService.getTipoPersona('5')
    .subscribe((estudiantes: Persona[]) => this.estudiantes = estudiantes);
  }

  informacionEstudiante(idEstudiante){
    console.log(this.convenios);
    for(let estudiante of this.convenios){
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
          this.departamento = estudiante.departamento;
          this.beca = estudiante.beca;
          this.estadoConvenio = estudiante.estadoConvenio;
          this.fechaInicio = estudiante.fechaInicio;
          this.fechaFinal = estudiante.fechaFinal;
          this.fotocopiaCI = estudiante.fotocopiaCarnet;
          this.solicitudWork = estudiante.solicitudTrabajo;
      }
    }
  }

  //GESTIONAR DEPARTAMENTO
  getDepartamentos(){
    this._appDepartamentoService.getAllDepartamento()
    .subscribe((departamento: Departamento[]) => this.departamentos = departamento);
  }
}
