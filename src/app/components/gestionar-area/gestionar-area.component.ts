import { Component, OnInit } from '@angular/core';
import { AppAreaService } from '../../services/app-area.service';
import { Area } from '../../interfaces/area.interface';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';



@Component({
  selector: 'app-gestionar-area',
  templateUrl: './gestionar-area.component.html',
  styleUrls: ['./gestionar-area.component.css']
})
export class GestionarAreaComponent implements OnInit {

  //Id dep Departamento
  IdDepartamento:string  = "1";
  nameDept:string = "";
  //GestionarArea
  MessageFailArea:boolean = false;
  MessageSuccessArea:boolean = false;
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

  constructor( private _appAreaService : AppAreaService, 
               private _appTipoPersonaService : AppTipoPersonaService) {
    
   }

  ngOnInit() {
    this.getAreaDepartamento(this.IdDepartamento);
  }

  ngOnDestroy(): void {
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

  getEstudiantes(idDepartamento:string){
    this._appTipoPersonaService.getListStudentDepto(idDepartamento)
    .subscribe((estudiantes : Persona[]) => {this.estudiantes =  estudiantes});
  }

  getAreaDepartamento(idDepto:string){
    this._appAreaService.getAreasDepartamento(idDepto)
    .subscribe((areas : Area[]) => {this.listaAreaDepartamento = areas});
  }
  
  saveArea(){
    if (this.area.nombreArea != null) {
      this.area.idDepartamento = "1";
      this._appAreaService.postArea(this.area).subscribe((area:Area[])=>{console.log(area)});

      this.MessageSuccessArea = true;
      setTimeout(()=>{
        this.MessageSuccessArea = false;
    }, 5000);
    }else{

      this.MessageFailArea = true;
      setTimeout(()=>{
        this.MessageFailArea = false;
      }, 5000);
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

  //gestionar asignacion area
  saveAsignarArea(){
    this.area.idConvenio = this.idConvenio;
    this.area.idArea = this.idArea;

    this._appAreaService.postAsignarArea(this.area)
    .subscribe((area : Area[]) => {console.log(area)})
  }

 
}
