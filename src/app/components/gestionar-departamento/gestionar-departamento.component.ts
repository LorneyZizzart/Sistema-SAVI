import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppDepartamentoService } from '../../services/app-departamento.service';
import { Departamento } from "../../interfaces/departamento.interface";
import { AppOrganizacionService } from '../../services/app-organizacion.service';
import { AppPersonaService } from '../../services/app-persona.service';
import { Persona } from '../../interfaces/persona.interface';
import { Organizacion } from 'src/app/interfaces/organizacion.interface';
import { HistorialDepartamento } from 'src/app/interfaces/historialDepartamento.interface';



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
  //DEPARTAMENTO
  departamentos:Departamento[] = [];
  departamento:Departamento = {}
  //--
  organizacionDepartamento:Organizacion[];

  editDepartamento:Departamento = { }
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
  // -- 
  historialesDepartamento:HistorialDepartamento[];//para almacenar el historial de un solo departamento
  historialDepartamento:Departamento = {};

  //ORGANIZACION DEPARTAMENTO
  //Sera donde recibiremos el id maximo
  idPersona:string = "";
  idDepartamento:string = "";
  idMax:string = "";
  listDepSJ:Organizacion[];
  listJefesDepto:Persona[];

  //Inputs
  //Register depto
  inputValNameDepto:boolean = true; messaggeNameDepto:string = null;
  //Edit Depto
  inputValEditNameDepto:boolean = true;

  simbolos="/*-+|°!#$%&()=¿?,;. :_{}[]><";
  constructor( private _appDepartamentoService: AppDepartamentoService,
                private _appDeptOrgService: AppOrganizacionService,
                private _appPersonaService:AppPersonaService ) { }

  ngOnInit() {
    this.getDepartamentos();
    // this.getListJefesDeptarmento();
    //Lo ejecutamos por que a la primera nos responde undefine-> luego si muestra resultados
    // this.getMaxIdDep();
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

  inputNombreDepartamento(value, opcion){
    console.log("nombre depto: ", value);
    var valDepto = true;
    if(value != null){
    if(value.length > 0 && value != " "){
      for (let i = 0; i < value.length; i++) {
        if(this.simbolos.indexOf(value.charAt(i),0)!=-1){valDepto = false; break}
      }
      if(valDepto){
        this._appDepartamentoService.getDepartamentoName(value).subscribe((data:Departamento[])=>{
          if(data.length == 0){
            if(opcion == 1) this.inputValNameDepto = true;
            if(opcion == 2) this.inputValEditNameDepto = true;
          }else{
            if(opcion == 1) this.inputValNameDepto = false;
            if(opcion == 2) this.inputValEditNameDepto = false;
            this.messaggeNameDepto = 'El nombre ya se encuentra registrado.'
          }
        })        
      }else{
        if(opcion == 1) this.inputValNameDepto = false;
        if(opcion == 2) this.inputValEditNameDepto = false;
        this.messaggeNameDepto = 'No se permite caracteres de tipo símbolo.';
      }  
    }else{
      if(opcion == 1) this.inputValNameDepto = false;
      if(opcion == 2) this.inputValEditNameDepto = false;
      this.messaggeNameDepto = 'El campo debe ser llenado obligatoriamente.';
    }
    }
  }
  //GEATION DEPARTAMENTOS
  getDepartamentos(){
    
    this._appDepartamentoService.getDepartamentos()
    .subscribe((departamentos:Departamento[]) => {
      for (let i = 0; i < departamentos.length; i++) {
        this._appDeptOrgService.getOrgDepartamento(departamentos[i].idDepartamento).subscribe((orgDepartamento:Departamento[])=>{
          if(orgDepartamento.length > 0){
            departamentos[i].organizacionDepartamento = orgDepartamento[0];

            this._appPersonaService.getPersona(orgDepartamento[0].idPersona).subscribe((persona:Persona[])=>{
              departamentos[i].persona =  persona[0];
            }) 
          }                

          this._appDepartamentoService.getHistorialDepartamento(departamentos[i].idDepartamento).subscribe((historialDepartamento:Departamento[])=>{
          departamentos[i].historialDepartamento =  historialDepartamento[0];
          })
        })        
      }
      console.log("DEPARTAMENTOS: ", departamentos);      
      this.departamentos = departamentos;      
    });
    
  }

  // POSIBLE BORRAR
  // getMaxIdDep(){
  //   // this._appDepartamentoService.getHistorialDepartamento()
  //   //   .subscribe((maxidDept:Departamento[]) => {this.maxidDept = maxidDept});
  //   //   console.log("getMAXdEP: ",this.maxidDept )
  // }
  // POSIBLE BORRAR
  // getInfoDepartamento(idDepartamento:string){
  //   for(let departamento of this.departamentos){
  //     if(departamento.idDepartamento == idDepartamento){
  //       if (departamento.segundoNombre == null && departamento.segundoApellido != null ) {
  //         this.nombreCompleto = departamento.primerNombre + " " + departamento.primerApellido + " " + departamento.segundoApellido;
  //       } else if (departamento.segundoNombre == null && departamento.segundoApellido == null){
  //         this.nombreCompleto = departamento.primerNombre + " " + departamento.primerApellido; 
  //       }else if (departamento.segundoNombre != null && departamento.segundoApellido == null){ 
  //         this.nombreCompleto = departamento.primerNombre + " " + departamento.segundoNombre + " " + departamento.primerApellido;   
  //       }else{
  //         this.nombreCompleto = departamento.primerNombre + " " + departamento.segundoNombre + " " + departamento.primerApellido + " " + departamento.segundoApellido;
  //       }
  //       this.nacionalidad = departamento.nacionalidad;
  //       this.direccion = departamento.direccion;
  //       this.celular = departamento.celular;
  //       this.ci = departamento.ci;
  //       this.fechaNacimiento = departamento.fechaNacimiento;
  //       this.estadoPersona = departamento.estadoPersona;
  //       this.codigoDepartamento = departamento.idDepartamento;
  //       this.estadoDepartamento = departamento.estadoDepartamento;
  //       this.fechaRegistroHistorialDep = departamento.fechaRegistroHistorialDep;
  //       this.limiteEstudiante = departamento.limiteEstudiante;
  //       this.nombreDepartamento = departamento.nombreDepartamento;
  //       this.costoHora = departamento.costoHora;
  //     }
  //   }
  // }

  saveDepartamento(){
    if(!this.departamento.nombreDepartamento){this.inputValNameDepto = false;this.messaggeNameDepto = 'El campo debe ser llenado obligatoriamente.';}
    if(this.inputValNameDepto){
      this._appDepartamentoService.postDepartamento(this.departamento)
        .subscribe((departamento:Departamento[]) => {
          this.getDepartamentos();
          this.alert(1, 'Registro exitoso','El registro del departamento se realizó satisfactoriamente.');
        }, res => {
          this.alert(2, 'Error al registrar','Se ha producido un error en el servidor.');
        });
    }else  this.alert(2, 'Error al registrar','Se ha producido un error al guardar en el sistema.'); 
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
  }

  //GESTION HISTORIAL DEPARTAMENTOS

  getHistorialesDepartamento(idDepartamento:string){
    console.log("idDepartamento: ",idDepartamento);
    this._appDepartamentoService.getHistorialesDepartamento(idDepartamento)
    .subscribe((data:HistorialDepartamento[]) =>{
      this.historialesDepartamento = data;
      this.historialDepartamento.idDepartamento = idDepartamento;
    })
  }

  saveHistorialDepartamento(){
    console.log(": ", this.historialDepartamento.idDepartamento );
  }

  editEstadoHistorialDepartamento(idDepartamento:string, idHistorialDepartamento:string, estado:string){
    //Se envia editHistorialDepartamento.idHistorialDepartamento como idDepartamento
    this.historialDepartamento.idDepartamento = idDepartamento;
    this.historialDepartamento.estadoHistorialDepartamento = estado;
    this._appDepartamentoService.putEstadoHistorialDepartamento(this.historialDepartamento, idHistorialDepartamento)
    .subscribe((data:Departamento[]) =>{
      if(estado == '1') this.alert(1, 'Departamento habilitado','El departamento fue habilitado satisfactoriamente.');
      if(estado == '0') this.alert(3, 'Departamento deshabilitado','El departamento fue deshabilitado  satisfactoriamente.');
      this.getDepartamentos();
      this.getHistorialesDepartamento(idDepartamento);
    })
  }

  //GESTIONAR ORGANIZACION DEPARTAMENTO
  //Metodo para obtener los departamentos sin Jefes de Dep -> PERO aun falta perfeccionar
  getOrganizacionDepartamento(idDepartamento:string){
   this._appDeptOrgService.getOrgDepartamento(idDepartamento)
   .subscribe((departamentos:Organizacion[]) => { this.listDepSJ = departamentos});
  }

  getListJefesDeptarmento(){
    this._appDeptOrgService.getJefesDepartamento()
      .subscribe((personas:Persona[]) => {this.listJefesDepto = personas});
  }

  saveOrganizacion(){
    if(this.idDepartamento != "" && this.idPersona != ""){}

      // this.organizacionDepartamento.idPersona = this.idPersona;
      // this.organizacionDepartamento.idDepartamento = this.idDepartamento;

      // this._appDeptOrgService.postOrganizacionDepartamento(this.organizacionDepartamento)
      // .subscribe((departamento:Departamento[])=>{console.log(departamento)});    
  }

}