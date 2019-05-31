import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppDepartamentoService } from '../../services/app-departamento.service';
import { Departamento } from "../../interfaces/departamento.interface";
import { AppOrganizacionService } from '../../services/app-organizacion.service';
import { Persona } from '../../interfaces/persona.interface';



@Component({
  selector: 'app-gestionar-departamento',
  templateUrl: './gestionar-departamento.component.html',
  styleUrls: ['./gestionar-departamento.component.css']
})
export class GestionarDepartamentoComponent implements OnInit {

  //ALERTS
  titleAlert:string = null;
  messageAlert:string = null;
  activateAlert:boolean = false;
  alertSuccess:Boolean = false;
  alertError:Boolean = false;
  alertWarning:boolean = false;
  MessageEnable:Boolean = false;
  MessageDesable:Boolean = false;
  //DEPARTAMENTO
  departamentos:Departamento[];
  departamento:Departamento = {}

  editDepartamento:Departamento = {
    nombreDepartamento:""
  }
  //Info Departamento
    codigoDepartamento:string;
    nombreCompleto:string;
    nacionalidad: string;
    direccion: string;
    ci: string;
    celular: string;
    fechaNacimiento: string;
    estadoPersona;
    estadoDepartamento;
    fechaRegistroHistorialDep:string;
    limiteEstudiante:string;
    nombreDepartamento:string;
    cantidadEstudiantes:string = "3"; //falta aun sumar and restar
    cupos:string = "5"; //falta aun sumar and restar
    costoHora:string;

  
  //HISTORIAL DEPARTAMENTO
  maxidDept:Departamento[];
  historialDepartamentos:Departamento[];
  historialDepartamento:Departamento = {
    idDepartamento:"",
    limiteEstudiante:"",
    costoHora:""
  }

  editHistorialDepartamento:Departamento = {
    idDepartamento:"",
    limiteEstudiante:"",
    costoHora:"",
    estadoDepartamento:""
  }
  //ORGANIZACION DEPARTAMENTO
  //Sera donde recibiremos el id maximo
  MessageFailOrg:boolean = false;
  MessageSuccessOrg:boolean = false;
  idPersona:string = "";
  idDepartamento:string = "";
  idMax:string = "";
  listDepSJ:Departamento[];
  listJefesDepto:Persona[];
  organizacionDepartamento:Departamento = {
    idDepartamento:"",
    idPersona:""
  }
    //Message de confirmacion de delete
    messageYdelete:boolean = false;
  constructor( private _appDepartamentoService: AppDepartamentoService,
                private _appDeptOrgService: AppOrganizacionService ) {
    this.getDepartamentos();
  }

  ngOnInit() {
    this.getListJefesDeptarmento();
    //Lo ejecutamos por que a la primera nos responde undefine-> luego si muestra resultados
    this.getMaxIdDep();
  }

