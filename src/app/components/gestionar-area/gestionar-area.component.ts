import { Component, OnInit } from '@angular/core';
import { AppAreaService } from '../../services/app-area.service';
import { Area } from '../../interfaces/area.interface';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-gestionar-area',
  templateUrl: './gestionar-area.component.html',
  styleUrls: ['./gestionar-area.component.css']
})
export class GestionarAreaComponent implements OnInit {

  //Id dep Departamento
  IdDepartamento:string  = "25";
  //departamentos a cargo
  departamento:Departamento;
  nameDept:string = "";
  //ALERTS
  titleAlert:string = null;
  messageAlert:string = null;
  activateAlert:boolean = false;
  alertSuccess:Boolean = false;
  alertError:Boolean = false;
  alertWarning:boolean = false;
  //GestionarArea
  MessageEnabled:Boolean = false;
  MessageDisabled:Boolean = false;
  listaAreaDepartamento:Area[];
  private area:Area = {}
  private estadoUpdate:Area = {}

  //Lista de estudiantes del departamento correspondiente
  estudiantes:Persona[];
  //PAra registrar asignar area
  idConvenio:string;
  idArea:string;
  //Message de confirmacion de delete
  messageYdelete:boolean = false;
  //Lista de las areas con sus respectivos estudiantes
  studentArea:Area[];
  //NOMBRE AREA
  nombreArea:string;
  IdArea:Area;
  //message de asignacoin de area
  MessageSuccessAsignacion:boolean = false;
  MessageFailAsignacion:boolean = false;
  constructor( private _appAreaService : AppAreaService, 
               private _appTipoPersonaService : AppTipoPersonaService,
               private _authService : AuthService) {
    
   }

  ngOnInit() {
    if(this.IdDepartamento == "0"){
      this.getDepartamentosUser(); 
    }else{
      this.searchDepartament(this.IdDepartamento);
    }
        
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
      this.MessageDisabled = true;      
      setTimeout(() => {
        this.MessageDisabled = false;
      }, 8000);
    }else if (value == 'activo') {
      this.MessageEnabled = true;
      setTimeout(() => {
        this.MessageEnabled = false;
      }, 8000);
    }
  }
  //Gestion Departamento
  getDepartamentosUser(){
    this.departamento =  this._authService.getDatosDepartamento();
  }

  searchDepartament(idDepartamento){
    this.departamento =  this._authService.getDatosDepartamento();
    console.log("id: ", idDepartamento);
    let array:Departamento[] = [];  
    if(idDepartamento){
      this.IdDepartamento = idDepartamento;
      this.getAreaDepartamento(this.IdDepartamento);
      this.getAsignacionArea(this.IdDepartamento); 
    }      
  }

  getEstudiantes(idDepartamento:string){
    this._appTipoPersonaService.getListStudentDepto(idDepartamento)
    .subscribe((estudiantes : Persona[]) => {this.estudiantes =  estudiantes});
  }

  getAreaDepartamento(idDepto:string){
    this._appAreaService.getAreasDepartamento(idDepto)
    .subscribe((areas : Area[]) => {
      this.listaAreaDepartamento = areas
    });
  }
  
  saveArea(){
    if (this.area.nombreArea != null) {
      this.area.idDepartamento = this.IdDepartamento;
      this._appAreaService.postArea(this.area).subscribe((area:Area[])=>{
        this.getAreaDepartamento(this.IdDepartamento);
        this.alert(1, 'Registro exitoso', 'El área del departamento se registro satisfactoriamente.');
      }, res => {
        this.alert(2, 'Error al registrar', 'Se ha producido un error en el servidor al registrar.');
      });
    }else{
      this.alert(2, 'Error al registrar', 'Se ha producido un error al registrar el sistema.');
    }
  }

  editEstadoArea(idArea:Area, estado:string){
    
    if(estado != ""){
      this.estadoUpdate.estadoArea = estado; 
      this._appAreaService.putEstado(this.estadoUpdate, idArea).subscribe((data : Area[]) => {console.log(data)})

      if(estado == "1"){
        this.messageEnableDesable('activo');
      }else{this.messageEnableDesable('inactivo');}
    }else{} 

    setTimeout(() => {
      this.getAreaDepartamento("1");
    }, 2000);
  }

  editarArea(){}
  deleteArea(idArea:string){
    this.idArea = idArea;
  }

  eliminarArea(){
    this._appAreaService.deleteArea(this.idArea)
    .subscribe((data : Area[])=>{console.log(data)})
    this.messageYdelete = true;
    setTimeout(() => {
    this.getAreaDepartamento(this.IdDepartamento);      
    }, 2000);
    setTimeout(() => {
      this.messageYdelete = false;
    }, 8000);
  }

  //gestionar asignacion area aun no se ejecuta
  getAsignacionArea(idDepartamento:string){
    this._appAreaService.getAsignacionArea(idDepartamento)
    .subscribe((area : Area []) => { this.studentArea = area})
  }

  saveAsignarArea(){
    if(this.idConvenio != null && this.idArea != null){
      this.area.idConvenio = this.idConvenio;
      this.area.idArea = this.idArea;
  
      this._appAreaService.postAsignarArea(this.area)
      .subscribe((area : Area[]) => {console.log(area)})

      this.MessageSuccessAsignacion = true;
      setTimeout(() => {
      this.MessageSuccessAsignacion = false;        
      }, 6000);
    }else{
      this.MessageFailAsignacion = true;
      setTimeout(() => {
      this.MessageFailAsignacion = false;        
      }, 6000);
    }
    
  }

  verStudentArea(idArea:Area){    
    // this.listStudent= [{id:0, area:[]}];
    // var i = 1;

    for(let student of this.studentArea){
      if(student.idArea == idArea){
        this.nombreArea = student.nombreArea;
        // this.listStudent.push({id:i, area:[]});
        // this.listStudent[i].area.push(student);
        // i++;
      }
    }
    this.IdArea = idArea;
  }

  editAsignacion(idAsignacion:string, estado:string){
    this.area.estadoAsignacion = estado;
    this._appAreaService.putAsignacionArea(idAsignacion, this.area)
    .subscribe((data: Area[]) => {console.log(data)});
    setTimeout(() => {
      this.getAsignacionArea(this.IdDepartamento);
    }, 2000);
  }
  deleteAsignacion(idAsignacion:string){
    this._appAreaService.deleteAsignacionArea(idAsignacion)
    .subscribe((data :Area[]) => {console.log(data)});
    setTimeout(() => {
      this.getAsignacionArea(this.IdDepartamento);
    }, 2000);
  }
}
