import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { Persona } from "../../interfaces/persona.interface";
import { AppUserService } from "../../services/app-user.service";
import { AppPersonaService } from "../../services/app-persona.service";
import { Carrera } from '../../interfaces/carrera.interface';
import { AppCarreraService } from '../../services/app-carrera.service';


@Component({
  selector: 'app-gestionar-usuario',
  templateUrl: './gestionar-usuario.component.html',
  styleUrls: ['./gestionar-usuario.component.css']
})
export class GestionarUsuarioComponent implements OnInit {

  //FormBuilder
  public formPersona:FormGroup;
  idPersona:string = "";
  idRol:string = "";
  password:string = "";
  passwordTwo:string = "";
  //ALERTS
  MessageSuccess:Boolean = false;
  MessageEnable:Boolean = false;
  MessageDesable:Boolean = false;
  public userPersona: Persona[];
  //se utiliza para el buscador el usuario
  usuariosArray:Persona[];
  usuario:User[];
  personas:Persona[];
  //Para ver la informacion por estudiante
  infoNombreCompleto:string = "";
  infoCodEstudiante:string = "";
  infoCarrera: string = "";
  infoSemestre: string = "";
  infoDireccion: string = "";
  infoNacionalidad: string = "";
  infoCI: string = "";
  infoCelular: string = "";
  infoFechaNacimiento: string = ""
  infoUser:string = "";
  infoPassword:string = "";

  estudiante:Persona[] = [];

  private persona: Persona = {}
  private editpersona: Persona = {}
  private edituser: User = {};
  private editPassword:string;
  MessageSuccessUpdate:boolean = false;
  private user: User = {
    idRol: "",
    usuario: "",
    password: "",
    estado: "0"
  };

  //Confirmacion de eliminar
  messageYdelete:boolean = false;
  messageNdelete:boolean = false;
  idUsuario:string;
  //Gestionar Carrera
  carreras:Carrera[] = [];
  carrera:Carrera = {};
  constructor( private _appUserService: AppUserService,
              private _appPersonaService: AppPersonaService,
              private _formBuilder: FormBuilder,
              private _appCarreraService:AppCarreraService) {
  }

  ngOnInit() {
    this.getUsers();
    this.formPersona = new FormGroup({});
  }


  ngOnDestroy(): void {
  }

  comparacionPassword():Boolean{
    if (this.passwordTwo != this.password || this.passwordTwo == null && this.password != null) {
      return false;
    }else{return true;}
  }

  //resetear el FORMULARIO no estamos usando
  resetForm(formulario:NgForm){
    formulario.reset({
    });
  }
  //ALERT SUCCESS
  mensajeSuccess(){
    if (!this.MessageSuccess) {
      this.MessageSuccess = true;
      setTimeout(() => {
        this.MessageSuccess = false;
      }, 10000);
    }
  }

  messageEnableDesable(value:string){
    if (value == 'inactivo') {
      this.MessageEnable = true;
      setTimeout(() => {
        this.MessageEnable = false;
      }, 8000);
    }else if (value == 'activo') {
      this.MessageDesable = true;
      setTimeout(() => {
        this.MessageDesable = false;
      }, 8000);
    }
  }