  ngOnDestroy(): void {

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

  messageEnableDesable(value:string){
    if (value == 'inactivo') {
      this.MessageEnable = true;
      setTimeout(() => {
        this.MessageEnable = false;
      }, 8000);
    }else if (value == 'activo') {
      this.MessageDesable = true;
      setTimeout(() => {
        this.MessageDesable = false;
      }, 8000);
    }
  }
  //GEATION DEPARTAMENTOS
  getDepartamentos(){
    this._appDepartamentoService.getDepartamentos()
    .subscribe((departamentos:Departamento[]) => {this.departamentos = departamentos});
    console.log(this.departamentos);

  }


  getMaxIdDep(){
    this._appDepartamentoService.getHistorialDepartamento()
      .subscribe((maxidDept:Departamento[]) => {this.maxidDept = maxidDept});
      console.log("getMAXdEP: ",this.maxidDept )
  }

  getInfoDepartamento(idDepartamento:string){
    for(let departamento of this.departamentos){
      if(departamento.idDepartamento == idDepartamento){
        if (departamento.segundoNombre == null && departamento.segundoApellido != null ) {
          this.nombreCompleto = departamento.primerNombre + " " + departamento.primerApellido + " " + departamento.segundoApellido;
        } else if (departamento.segundoNombre == null && departamento.segundoApellido == null){
          this.nombreCompleto = departamento.primerNombre + " " + departamento.primerApellido; 
        }else if (departamento.segundoNombre != null && departamento.segundoApellido == null){ 
          this.nombreCompleto = departamento.primerNombre + " " + departamento.segundoNombre + " " + departamento.primerApellido;   
        }else{
          this.nombreCompleto = departamento.primerNombre + " " + departamento.segundoNombre + " " + departamento.primerApellido + " " + departamento.segundoApellido;
        }
        this.nacionalidad = departamento.nacionalidad;
        this.direccion = departamento.direccion;
        this.celular = departamento.celular;
        this.ci = departamento.ci;
        this.fechaNacimiento = departamento.fechaNacimiento;
        this.estadoPersona = departamento.estadoPersona;
        this.codigoDepartamento = departamento.idDepartamento;
        this.estadoDepartamento = departamento.estadoDepartamento;
        this.fechaRegistroHistorialDep = departamento.fechaRegistroHistorialDep;
        this.limiteEstudiante = departamento.limiteEstudiante;
        this.nombreDepartamento = departamento.nombreDepartamento;
        this.costoHora = departamento.costoHora;
      }
    }
  }

  saveDepartamento(){
    this._appDepartamentoService.postDepartamento(this.departamento)
    .subscribe((departamento:Departamento[]) => {console.log(departamento)});
  }

  editarDepartamento(){
    let idDepartamento = "1";
    console.log(this.editarDepartamento);
    this._appDepartamentoService.putDepartamento(this.editDepartamento, idDepartamento)
      .subscribe((data : Departamento[]) => {console.log(data)});

      setTimeout(() => {
        this.getDepartamentos();
      }, 2000);
  }

  editEstadoDepartamento(idDepartamento:string, estado:string){
    this.departamento.estadoDepartamento = estado;
    this._appDepartamentoService.putEstadoDepartamento(this.departamento, idDepartamento)
      .subscribe((data : Departamento[]) => {console.log(data)});

      setTimeout(() => {
        this.getDepartamentos();
      }, 2000);
  }

  deleteDepartameto(idDepartamento:string){
    this.codigoDepartamento = idDepartamento;
  }
  //una vez confirmado lo eliminamos
  eliminarDepartamento(){
    this._appDepartamentoService.deleteDepartamento(this.codigoDepartamento)
    .subscribe((data : Departamento[]) => {console.log(data)})
    this.messageYdelete = true;
    setTimeout(() => {
      this.getDepartamentos();
    }, 2000);
    setTimeout(() => {
      this.messageYdelete = false;
    }, 8000);
  }

  //GESTION HISTORIAL DEPARTAMENTOS

  getHistorialDepartamentos(){
  }

  saveHistorialDepartamento(){
    for(let id of this.maxidDept){
      this.idMax = id.idDepartamento;
    }
    // //falla del ultimo id
    this.historialDepartamento.idDepartamento = this.idMax;
    this._appDepartamentoService.postHistorialDepartamento(this.historialDepartamento)
      .subscribe((departamento:Departamento[]) => {console.log(departamento)});

  }

  //GESTIONAR ORGANIZACION DEPARTAMENTO
  //Metodo para obtener los departamentos sin Jefes de Dep -> PERO aun falta perfeccionar
  getListDeptoSJ(){
   this._appDeptOrgService.getOrgDepartamentoSJ()
   .subscribe((departamentos:Departamento[]) => { this.listDepSJ = departamentos});
  }

  getListJefesDeptarmento(){
    this._appDeptOrgService.getJefesDepartamento()
      .subscribe((personas:Persona[]) => {this.listJefesDepto = personas});
  }

  saveOrganizacion(){
    if(this.idDepartamento != "" && this.idPersona != ""){

      this.organizacionDepartamento.idPersona = this.idPersona;
      this.organizacionDepartamento.idDepartamento = this.idDepartamento;

      this._appDeptOrgService.postOrganizacionDepartamento(this.organizacionDepartamento)
      .subscribe((departamento:Departamento[])=>{console.log(departamento)});

    this.MessageSuccessOrg = true;
    setTimeout(()=>{
      this.MessageSuccessOrg = false;
    }, 5000);

    }else{

      this.MessageFailOrg = true;
      setTimeout(()=>{
        this.MessageFailOrg = false;
      }, 5000);

    }
    
  }

}