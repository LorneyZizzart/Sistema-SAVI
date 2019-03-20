import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Persona } from '../../interfaces/persona.interface';
import { AppUserService } from '../../services/app-user.service';
import { InformeEstudiante } from '../../interfaces/informe-estudiante.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';



@Component({
  selector: 'app-navbar-jf',
  templateUrl: './navbar-jf.component.html',
  styleUrls: ['./navbar-jf.component.css']
})
export class NavbarJFComponent implements OnInit {
  fechaHoy:any;
  Usuario:Persona = {};
  datosUsuario:Persona[] = [];
  //Info Estudiante
  nombreCompleto:string = 'Cargando...';
  nombres:string = 'Cargando...';
  rol:string;
  idRol;
  //Gestionar Finanzas
  //Lista de los estudiantes del total horas/saldos
  listInformeEstudiante:InformeEstudiante[];
  bandejaInformeNum;

  constructor(private _router:Router, 
              private _authService:AuthService,
              private _appUserService:AppUserService,
              private _appInformeEstudianteService:AppInformeEstudianteService) { }

  ngOnInit() {
    this.obtenerDateNow();
    this.obtenerUsuario(); 
    if(parseInt(this.Usuario.idRol) == 2 || parseInt(this.Usuario.idRol) == 3){
      this.getInfomeEstudiante();
    } 
  }

  //Gestionar Finanzas
  getInfomeEstudiante(){
    this._appInformeEstudianteService.getInformeEstudianteAll()
    .subscribe((informe : InformeEstudiante[]) => {this.listInformeEstudiante = informe})
    setTimeout(() => {
      this.bandejaInformeNum = this.listInformeEstudiante.length;
    }, 2000);
  }

  getUser(idUsuario){
    this._appUserService.getUser(idUsuario)
    .subscribe((usuario : Persona[]) => {this.datosUsuario = usuario});
    setTimeout(() => {
      for(let user of this.datosUsuario){
        if (user.segundoNombre == null && user.segundoApellido != null ) {
          this.nombreCompleto = user.primerNombre + ' ' + user.primerApellido + " " + user.segundoApellido;
        } else if (user.segundoNombre == null && user.segundoApellido == null){
          this.nombreCompleto = user.primerNombre + " " + user.primerApellido; 
        }else if (user.segundoNombre != null && user.segundoApellido == null){ 
          this.nombreCompleto = user.primerNombre + " " + user.segundoNombre + " " +user.primerApellido;
        }else{
          this.nombreCompleto = user.primerNombre + " " + user.segundoNombre + " " + user.primerApellido + " " + user.segundoApellido;
        }
        this.rol = user.rol;
        this.idRol = user.idRol;
        if(user.segundoNombre != null){
          this.nombres = user.primerNombre + " " + user.segundoNombre;
        }else{
          this.nombres = user.primerNombre;
        }
      }
    }, 2000);
  }

  //Obtener Usuario del localStorage
  obtenerUsuario(){
    this.Usuario = this._authService.getCurrentUser();
    this.getUser(this.Usuario.idUsuario);
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
