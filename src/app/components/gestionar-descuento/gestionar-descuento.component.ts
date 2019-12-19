import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { AppDescuentoService } from '../../services/app-descuento.service';
import { Descuento } from '../../interfaces/descuento.interface';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';
import { AppAcreedorService } from '../../services/app-acreedor.service';
import { Acreedor } from '../../interfaces/acreedor.interface';
import { Convenio } from 'src/app/interfaces/convenio.interface';
import { AppCarreraService } from '../../services/app-carrera.service';
import { Carrera } from '../../interfaces/carrera.interface';
import { AppAreaService } from '../../services/app-area.service';
import { Area } from 'src/app/interfaces/area.interface';

@Component({
  selector: 'app-gestionar-descuento',
  templateUrl: './gestionar-descuento.component.html',
  styleUrls: ['./gestionar-descuento.component.css']
})
export class GestionarDescuentoComponent implements OnInit {
  //iDUSUARIO
  IdUsuario:string = "4";
  infoEstudiante:Convenio[];
  descuentos:Descuento [];
  //Info Estudiante
  codEstudiante:string;
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
  areas:any[] = [];
  //consultas redundates
  idInfoStudent = 0;
  //Para incrementar
  Saldo:string;inputSaldo:string;inputIncremento:string = '00.00';
  //save acreedor
  acreedor:Acreedor = {};
  descuento:Descuento = {};
  constructor(private _appDescuentoService:AppDescuentoService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appAcreedorService:AppAcreedorService,
              private _appCarreraService : AppCarreraService,
              private _appAreaService:AppAreaService) { }

  ngOnInit() {
    this.getDescuentos();
  }

  getDescuentos(){
    this._appDescuentoService.getDescuentos().subscribe((descuento:Descuento[]) => {
      this.descuentos = descuento;
      console.log(this.descuentos)
    })
  }

  editDescuento(idDescuento, descuento){
    this._appDescuentoService.putDescuento(idDescuento, descuento)
    .subscribe((descuento:Descuento[])=>{})
  }

  getInfoEstudiante(idEstudiante){
    this._appTipoPersonaService.getInfoStudentF(idEstudiante)
    .subscribe((persona:Persona[])=>{this.infoEstudiante = persona});    
  }


  informacionEstudiante(idEstudiante, idDepartamento){
    this.areas = [];
    this._appTipoPersonaService.getInfoEstudiantes(idDepartamento, idEstudiante)
    .subscribe((estudiantes : Persona[]) => {
      this.infoEstudiante = estudiantes;
      for(let estudiante of this.infoEstudiante){
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
            this._appCarreraService.getCarrera(Number(estudiante.idCarrera)).subscribe((carrera:Carrera)=>{
              this.carrera = carrera[0].nombreCarrera;
            }) 
            this.codEstudiante = estudiante.codEstudiante;
            this.nacionalidad = estudiante.nacionalidad;
            this.direccion = estudiante.direccion;
            this.celular = estudiante.celular;
            this.ci = estudiante.ci;
            this.fechaNacimiento = estudiante.fechaNacimiento;
            this.estadoPersona = estudiante.estadoPersona;
            this.semestre = estudiante.semestre;
            this.nombreDepartamento = estudiante.departamento;
            this.beca = estudiante.beca;
            this.estadoConvenio = estudiante.estadoConvenio;
            this.fechaInicio = estudiante.fechaInicio;
            this.fechaFinal = estudiante.fechaFinal;
            this.fotocopiaCI = estudiante.fotocopiaCarnet;
            this.solicitudWork = estudiante.solicitudTrabajo;
            this._appAreaService.getAsignacionByConvenio(estudiante.idConvenio)
            .subscribe((data: Area[]) => {
              if(data.length > 0){
                for(let a of data){
                  this.areas.push(a.nombreArea);
                }
              }
            });
        }
      }
    })

  }
  
  aumentarSaldo(){
    if(this.inputIncremento.length > 0){
      if(parseFloat(this.inputIncremento) >= 0 && parseFloat(this.inputIncremento) <= parseFloat(this.Saldo)){
        this.acreedor.montoBs = ((parseFloat(this.Saldo) - parseFloat(this.inputIncremento)).toFixed(2)).toString();
      }else{
        this.acreedor.montoBs = '00.00';
      }
    }else{
      this.acreedor.montoBs = '00.00';
    }
    
  }

  aprobarIncremento(idConvenio, saldo, idDescuento, idPersona, idDepartamento){
    this.Saldo = saldo;
    this.inputSaldo = saldo + " Bs.";
    this.inputIncremento = '00.00';
    this.acreedor.idConvenio = idConvenio;
    this.descuento.idDescuento = idDescuento;
    this._appTipoPersonaService.getInfoEstudiantes(idDepartamento, idPersona)
    .subscribe((estudiantes : Persona[]) => {
      this.infoEstudiante = estudiantes;
      for(let estudiante of this.infoEstudiante){
        
        if(estudiante.idPersona == idPersona){  
            if (estudiante.segundoNombre == null && estudiante.segundoApellido != null ) {
              this.nombreCompleto = estudiante.primerApellido + " " + estudiante.segundoApellido+ " " + estudiante.primerNombre ;
            } else if (estudiante.segundoNombre == null && estudiante.segundoApellido == null){
              this.nombreCompleto = estudiante.primerApellido + " " + estudiante.primerNombre; 
            }else if (estudiante.segundoNombre != null && estudiante.segundoApellido == null){ 
              this.nombreCompleto = estudiante.primerApellido + " " + estudiante.primerNombre + " " + estudiante.segundoNombre;
            }else{
              this.nombreCompleto = estudiante.primerApellido + " " + estudiante.segundoApellido + " " + estudiante.primerNombre + " " + estudiante.segundoNombre;
            }     

            this.nombreDepartamento = estudiante.departamento;

        }
      }
    })
  }

  confirmarIncremento(){
    this.descuento.idUsuario = this.IdUsuario;
    this.descuento.montoDescuento = this.acreedor.montoBs;
  }

  //Gestionar Acreditaciones

  editAcreditacion(idConvenio, acreedor){
    this._appAcreedorService.putDevolverSaldo(idConvenio, acreedor)
    .subscribe((acreedor:Acreedor[]) => {})
  }

}
