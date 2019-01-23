import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { formatDate, DatePipe } from "@angular/common";
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
  estudiantes: Persona [];
  departamentos:Departamento[];
  //alert message
  MessageSuccessConvenio:boolean = false;
  MessageFailConvenio:boolean = false
  estado = false;
  //Register
  idConvenio = "";
  idEstudiante = "";
  idDepartamento = "";
  idBeca = "";
  fechaInicio = "";
  fechaFinal = "";
  fotocopiaCarnet:boolean = false;
  solicitud:boolean = false;
  aceptoTerminos:boolean = false;
  private convenio: Convenio = {};
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
  departamento:string;
  beca:string;
  estadoConvenio:string;
  fotocopiaCI;
  solicitudWork;



  constructor( private _appConvenioService:AppConvenioService,
              private _appTipoPersonaService:AppTipoPersonaService,
    private _appDepartamentoService: AppDepartamentoService,
    private formBuilder:FormBuilder) {
   }

  ngOnInit() {
    this.getConvenios();
  }

  //resetear el FORMULARIO no estamos usando
  resetForm(formulario: NgForm) {
    formulario.reset({
    });
  }
  activaRegister(){
    this.getEstudiantes();
    setTimeout(() => {
      this.getDepartamentos();
    }, 2000)
  }

  messageEnableDesable(value:string){
    if (value == 'inactivo') {
      this.MessageDesableConvenio = true;
      setTimeout(() => {
        this.MessageDesableConvenio = false;
      }, 8000);
    }else if (value == 'activo') {
      this.MessageEnableConvenio = true;
      setTimeout(() => {
        this.MessageEnableConvenio = false;
      }, 8000);
    }
  }
  //GESTIONAR CONVENIO

  getConvenios(){
    this._appConvenioService.getConvenios().subscribe((convenios: Convenio[]) => this.convenios = convenios);
    console.log(this.convenios);
  }

  cambio(){
    this.solicitud = true;
  }

  saveConvenio(){
    this.convenio.idPersona = this.idEstudiante;
    this.convenio.idDepartamento = this.idDepartamento;
    this.convenio.idBeca = this.idBeca;
    if(this.convenio.idPersona != "" && this.convenio.idDepartamento != "" && this.convenio.idBeca ){
      if(this.solicitud == true){
        this.convenio.solicitudTrabajo = "1";
      }else{this.convenio.solicitudTrabajo = "0";}
      if(this.fotocopiaCarnet == true){
        this.convenio.fotocopiaCarnet = "1";
      }else{this.convenio.fotocopiaCarnet = "0";}
      this._appConvenioService.postConvenio(this.convenio)
      .subscribe((data: Convenio[]) => { console.log(data) });
      this.MessageSuccessConvenio = true;
      setTimeout(() => {
        this.MessageSuccessConvenio = false;
      }, 8000);
    }else{
      this.MessageFailConvenio = true;
      setTimeout(() => {
        this.MessageFailConvenio = false;
      }, 8000);
    }
  }

  editConvenio(){
    console.log(this.convenio);
    // this._appConvenioService.putConvenio(this.convenio, this.idConvenio)
    //   .subscribe((data: Convenio[]) => { console.log(data) });
  }

  editEstadoConvenio(idConvenio:string, estado:string){
    this.convenio.estadoConvenio = estado;
    this._appConvenioService.putEstadoConvenio(this.convenio, idConvenio)
    .subscribe((data : Convenio[]) => {console.log(data)});
    setTimeout(() => {
      this.getConvenios();
    }, 2000);
  }

  //GESTIONAR TIPO PERSONA

  getEstudiantes(){
    this._appTipoPersonaService.getTipoPersona('5')
    .subscribe((estudiantes: Persona[]) => this.estudiantes = estudiantes);
    console.log(this.estudiantes);
  }

  informacionEstudiante(idEstudiante){
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
    console.log(this.departamentos);
  }
}
