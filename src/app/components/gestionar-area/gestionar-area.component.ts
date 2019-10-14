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
  auxListaAreaDepartamento:Area[];
  private area:Area = {}
  private estadoUpdate:Area = {}

  //Lista de estudiantes del departamento correspondiente
  estudiantes:Persona[];
  //PAra registrar asignar area
  idConvenio:string;
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

  // gestionar area
  buscarArea(nombre:string){
    let array:Area[] = [];
    nombre = nombre.toLowerCase();
    var name;
    this.listaAreaDepartamento = this.auxListaAreaDepartamento;
    for(let l of this.listaAreaDepartamento){
      name = l.nombreArea.toLocaleLowerCase();
      if(name.indexOf(nombre) >= 0){
        array.push(l);        
      }  
    }
    this.listaAreaDepartamento = array;     
  }


  getAreaDepartamento(idDepto:string){
    this._appAreaService.getAreasDepartamento(idDepto)
    .subscribe((areas : Area[]) => {
      if(areas.length > 0 ){
        this.listaAreaDepartamento = areas;
        this.auxListaAreaDepartamento = this.listaAreaDepartamento;
      }
      
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

  editArea(nombreArea:string, idArea:string){
    this.area.nombreArea = nombreArea;
    this.area.idArea = idArea;   
  }

  putArea(){
    this._appAreaService.putArea(this.area, this.area.idArea)
    .subscribe((data : Area[])=>{
      this.getAreaDepartamento(this.departamento[0].idDepartamento);  
      this.alert(1, 'Registro actualizado', 'El área fue actualizado satisfactoriamente.');
      }, res => {
        this.alert(2, 'Error al actualizar', 'Se ha producido un error en el servidor al actualizar.');
      });
  }

  deleteArea(idArea:string){
    this.area.idArea = idArea;
  }

  eliminarArea(){
    this._appAreaService.getAsignacionArea(this.area.idArea)
    .subscribe((area : Area []) => {       
      if(area.length == 0){        
        this._appAreaService.deleteArea(this.area.idArea)
        .subscribe((data : Area[])=>{
          this.getAreaDepartamento(this.departamento[0].idDepartamento);  
          this.alert(1, 'Registro eliminado', 'El área fue eliminado satisfactoriamente.');
          }, res => {
            this.alert(2, 'Error al eliminar', 'Se ha producido un error en el servidor al eliminar.');
          });
      }else{
        this.alert(3, 'Alerta de ejecución', 'No se puede eliminar por que tiene estudiantes asignados al área.');
      }      
    })    
  }

  //gestionar asignacion area aun no se ejecuta
  verAsignacionArea(nombreArea:string, idArea:string){
    this.nombreArea = nombreArea;
    this.getAsignacionArea(idArea);
  }

  getAsignacionArea(idArea:string){
    this._appAreaService.getAsignacionArea(idArea)
    .subscribe((area : Area []) => {       
      if(area.length > 0){        
        this.studentArea = area;
      }else{
        this.studentArea = null;
      }      
    })
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

  editAsignacion(idArea:string, idAsignacion:string, estado:string){
    this.area.estadoAsignacion = estado;
    this._appAreaService.putAsignacionArea(idAsignacion, this.area)
    .subscribe((data: Area[]) => {
      this.getAsignacionArea(idArea);
      if(estado ==  '1')
      this.alert(1, 'Habilitación exitoso', 'El estudiante fue habilitado satisfactoriamente.');
      else this.alert(1, 'Deshabilitación exitoso', 'El estudiante fue deshabilitado satisfactoriamente.');
    }, res => {
      this.alert(2, 'Error al cambiar de estado', 'Se ha producido un error en el servidor al cambiar de estado.');
    });
  }
  //obtenemso el id del convenio para luego cambiarle de area
  cambiarArea(idConvenio:string, idAsignacion:string,){
    this.area.idConvenio = idConvenio;
    this.area.idAsignacionArea = idAsignacion;
  }

  putAsignacionArea(idArea:string){
    this.area.idArea = idArea;
    this._appAreaService.putCambiarArea(this.area.idAsignacionArea, this.area)
    .subscribe((data: Area[]) => {
      this.getAsignacionArea(idArea);
      this.alert(1, 'Registro exitoso', 'El estudiante fue cambiado de área satisfactoriamente.');
    }, res => {
      this.alert(2, 'Error al cambiar', 'Se ha producido un error en el servidor al cambiar de área.');
    });
  }

  deleteAsignacion(idArea:string, idAsignacion:string){
    this._appAreaService.deleteAsignacionArea(idAsignacion)
    .subscribe((data :Area[]) => {
      this.getAsignacionArea(idArea);
      this.alert(1, 'Baja satisfactoriamente', 'Se dio de baja al estudiante de la area satisfactoriamente.');
    }, res => {
      this.alert(2, 'Error', 'Se ha producido un error en el servidor al eliminar al estudiante de la área.');
    });
  }
}
