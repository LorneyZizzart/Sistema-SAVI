import { Component, OnInit, ɵConsole } from '@angular/core';
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
import { AuthService } from '../../services/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-gestionar-descuento',
  templateUrl: './gestionar-descuento.component.html',
  styleUrls: ['./gestionar-descuento.component.css']
})
export class GestionarDescuentoComponent implements OnInit {
  //iDUSUARIO
  IdUsuario:string = "0";
  infoEstudiante:Convenio[];
  descuentos:Descuento [];
  descuentosArray:Descuento[];
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
  totalSaldo:string = '00.00';
  //save acreedor
  acreedor:Acreedor = {};
  descuento:Descuento = {};
   //ALERTS
   titleAlert:string = null;
   messageAlert:string = null;
   activateAlert:boolean = false;
   alertSuccess:Boolean = false;
   alertError:Boolean = false;
   alertWarning:boolean = false;
  constructor(private _appDescuentoService:AppDescuentoService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appAcreedorService:AppAcreedorService,
              private _appCarreraService : AppCarreraService,
              private _appAreaService:AppAreaService,
              private _authService:AuthService) { }

  ngOnInit() {
    this.getDescuentos();
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
  getDescuentos(){
    this._appDescuentoService.getDescuentos().subscribe((descuento:Descuento[]) => {
      this.descuentos = descuento;
      this.descuentosArray = descuento;
    })
  }

  buscarInforme(nombre:string){
    let array:Descuento[] = [];
    nombre = nombre.toLowerCase();
    var name;
    this.descuentos = this.descuentosArray;
    for(let informe of this.descuentos){
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
    this.descuentos = array;
  
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
  // aprobarIncremento(informe:Descuento, idConvenio, saldo, idDescuento, idPersona, idDepartamento, saldoInicial, idAcreedor){
  aprobarIncremento(informe:Descuento, idDepartamento){

    this.Saldo = informe.montoDescuento;
    this.inputSaldo = informe.montoDescuento + " Bs.";
    this.inputIncremento = '00.00';
    this.acreedor.idConvenio = informe.idConvenio;
    this.descuento.idDescuento = informe.idDescuento;
    this.descuento.saldoInicialDescuento = informe.saldoInicialDescuento;
    this.descuento.idAcreedor = informe.idAcreedor;
    this._appTipoPersonaService.getInfoEstudiantes(idDepartamento, informe.idPersona)
    .subscribe((estudiantes : Persona[]) => {
      this.infoEstudiante = estudiantes;
      for(let estudiante of this.infoEstudiante){        
        if(estudiante.idPersona == informe.idPersona){  
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
    if(parseFloat(this.Saldo) >=  parseFloat(this.inputIncremento)){
      this.descuento.idUsuario = this.IdUsuario;
      this.descuento.montoDescuento = this.acreedor.montoBs;
      this.descuento.estadoDescuento = '0';

      // se deshabilitara el descuento para registrar otro
      this._appDescuentoService.putDescuento(this.descuento, this.descuento.idDescuento).subscribe((data:Descuento) =>{
        
        this._appAcreedorService.getAcreedorByIdConvenio(this.acreedor.idConvenio).subscribe((acreedor:Acreedor[])=>{

          this.acreedor = acreedor[0];
          this.acreedor.estadoAcreedor = "0";
          this.acreedor.idUsuario = this.IdUsuario;

          
          this.acreedor.montoBs = (parseFloat(acreedor[0].montoBs)+parseFloat(this.inputIncremento)).toString();
          // actualizamos en el acreedor

          this._appAcreedorService.putAcreedor(this.acreedor).subscribe((putAcreedor:Acreedor[])=>{

            this._appDescuentoService.postDescuentos(this.descuento).subscribe((postDescuento :Descuento[])=>{
              this.alert(1, 'Registro exitoso', 'La acreditacion se realizo satisfactoriamente');
              this.getDescuentos();
            }, res => {
              this.alert(2, 'Error al registrar', 'Se ha producido un error en el servidor.');
            });
          });
        })

      })
    }    else{
      this.alert(2, 'Error al registrar', 'El incremento debe ser igual o inferior al saldo.');
    }
  }

  //Gestionar Acreditaciones

  editAcreditacion(idConvenio, acreedor){
    this._appAcreedorService.putDevolverSaldo(idConvenio, acreedor)
    .subscribe((acreedor:Acreedor[]) => {})
  }

}
