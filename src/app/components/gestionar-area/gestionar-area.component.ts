import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
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
  listaAreaDepartamento:Area[];
  private area:Area = {}
  private estadoUpdate:Area = {}

  //Lista de estudiantes del departamento correspondiente
  estudiantes:Persona[];
  //PAra registrar asignar area
  idConvenio:string;
  idArea:string;
  //Lista de las areas con sus respectivos estudiantes
  studentArea:Area[];
  //NOMBRE AREA
  nombreArea:string;
  IdArea:Area;

  constructor( private _appAreaService : AppAreaService, 
               private _appTipoPersonaService : AppTipoPersonaService,
               private _authService : AuthService) {
    
   }

  ngOnInit() {
      this.getDepartamentoUser(); 
      this.getAreaDepartamento(this.departamento[0].idDepartamento);
      this.getAsignacionArea(this.departamento[0].idDepartamento);        
  }

  ngOnDestroy(): void {
  }

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
  //Gestion Departamento
  getDepartamentoUser(){
    this.departamento =  this._authService.getDatosDepartamento();
  }


  getEstudiantes(){
    this._appTipoPersonaService.getListStudentDepto(this.departamento[0].idDepartamento)
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
      this.area.idDepartamento = this.departamento[0].idDepartamento;
      this._appAreaService.postArea(this.area).subscribe((area:Area[])=>{
        this.getAreaDepartamento(this.departamento[0].idDepartamento);
        this.alert(1, 'Registro exitoso', 'El área del departamento se registro satisfactoriamente.');
      }, res => {
        this.alert(2, 'Error al registrar', 'Se ha producido un error en el servidor al registrar.');
      });
    }else{
      this.alert(2, 'Error al registrar', 'Se ha producido un error al registrar el sistema.');
    }
  }

  editEstadoArea(idArea:Area, estado:string){
      this.estadoUpdate.estadoArea = estado; 
      this._appAreaService.putEstado(this.estadoUpdate, idArea).subscribe((data : Area[]) => {
        this.getAreaDepartamento(this.departamento[0].idDepartamento);
        if(estado == "1")
        this.alert(1, 'Registro exitoso', 'El área fue habilitada satisfactoriamente.');
        else this.alert(1, 'Registro exitoso', 'El área fue deshabilitado satisfactoriamente.');
      }, res => {
        this.alert(2, 'Error al registrar', 'Se ha producido un error en el servidor.');
      })
  }

  editarArea(){}
  deleteArea(idArea:string){
    this.idArea = idArea;
  }

  eliminarArea(){
    
    this._appAreaService.deleteArea(this.idArea)
    .subscribe((data : Area[])=>{
      this.getAreaDepartamento(this.departamento[0].idDepartamento);  
      this.alert(1, 'Registro eliminado', 'El área fue eliminado satisfactoriamente.');
      }, res => {
        this.alert(2, 'Error al eliminar', 'Se ha producido un error en el servidor al eliminar.');
      });
  }

  //gestionar asignacion area aun no se ejecuta
  getAsignacionArea(idDepartamento:string){
    this._appAreaService.getAsignacionArea(idDepartamento)
    .subscribe((area : Area []) => { this.studentArea = area})
  }

  saveAsignarArea(idConvenio, idArea, form){ 

      this.area.idConvenio = idConvenio;
      this.area.idArea = idArea;
  
      this._appAreaService.postAsignarArea(this.area)
      .subscribe((area : Area[]) => {
        this.alert(1, 'Registro exitoso', 'El registro de asignación se realizó satisfactoriamente.');
        this.resetForm(form);
      }, res => {
        this.alert(2, 'Error al registrar', 'Se ha producido un error en el servidor al registrar.');
      })

    
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
