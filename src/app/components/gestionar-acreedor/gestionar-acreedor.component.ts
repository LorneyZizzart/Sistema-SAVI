import { Component, OnInit } from '@angular/core';
import { AppAcreedorService } from '../../services/app-acreedor.service';
import { Acreedor } from '../../interfaces/acreedor.interface';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';
import { Descuento } from '../../interfaces/descuento.interface';
import { AppDescuentoService } from '../../services/app-descuento.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { Convenio } from 'src/app/interfaces/convenio.interface';



@Component({
  selector: 'app-gestionar-acreedor',
  templateUrl: './gestionar-acreedor.component.html',
  styleUrls: ['./gestionar-acreedor.component.css']
})
export class GestionarAcreedorComponent implements OnInit {
  //iDUSUARIO
  IdUsuario:string;
  //Lista de acreedores
  acreedores:Acreedor[];
  //Lista de estudiantes del departameto
  estudiantes:Convenio[];
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
  estadoConvenio:string;
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
              private _appDescuentoService:AppDescuentoService,
              private _authService:AuthService,
              private _router:Router) { }

  ngOnInit() {
    this.listaAcreedores();
    this.getEstudiantes();
    this.getUsuario();
  }

  getUsuario(){
    let usuario = this._authService.getDatosPersonales();
    this.IdUsuario = usuario.idUsuario;  
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
          if (this.areas.indexOf(estudiante.nombreArea) < 0) {
            this.areas.push(estudiante.nombreArea);            
          }
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
    this.descuento.saldoInicial = saldo;
    this.acreedor.idAcreedor = idAcreedor;
    this.Saldo = saldo;
    this.inputSaldo = saldo + " Bs."
    this.acreedor.idInformeEstudiante = idInformeEstudiante;
    this.acreedor.idConvenio = idConvenio;
    this.acreedor.montoBs = '00.00';
    this.inputDescontar = '00.00';
  }
  confirmarDescuento(){
    this.acreedor.idUsuario = this.IdUsuario;
    this.acreedor.estadoAcreedor = '0';
    this.descuento.idUsuario = this.IdUsuario;
    this.editAcreedor(this.acreedor);
    this.saveDescuento(this.descuento);
    setTimeout(() => {
      this.listaAcreedores();
    }, 2000);
  }
  //Gestionar Acreditacion
  editAcreedor(acreedor:Acreedor){
    this._appAcreedorService.putAcreedor(acreedor).subscribe((acreedor:Acreedor[])=>{console.log(acreedor)});
  }
  //Gestionar Descuentos
  saveDescuento(descuento:Descuento){    
    this._appDescuentoService.postDescuentos(descuento).subscribe((descuento:Descuento[]) => {});
    this.MessageDescuento = true;
    setTimeout(() => {
      this.MessageDescuento = false;
    }, 6000);
  }

  verAcreedorHistorial(idConvenio){
    this._router.navigate(['/acreedorHistorial', idConvenio]);  
  }

}
