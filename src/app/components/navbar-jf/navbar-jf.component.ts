import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Persona } from '../../interfaces/persona.interface';
import { AppUserService } from '../../services/app-user.service';
import { InformeEstudiante } from '../../interfaces/informe-estudiante.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';
import { AppRegistroHoraService } from '../../services/app-registroHora.service';
import { RegistroHora } from '../../interfaces/registroHora.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-navbar-jf',
  templateUrl: './navbar-jf.component.html',
  styleUrls: ['./navbar-jf.component.css']
})
export class NavbarJFComponent implements OnInit {
  IdDepartamento:string = "1"
  fechaHoy:any;
  Usuario:User = {};
  Persona:User = {};
  datosUsuario:User[] = [];
  //Info Usuario
  nombreCompleto:string = 'Cargando...';
  nombres:string = 'Cargando...';
  rol:string;
  idRol;
  //Gestionar Finanzas
  //Lista de los estudiantes del total horas/saldos
  listInformeEstudiante:InformeEstudiante[];
  bandejaInformeNum;
  //Gestionar Jefe departamento
  //Registro de hoy
  informesRegistrosNow:RegistroHora[];
  //para notificar cuantos entraron
  public asistenciasNum;

  constructor(private _router:Router, 
              private _authService:AuthService,
              private _appUserService:AppUserService,
              private _appInformeEstudianteService:AppInformeEstudianteService,
              private _appRegistroHoraService:AppRegistroHoraService) { }

  ngOnInit() {
    this.obtenerDateNow();
    this.obtenerUsuario(); 
    if(parseInt(this.Usuario.idRol) == 2 || parseInt(this.Usuario.idRol) == 3){
      this.getInfomeEstudiante();
    }else if(parseInt(this.Usuario.idRol) == 4){
      this.getInformeRegisterNow(this.IdDepartamento);
    }
  }

  //Gestionar jefe departamento
  getInformeRegisterNow(idDepartamento:string){
    this._appRegistroHoraService.getInformeRegisterNow(idDepartamento)
    .subscribe((registro : RegistroHora[]) => {this.asistenciasNum = registro.length; this.listInformeEstudiante = registro});
  }

  //Gestionar Finanzas
  getInfomeEstudiante(){
    this._appInformeEstudianteService.getInformeEstudianteAll()
    .subscribe((informe : InformeEstudiante[]) => {this.bandejaInformeNum = informe.length; this.listInformeEstudiante = informe})
  }

  //Obtener Usuario del localStorage y datos personales
  obtenerUsuario(){
    this.Usuario = this._authService.getCurrentUser();
    this.Persona = this._authService.getDatosPersonales();
    if (this.Persona.segundoNombre == null && this.Persona.segundoApellido != null ) {
      this.nombreCompleto = this.Persona.primerNombre + ' ' + this.Persona.primerApellido + " " + this.Persona.segundoApellido;
    } else if (this.Persona.segundoNombre == null && this.Persona.segundoApellido == null){
      this.nombreCompleto = this.Persona.primerNombre + " " + this.Persona.primerApellido; 
    }else if (this.Persona.segundoNombre != null && this.Persona.segundoApellido == null){ 
      this.nombreCompleto = this.Persona.primerNombre + " " + this.Persona.segundoNombre + " " +this.Persona.primerApellido;
    }else{
      this.nombreCompleto = this.Persona.primerNombre + " " + this.Persona.segundoNombre + " " + this.Persona.primerApellido + " " + this.Persona.segundoApellido;
    }
    this.rol = this.Persona.idRol;
    this.idRol = this.Persona.idRol;
    if(this.Persona.segundoNombre != null){
      this.nombres = this.Persona.primerNombre + " " + this.Persona.segundoNombre;
    }else{
      this.nombres = this.Persona.primerNombre;
    }
  }

  obtenerDateNow(){
    let dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    this.fechaHoy = new Date();
    var fechaNum = this.fechaHoy.getDate();
    var mes_name = this.fechaHoy.getMonth();  

    this.fechaHoy = (dias[this.fechaHoy.getDay()]).toLowerCase() + ", " + fechaNum + " de " + meses[mes_name] + " de " + this.fechaHoy.getFullYear();
  }

  logOutUsuario(){
    this._authService.logoutUser();
    this._router.navigate(['/login'])
  }

  gestionarUser(){
    this._router.navigate(['/user']);
  }

  gestionarConvenio(){
    this._router.navigate(['/convenio']);   
  }

  gestionarDepartamento(){
    this._router.navigate(['/departamento']);    
  }

  gestionarInfoDepartamento(){
    this._router.navigate(['/infoDepartamento']);    
  }

  gestionarAreaDepto(){
    this._router.navigate(['/area']);    
  }

  gestionarRegistroHoy(){
    this._router.navigate(['/informeHoy']);    
  }

  gestionarRegistroAyer(){
    this._router.navigate(['/informeAyer']);    
  }

  gestionarRegistroWeek(){
    this._router.navigate(['/informeWeek']);    
  }

  gestionarRegistroMonth(){
    this._router.navigate(['/informeMonth']);    
  }

  gestionarRegistroPersonalizado(){
    this._router.navigate(['/informeMonth']);    
  }

  gestionarInformeAprovados(){
    this._router.navigate(['/informeJefe']);    
  }

  gestionarInformeArchivados(){
    this._router.navigate(['/informeJefeArchivado']);    
  }

  gestionarInformeEliminado(){
    this._router.navigate(['/informeJefeEliminado']);    
  }

  gestionarBandejaInformes(){
    this._router.navigate(['/informeFinanzas']);    
  }

  gestionarInformesRevisados(){
    this._router.navigate(['/informeFinanzasAprobado']);    
  }

  gestionaInformesArchivados(){
    this._router.navigate(['/informeFinanzasArchivado']);    
  }

  gestionarAcreditaciones(){
    this._router.navigate(['/acreedor']);    
  }

  gestionarDescuentos(){
    this._router.navigate(['/descuento']);    
  }

}