  //Gestionar Usuarios
  buscarUsuario(nombre:string){
    let array:Persona[] = [];
    nombre = nombre.toLowerCase();
    var name;
    this.userPersona = this.usuariosArray;
    for(let informe of this.userPersona){
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
    this.userPersona = array;     
  }

  getUsers() {
    this._appUserService.getUsers()
    .subscribe((users: Persona[]) => {
      this.userPersona = users; 
      this.usuariosArray = this.userPersona;
    });
  }
  buscarEstudiante(idPersona:string){

    for (let estudiante of this.userPersona) {
      if(estudiante.idPersona == idPersona){
        if (estudiante.segundoNombre == null && estudiante.segundoApellido != null ) {
          this.infoNombreCompleto = estudiante.primerApellido + " " + estudiante.segundoApellido+ " " + estudiante.primerNombre ;
        } else if (estudiante.segundoNombre == null && estudiante.segundoApellido == null){
          this.infoNombreCompleto = estudiante.primerApellido + " " + estudiante.primerNombre; 
        }else if (estudiante.segundoNombre != null && estudiante.segundoApellido == null){ 
          this.infoNombreCompleto = estudiante.primerApellido + " " + estudiante.primerNombre + " " + estudiante.segundoNombre;
        }else{
          this.infoNombreCompleto = estudiante.primerApellido + " " + estudiante.segundoApellido + " " + estudiante.primerNombre + " " + estudiante.segundoNombre;
        }
        this.infoCodEstudiante = estudiante.codEstudiante;
        this.infoCarrera = estudiante.carrera;
        this.infoSemestre = estudiante.semestre;
        this.infoDireccion = estudiante.direccion;
        this.infoNacionalidad = estudiante.nacionalidad;
        this.infoCI = estudiante.ci;
        this.infoCelular = estudiante.celular;
        this.infoFechaNacimiento = estudiante.fechaNacimiento;
        this.infoUser = estudiante.usuario;
        this.infoPassword = estudiante.password;
      }
    }
  }

  //Buscar al estudiante para editar
  //Aun falta no muestra los datos 
  buscarEstudianteEditar(idPersona:string, idUsuario:string){
    this.idPersona = idPersona; 
    this.idUsuario = idUsuario;   
    this.getCarreras();
    for(let estudiante of this.userPersona){     
      if (estudiante.idPersona == idPersona) {
        let fecha = new Date(estudiante.fechaNacimiento);
        let dia = fecha.getUTCDate();
        let mes = fecha.getUTCMonth()+1;
        let year = fecha.getUTCFullYear();
         this.editpersona.primerNombre = estudiante.primerNombre;
         this.editpersona.segundoNombre = estudiante.segundoNombre;
         this.editpersona.primerApellido = estudiante.primerApellido;
         this.editpersona.segundoApellido = estudiante.segundoApellido;
         this.editpersona.idCarrera = estudiante.idCarrera;        
         this.editpersona.semestre = estudiante.semestre;        
         this.editpersona.nacionalidad = estudiante.nacionalidad;        
         this.editpersona.fechaNacimiento = dia + "/" + mes + "/" + year;       
         this.editpersona.direccion = estudiante.direccion;        
         this.editpersona.ci = estudiante.ci;        
         this.editpersona.celular = estudiante.celular;        
         this.editpersona.codEstudiante = estudiante.codEstudiante;
         this.edituser.usuario = estudiante.usuario;
         this.edituser.password = estudiante.password;
         this.editPassword = estudiante.password;
      }
    }
  }

  saveUser() {
    this.user.idPersona = this.idPersona;
    this.user.idRol = '5';
    this.user.password = this.passwordTwo;
    this._appUserService.postUser(this.user)
    .subscribe((data :User[]) => {console.log(data)});
  }

  editUsers(){
    this.edituser.estado = '1';
    this.edituser.idRol = '5';
    this._appUserService.putUser(this.edituser, this.idUsuario, this.idPersona)
    .subscribe((data :User[]) => {console.log(data)});
    this.MessageSuccessUpdate = true;
    setTimeout(() => {
      this.getUsers();
    }, 2000);
    setTimeout(() => {
      this.MessageSuccessUpdate = false;
    }, 8000);
  }

  editEstadoUser(idRol, usuario, password, estado, idUsuario, idPersona){
    this.user.idRol = idRol;
    this.user.usuario = usuario;
    this.user.password = password;
    this.user.estado = estado;
    console.log(this.user);
    this._appUserService.putUser(this.user, idUsuario, idPersona)
      .subscribe((data: User[]) => { console.log(data) });

    setTimeout( () => {
          this.getUsers();
    }, 2000);
  }

  deleteUser(idUsuario:string, idPersona:string){
    this.idUsuario = idUsuario;
    this.idPersona = idPersona;
  }

  //Gestionar Personas
  getPersonas() {
    this._appPersonaService.getPersonas().subscribe((personas:Persona[]) => this.personas = personas);
    console.log(this.personas);
  }

  savePersona() {
    let fecha = this.persona.fechaNacimiento.split('/')
    let date = fecha[2]+"/"+fecha[1]+"/"+fecha[0];
    this.persona.fechaNacimiento = date;
    this._appPersonaService.postPersona(this.persona)
    .subscribe((data :Persona[]) => {console.log(data)});
  }

  eliminarUser(){
    if(this.idUsuario != null){
      this._appUserService.deleteUser(this.idUsuario)
        .subscribe((user : User[]) => { console.log(user)});
      this._appPersonaService.deletePersona(this.idPersona)
      .subscribe((persona : Persona[]) =>{});
      this.messageYdelete = true;
      setTimeout(() => {
        this.messageYdelete = false;
      }, 8000);
      setTimeout(() => {
        this.getUsers();
      }, 3000);
    }else{
      this.messageNdelete = true;
      setTimeout(() => {
      this.messageNdelete = false;
      }, 8000);
    }
  }

  editarPersona(){
    let fecha =  this.editpersona.fechaNacimiento.split('/');
    let date = fecha[2]+"/"+fecha[1]+"/"+fecha[0]
    this.editpersona.fechaNacimiento = date;
    this._appPersonaService.putPersona(this.editpersona, this.idPersona)
    .subscribe((data : Persona[]) =>{console.log(data)});
    setTimeout(() => {
      this.getUsers();
    }, 2000);
    this.MessageSuccessUpdate = true;
    setTimeout(() => {
      this.MessageSuccessUpdate = false;
    }, 8000);
  }

  //Gestionar Carrera
  getCarreras(){
    this._appCarreraService.getListCarrera()
    .subscribe((carrera : Carrera[]) => {this.carreras = carrera})
  }

}
