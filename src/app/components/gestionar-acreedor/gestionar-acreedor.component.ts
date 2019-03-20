import { Component, OnInit } from '@angular/core';
import { AppAcreedorService } from '../../services/app-acreedor.service';
import { Acreedor } from '../../interfaces/acreedor.interface';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';
import { Descuento } from '../../interfaces/descuento.interface';
import { AppDescuentoService } from '../../services/app-descuento.service';

@Component({
  selector: 'app-gestionar-acreedor',
  templateUrl: './gestionar-acreedor.component.html',
  styleUrls: ['./gestionar-acreedor.component.css']
})
export class GestionarAcreedorComponent implements OnInit {
  //iDUSUARIO
  IdUsuario:string = "4";
  //Lista de acreedores
  acreedores:Acreedor[];
  //Lista de estudiantes del departameto
  estudiantes:Persona[];
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
  beca:string;
  estadoConvenio:boolean;
  nombreDepartamento:string;
  fotocopiaCI;
  solicitudWork;
  fechaInicio;
  fechaFinal;
  observacionesRegistroHora:string;
  areas:any[] = [];
  //lista de descuentos
  descuento:Descuento = {};
  //Regsitrar Acreedor
  acreedor:Acreedor = {};
  //Para el descuento
  Saldo:string;inputSaldo:string;inputDescontar:string='00.00';
  //message de descuento
  MessageDescuento:boolean = false;

  constructor(private _appAcreedorService:AppAcreedorService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appDescuentoService:AppDescuentoService) { }

  ngOnInit() {
    this.listaAcreedores();
    this.getEstudiantes();
  }

  listaAcreedores(){
    this._appAcreedorService.getAcreedor().subscribe((acreedores : Acreedor[]) => {this.acreedores = acreedores})
  }

  getEstudiantes(){
    this._appTipoPersonaService.getInfoStudentFinanzas()
    .subscribe((estudiantes : Persona[]) => {this.estudiantes = estudiantes});
  }

  infoFullName(idEstudiante){
    for(let estudiante of this.estudiantes){
      if(estudiante.idPersona == idEstudiante){
        if (estudiante.segundoNombre == null && estudiante.segundoApellido != null ) {
          this.nombreCompleto = estudiante.primerApellido + " " + estudiante.segundoApellido+ " " + estudiante.primerNombre ;
        } else if (estudiante.segundoNombre == null && estudiante.segundoApellido == null){
          this.nombreCompleto = estudiante.primerApellido + " " + estudiante.primerNombre; 
        }else if (estudiante.segundoNombre != null && estudiante.segundoApellido == null){ 
          this.nombreCompleto = estudiante.primerApellido + " " + estudiante.primerNombre + " " + estudiante.segundoNombre;
        }else{
          this.nombreCompleto = estudiante.primerApellido + " " + estudiante.segundoApellido + " " + estudiante.primerNombre + " " + estudiante.segundoNombre;
        }
      }
    }
  }

  informacionEstudiante(idEstudiante){
    this.areas = [];
    this.infoFullName(idEstudiante);
    for(let estudiante of this.estudiantes){
      if(estudiante.idPersona == idEstudiante){        
          this.nacionalidad = estudiante.nacionalidad;
          this.direccion = estudiante.direccion;
          this.celular = estudiante.celular;
          this.ci = estudiante.ci;
          this.fechaNacimiento = estudiante.fechaNacimiento;
          this.estadoPersona = estudiante.estadoPersona;
          this.carrera = estudiante.carrera;
          this.semestre = estudiante.semestre;
          this.nombreDepartamento = estudiante.departamento;
          this.beca = estudiante.beca;
          this.estadoConvenio = estudiante.estadoConvenio;
          this.fechaInicio = estudiante.fechaInicio;
          this.fechaFinal = estudiante.fechaFinal;
          this.fotocopiaCI = estudiante.fotocopiaCarnet;
          this.solicitudWork = estudiante.solicitudTrabajo;
          this.areas.push(estudiante.nombreArea);
      }
    }
  }

  descontarSaldo(){
    if(this.inputDescontar.length > 0 ){
      this.acreedor.montoBs = ((parseFloat(this.Saldo) - parseFloat(this.inputDescontar)).toFixed(2)).toString();
      this.descuento.montoDescuento = this.inputDescontar;
    }else{
      this.acreedor.montoBs = '00.00';
    }
  }

  aprobarDescuento(idAcreedor, saldo, idInformeEstudiante, idConvenio){
    this.descuento.idAcreedor = idAcreedor;
    this.Saldo = saldo;
    this.inputSaldo = saldo + " Bs."
    this.acreedor.idInformeEstudiante = idInformeEstudiante;
    this.acreedor.idConvenio = idConvenio;
    this.acreedor.montoBs = '00.00';
    this.inputDescontar = '00.00';
  }
  confirmarDescuento(){
    this.descuento.idUsuario = this.IdUsuario;
    this.saveDescuento(this.descuento);
    this.editAcreedor(this.acreedor.idConvenio, this.acreedor);
    setTimeout(() => {
      this.listaAcreedores();
    }, 2000);
  }
  //Gestionar Acreditacion
  editAcreedor(idConvenio:string, acreedor:Acreedor){
    this._appAcreedorService.putSaldoAcreedor(idConvenio, acreedor).subscribe((acreedor:Acreedor[])=>{});
  }
  //Gestionar Descuentos
  saveDescuento(descuento:Descuento){    
    this._appDescuentoService.postDescuentos(descuento).subscribe((descuento:Descuento[]) => {});
    this.MessageDescuento = true;
    setTimeout(() => {
      this.MessageDescuento = false;
    }, 6000);
  }

}
