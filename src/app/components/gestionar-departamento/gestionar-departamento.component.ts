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
  departamentosArray:Departamento[];
  //se utiliza para crear departamento y crear organizacion
  departamento:Departamento = {}
  //para listar la organizacion de un solo departamento
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
  historialesDepartamento:Departamento[];//para almacenar el historial de un solo departamento
  historialDepartamento:Departamento = {};

  //ORGANIZACION DEPARTAMENTO
  //Sera donde recibiremos el id maximo
  idPersona:string = "";
  idDepartamento:string = "";
  idMax:string = "";
  listDepSJ:Organizacion[];
  //almacenamos la lista de todos los usuarios con rol de jefe de departamento
  listJefesDepto:Persona[];

  //Inputs
  //Register depto
  inputValNameDepto:boolean = true; messaggeNameDepto:string = null;
  inputValCostoDepto:boolean = true;
  inputValLimiteDepto:boolean = true;
  //Edit Depto
  inputValEditNameDepto:boolean = true;
  inputValEditCostoDepto:boolean = true; messaggeCostoDepto:string = null;
  inputValEditLimiteDepto:boolean = true; messaggeLimiteDepto:string = null;

  simbolos="/*-+|°!#$%&()=¿?,;. :_{}[]><";
  letters="abcdefghyjklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
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

  inputCostoDepartamento(value, opcion){
    var simbolosNotMoneda="/*-+|°!#$%&()=¿?,; :_{}[]><";
    var valCosto = true;
    if(value != null){
      if(value.length > 0 && value != ''){
        for (let i = 0; i < value.length; i++) {
          if(simbolosNotMoneda.indexOf(value.charAt(i),0)!=-1){valCosto = false; break}
          if(this.letters.indexOf(value.charAt(i),0)!=-1){valCosto = false; break}
        }
        if(valCosto){
          if(opcion == 1) this.inputValCostoDepto = true;
          if(opcion == 2) this.inputValEditCostoDepto = true;
        }else{
          if(opcion == 1) this.inputValCostoDepto = false;
          if(opcion == 2) this.inputValEditCostoDepto = false;
          this.messaggeCostoDepto = 'No se permite caracteres literarios ni símbolos.';
        }

      }else{
        if(opcion == 1) this.inputValCostoDepto = false;
        if(opcion == 2) this.inputValEditCostoDepto = false;
        this.messaggeCostoDepto = 'El campo debe ser llenado obligatoriamente con caracteres numéricos.';
      }
    }
  }

  inputLimiteDepartamento(value, opcion){
    var valLimite = true;
    if(value != null){
      if(value.length > 0 && value != ''){
        for (let i = 0; i < value.length; i++) {
          if(this.simbolos.indexOf(value.charAt(i),0)!=-1){valLimite = false; break}
          if(this.letters.indexOf(value.charAt(i),0)!=-1){valLimite = false; break}
        }
        if(valLimite){
          if(opcion == 1) this.inputValLimiteDepto = true;
          if(opcion == 2) this.inputValEditLimiteDepto = true;
        }else{
          if(opcion == 1) this.inputValLimiteDepto = false;
          if(opcion == 2) this.inputValEditLimiteDepto = false;
          this.messaggeLimiteDepto = 'No se permite caracteres literarios ni símbolos.';
        }
      }else{
        if(opcion == 1) this.inputValLimiteDepto = false;
        if(opcion == 2) this.inputValEditLimiteDepto = false;
        this.messaggeLimiteDepto = 'El campo debe ser llenado obligatoriamente con caracteres numéricos.';
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
      this.departamentos = departamentos; 
      this.departamentosArray = departamentos;
    });
    
  }

  //Buscar Departamento
  searchDepartamento(value:string){
    let array:Departamento[] = [];
    value = value.toLowerCase();
    this.departamentos = this.departamentosArray;
    for(let item of this.departamentos){
      if(item.nombreDepartamento.toLowerCase().indexOf(value) >= 0){
        array.push(item);        
      }  
    }
    this.departamentos = array; 
  }

  getInfoDepartamento(idDepartamento:string){

    for(let departamento of this.departamentos){
      if(departamento.idDepartamento == idDepartamento){

        if(departamento.organizacionDepartamento){
          if (departamento.persona.segundoNombre == null && departamento.persona.segundoApellido != null ) {
            this.nombreCompleto = departamento.persona.primerNombre + " " + departamento.persona.primerApellido + " " + departamento.persona.segundoApellido;
          } else if (departamento.persona.segundoNombre == null && departamento.persona.segundoApellido == null){
            this.nombreCompleto = departamento.persona.primerNombre + " " + departamento.persona.primerApellido; 
          }else if (departamento.persona.segundoNombre != null && departamento.persona.segundoApellido == null){ 
            this.nombreCompleto = departamento.persona.primerNombre + " " + departamento.persona.segundoNombre + " " + departamento.persona.primerApellido;   
          }else{
            this.nombreCompleto = departamento.persona.primerNombre + " " + departamento.persona.segundoNombre + " " + departamento.persona.primerApellido + " " + departamento.persona.segundoApellido;
          }
          this.nacionalidad = departamento.persona.nacionalidad;
          this.direccion = departamento.persona.direccion;
          this.celular = departamento.persona.celular;
          this.ci = departamento.persona.ci;
          this.fechaNacimiento = departamento.persona.fechaNacimiento;
          this.estadoPersona = departamento.persona.estadoPersona;
        }else{
          this.nombreCompleto = null;
          this.nacionalidad = null;
          this.direccion = null;
          this.celular = null;
          this.ci = null;
          this.fechaNacimiento = null;
          this.estadoPersona = null;
        }
        if(departamento.historialDepartamento){
          this.fechaRegistroHistorialDep = departamento.historialDepartamento.fechaRegistroHistorialDepartamento;
          this.limiteEstudiante = departamento.historialDepartamento.limiteEstudiante;
          this.costoHora = departamento.historialDepartamento.costoHora;
          this.estadoDepartamento = departamento.historialDepartamento.estadoHistorialDepartamento; 
        }else{
          this.fechaRegistroHistorialDep = null;
          this.limiteEstudiante = "0";
          this.costoHora = null;
          this.cantidadEstudiantes = "0";
          this.cupos = "0";
          this.estadoDepartamento = null;
        }
        
        this.codigoDepartamento = departamento.idDepartamento;               
        this.nombreDepartamento = departamento.nombreDepartamento;
      }
    }
  }

  searchPutDepartamento(idDepartamento:string){
    //para desmarcar lo invalido de los inputs
    this.inputValEditNameDepto = true;
    //llenado de los inputs
    for(let departamento of this.departamentos){
      if(departamento.idDepartamento == idDepartamento){
        this.departamento.idDepartamento = departamento.idDepartamento;
        this.departamento.nombreDepartamento = departamento.nombreDepartamento;       
      }
    }
  }

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
    if(!this.departamento.nombreDepartamento){this.inputValEditNameDepto = false;this.messaggeNameDepto = 'El campo debe ser llenado obligatoriamente.';}
    if(this.inputValEditNameDepto){
      this.departamento.estadoDepartamento = "1";
      this._appDepartamentoService.putDepartamento(this.departamento, this.departamento.idDepartamento)
        .subscribe((data:Departamento[]) => {
          this.getDepartamentos();
          this.alert(1, 'Actualización exitoso','El registro del departamento se realizó satisfactoriamente.');
        }, res =>{
          this.alert(2, 'Error al actualizar','Se ha producido un error en el servidor.');
        })
    }    
  }

  editEstadoDepartamento(idDepartamento:string, estado:string){
    this.departamento.estadoDepartamento = estado;
    this._appDepartamentoService.putEstadoDepartamento(this.departamento, idDepartamento)
      .subscribe((data : Departamento[]) => {console.log(data)});

      setTimeout(() => {
        this.getDepartamentos();
      }, 2000);
  }

  deleteDepartameto(idDepartamento:string, eliminar:boolean){
    this.codigoDepartamento = idDepartamento;
    if(!eliminar){
      this.alert(3, 'Error al eliminar','No se puede eliminar por que se encuentra en un estado habilitado.');
    }
  }
  //una vez confirmado lo eliminamos
  eliminarDepartamento(){
    this._appDepartamentoService.deleteDepartamento(this.codigoDepartamento)
    .subscribe((data : Departamento[]) => {
      this.getDepartamentos();
      this.alert(1, 'Departamento eliminado','El departamento fue eliminado satisfactoriamente.');
    }, res =>{
      this.alert(2, 'Error al eliminar','Se ha producido un error en el servidor.');
    })
  }

  //GESTION HISTORIAL DEPARTAMENTOS

  getHistorialesDepartamento(idDepartamento:string){
    this.inputValCostoDepto = true;
    this.inputValLimiteDepto = true;
    this.historialDepartamento.costoHora = "";
    this.historialDepartamento.limiteEstudiante = "";
    this._appDepartamentoService.getHistorialesDepartamento(idDepartamento)
    .subscribe((data:Departamento[]) =>{
      this.historialesDepartamento = data;
      this.historialDepartamento.idDepartamento = idDepartamento;
    })
  }

  saveHistorialDepartamento(){
    if(!this.historialDepartamento.costoHora){this.inputValCostoDepto = false;this.messaggeCostoDepto = 'El campo debe ser llenado obligatoriamente.';}
    if(!this.historialDepartamento.limiteEstudiante){this.inputValLimiteDepto = false;this.messaggeLimiteDepto = 'El campo debe ser llenado obligatoriamente.';}
    if(this.inputValCostoDepto && this.inputValLimiteDepto){
      this._appDepartamentoService.postHistorialDepartamento(this.historialDepartamento)
        .subscribe((data:HistorialDepartamento[]) =>{
          this.getDepartamentos();
          this.getHistorialesDepartamento(this.historialDepartamento.idDepartamento);
          this.alert(1, 'Registro exitoso','El registro del departamento se realizó satisfactoriamente.');
        }, res =>{
          this.alert(2, 'Error al registrar','Se ha producido un error en el servidor.');
        })
    }  
  }

  searchEditHistorialDepartamento(idHistorialDepartamento){
    for(let historialDepto of this.historialesDepartamento){
      if(historialDepto.idHistorialDepartamento == idHistorialDepartamento){
        this.historialDepartamento.idDepartamento = historialDepto.idDepartamento;
        this.historialDepartamento.idHistorialDepartamento = historialDepto.idHistorialDepartamento;
        this.historialDepartamento.costoHora = historialDepto.costoHora;
        this.historialDepartamento.limiteEstudiante = historialDepto.limiteEstudiante;
      }
    }
  }

  editHistorialDepartamento(){
    this._appDepartamentoService.putHistorialDepartamento(this.historialDepartamento.idHistorialDepartamento, this.historialDepartamento)
      .subscribe((data:Departamento []) => {
        this.getDepartamentos();
        this.getHistorialesDepartamento(this.historialDepartamento.idDepartamento);
        this.alert(1, 'Actualización exitoso','La actualización del historial del departamento se realizó satisfactoriamente.');
      }, res =>{
        this.alert(2, 'Error al actualizar','Se ha producido un error en el servidor.');
      })
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

  deleteHistorialDepartamento(idHistorialDepartamento, eliminar:boolean){
    this.historialDepartamento.idHistorialDepartamento = idHistorialDepartamento;
    if(!eliminar){
      this.alert(3, 'Error al eliminar','No se puede eliminar por que se encuentra en un estado habilitado.');
    }
  }

  confirmDeleteHistorialDepartamento(){
    this._appDepartamentoService.deleteHistorialDepartamento(this.historialDepartamento.idHistorialDepartamento)
      .subscribe((data:Departamento[]) => {
        this.getHistorialesDepartamento(this.historialDepartamento.idDepartamento);
        this.alert(1, 'Historial eliminado','El historial del departamento fue eliminado satisfactoriamente.');
      })
  }

  //GESTIONAR ORGANIZACION DEPARTAMENTO
  //Metodo para obtener los departamentos sin Jefes de Dep -> PERO aun falta perfeccionar
  getOrganizacionDepartamento(idDepartamento:string){
   this._appDeptOrgService.getOrgDepartamento(idDepartamento)
   .subscribe((departamentos:Organizacion[]) => { this.listDepSJ = departamentos});
  }
  //Listar todos las personas con rol de jefe de departamento
  getJefesDeptarmento(){
    this._appDeptOrgService.getAdministracion("4")
      .subscribe((data:Organizacion[]) => {
        this.listJefesDepto = data;
      })
  }
  //Lsitar el historial de un departamento de los jefes de departamento
  getEncargadosDepartamento(idDepartamento:string){
    this._appDeptOrgService.getEncargadoDepartamento(idDepartamento)
      .subscribe((data : Departamento[]) => {
        this.organizacionDepartamento = data;
        this.departamento.idDepartamento = idDepartamento;
        console.log(this.organizacionDepartamento);
      })
  }

  saveOrganizacion(idPersona){
    this.departamento.idPersona = idPersona;
    this._appDeptOrgService.postOrganizacionDepartamento(this.departamento)
      .subscribe((data:Departamento[]) =>{ 
        this.getEncargadosDepartamento(this.departamento.idDepartamento);
        this.getDepartamentos();
        this.alert(1, 'Registro exitoso','El registro del nuevo encargado se realizó satisfactoriamente.');
      }, res =>{
        this.alert(2, 'Error al registrar','Se ha producido un error en el servidor.');
      })  
  }

  deleteOrganizacion(idOrganizacion, eliminar:boolean){
    this.departamento.idOrganizacion = idOrganizacion;
    if(!eliminar){
      this.alert(3, 'Error al eliminar','No se puede eliminar por que se encuentra en un estado habilitado.');
    }
    console.log(this.departamento);
  }

  confirmarDeleteOrganizacion(){
    this._appDeptOrgService.deleteOrganizacion(this.departamento.idOrganizacion)
    .subscribe((data:Departamento[]) => {
      this.getEncargadosDepartamento(this.departamento.idDepartamento);
      this.alert(1, 'Registro eliminado','El registro del encargado fue eliminado satisfactoriamente.');
    }, res =>{
      this.alert(2, 'Error al eliminar','Se ha producido un error en el servidor.');
    }) 
  }

}