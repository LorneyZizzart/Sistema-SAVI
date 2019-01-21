import { Component, OnInit } from '@angular/core';
import { AppAreaService } from '../../services/app-area.service';
import { Area } from '../../interfaces/area.interface';


@Component({
  selector: 'app-gestionar-area',
  templateUrl: './gestionar-area.component.html',
  styleUrls: ['./gestionar-area.component.css']
})
export class GestionarAreaComponent implements OnInit {
  
  nameDept:string = "";
  //GestionarArea
  MessageDelete:boolean = false;
  MessageFailArea:boolean = false;
  MessageSuccessArea:boolean = false;
  MessageEnabled:Boolean = false;
  MessageDisabled:Boolean = false;
  listaAreaDepartamento:Area[];
  private area:Area = {
    idDepartamento: "",
    nombreArea: ""
  }
  private estadoUpdate:Area = {
    estadoArea: ""
  }

  constructor( private _appAreaService : AppAreaService) {
    
   }

  ngOnInit() {
    this.getAreaDepartamento("1");
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
  deleteArea(idArea:Area){
    this._appAreaService.deleteArea(idArea).subscribe((data : Area[])=>{console.log(data)})
    this.MessageDelete = true;
    setTimeout(() => {
      this.getAreaDepartamento("1");
    }, 2000);
    setTimeout(() => {
      this.MessageDelete = false;
    }, 8000);
  }
 
}
