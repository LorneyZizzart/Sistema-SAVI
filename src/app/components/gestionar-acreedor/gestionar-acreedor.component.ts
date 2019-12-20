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
import { AppAreaService } from '../../services/app-area.service';
import { Area } from 'src/app/interfaces/area.interface';
import { AppCarreraService } from '../../services/app-carrera.service';
import { Carrera } from '../../interfaces/carrera.interface';


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
  acreedoresArray:Acreedor[];
  //Lista de estudiantes del departameto
  estudiantes:Convenio[];
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
  observacionesRegistroHora:string;
  areas:any[] = [];
  //lista de descuentos
  descuento:Descuento = {};
  //Regsitrar Acreedor
  acreedor:Acreedor = {};
  //Para el descuento
  Saldo:string;inputSaldo:string;inputDescontar:string='00.00';
  //ALERTS
  titleAlert:string = null;
  messageAlert:string = null;
  activateAlert:boolean = false;
  alertSuccess:Boolean = false;
  alertError:Boolean = false;
  alertWarning:boolean = false;

  constructor(private _appAcreedorService:AppAcreedorService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appDescuentoService:AppDescuentoService,
              private _authService:AuthService,
              private _router:Router,
              private _appAreaService:AppAreaService,
              private _appCarreraService : AppCarreraService) { }

  ngOnInit() {
    this.listaAcreedores();
    this.getUsuario();
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

  getUsuario(){
    let usuario = this._authService.getDatosPersonales();
    this.IdUsuario = usuario.idUsuario;  
  }

  buscarInforme(nombre:string){
    let array:Acreedor[] = [];
    nombre = nombre.toLowerCase();
    var name;
    this.acreedores = this.acreedoresArray;
    for(let informe of this.acreedores){
      if (informe.segundoNombre == null && informe.segundoApellido != null ) {
        name = informe.primerApellido + " " + informe.segundoApellido+ " " + informe.primerNombre ;
      } else if (informe.segundoNombre == null && informe.segundoApellido == null){
        name = informe.primerApellido + " " + informe.primerNombre; 
      }else if (informe.segundoNombre != null && informe.segundoApellido == null){ 
        name = informe.primerApellido + " " + informe.primerNombre + " " + informe.segundoNombre;
      }else{
        name = informe.primerApellido + " " + informe.segundoApellido + " " + informe.primerNombre + " " + informe.segundoNombre;
      }
      name = name.toLowerCase();
      if(name.indexOf(nombre) >= 0){
        array.push(informe);        
      }  
    }
    this.acreedores = array;
  
  }

  listaAcreedores(){
    this._appAcreedorService.getAcreedor().subscribe((acreedores : Acreedor[]) => {
      this.acreedores = acreedores;
      this.acreedoresArray = acreedores;
    })
  }

  infoFullName(idEstudiante, idDepartamento){

    this._appTipoPersonaService.getInfoEstudiantes(idDepartamento, idEstudiante)
    .subscribe((estudiantes : Persona[]) => {
      for(let estudiante of estudiantes){
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
          this.codEstudiante = estudiante.codEstudiante;
        }
      }
    })    
  }

  informacionEstudiante(idEstudiante, idDepartamento){
    this.areas = [];
    this._appTipoPersonaService.getInfoEstudiantes(idDepartamento, idEstudiante)
    .subscribe((estudiantes : Persona[]) => {

      this.estudiantes = estudiantes;

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

    });
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
    this.descuento.saldoInicialDescuento = saldo;
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
    this.saveDescuento(this.descuento);
  }
  //Gestionar Acreditacion
  editAcreedor(acreedor:Acreedor){
    this._appAcreedorService.putAcreedor(acreedor).subscribe((acreedor:Acreedor[])=>{
      this.listaAcreedores();
      this.alert(1, 'Registro exitoso', 'El descuento se realizo satisfactoriamente.');
    });
  }
  //Gestionar Descuentos
  saveDescuento(descuento:Descuento){    
    this._appDescuentoService.postDescuentos(descuento).subscribe((descuento:Descuento[]) => {
      this.editAcreedor(this.acreedor);
    });
  }

  verAcreedorHistorial(idConvenio){
    this._router.navigate(['/acreedorHistorial', idConvenio]);  
  }

}
