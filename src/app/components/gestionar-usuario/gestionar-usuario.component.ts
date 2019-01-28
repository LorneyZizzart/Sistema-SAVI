import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { Persona } from "../../interfaces/persona.interface";
import { AppUserService } from "../../services/app-user.service";
import { AppPersonaService } from "../../services/app-persona.service";

@Component({
  selector: 'app-gestionar-usuario',
  templateUrl: './gestionar-usuario.component.html',
  styleUrls: ['./gestionar-usuario.component.css']
})
export class GestionarUsuarioComponent implements OnInit {

  //FormBuilder
  public formPersona:FormGroup;
  //pRUEBA bORRAR
  idPersona:string = "";
  idRol:string = "";
  password:string = "";
  passwordTwo:string = "";
  //ALERTS
  MessageSuccess:Boolean = false;
  MessageEnable:Boolean = false;
  MessageDesable:Boolean = false;
  public userPersona: Persona[];
  usuario:User[];
  personas:Persona[];
  //Para ver la informacion por estudiante
  infoNombreCompleto:string = "";
  infoCarrera: string = "";
  infoSemestre: string = "";
  infoDireccion: string = "";
  infoNacionalidad: string = "";
  infoCI: string = "";
  infoCelular: string = "";
  infoFechaNacimiento: string = "";
  infoUser:string = "";
  infoPassword:string = "";

  estudiante:Persona[] = [];

  private persona: Persona = {
  }

  private editpersona: Persona = {
  }

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

  constructor( private _appUserService: AppUserService,
              private _appPersonaService: AppPersonaService,
              private _formBuilder: FormBuilder) {
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
  getUsers() {
    this._appUserService.getUsers().subscribe((users: Persona[]) => this.userPersona = users);
  }
  buscarEstudiante(idPersona:string){

    for (let estudiante of this.userPersona) {
      if(estudiante.idPersona == idPersona){
        if (estudiante.segundoNombre == null && estudiante.segundoApellido != null ) {
          this.infoNombreCompleto = estudiante.primerNombre + " " + estudiante.primerApellido + " " + estudiante.segundoApellido;
        } else if (estudiante.segundoNombre == null && estudiante.segundoApellido == null){
          this.infoNombreCompleto = estudiante.primerNombre + " " + estudiante.primerApellido;          
        }else{
          this.infoNombreCompleto = estudiante.primerNombre + " " + estudiante.segundoNombre + " " + estudiante.primerApellido + " " + estudiante.segundoApellido;
        }
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
  buscarEstudianteEditar(idPersona:string){
    for(let estudiante of this.userPersona){
     
      if (estudiante.idPersona == idPersona) {
         console.log("idPersonas: ", estudiante.idPersona )
        this.formPersona = this._formBuilder.group({
          editPrimerNombre: estudiante.primerNombre,
          editSegundoNombre: estudiante.segundoNombre,
          editPrimerApellido : estudiante.primerApellido,
          editSegundoApellido : estudiante.segundoApellido,
          editCarrera : estudiante.carrera,
          editSemestre : estudiante.semestre,
          editNacionalidad : estudiante.nacionalidad,
          editFechaNacimiento : estudiante.fechaNacimiento,
          editDireccion : estudiante.direccion,
          editCi : estudiante.ci,
          editCelular : estudiante.celular
        })

        // this.formPersona = new FormGroup({
        //   editPrimerNombre: new FormControl(estudiante.primerNombre),
        //   editSegundoNombre: new FormControl(estudiante.segundoNombre),
        //   editPrimerApellido : new FormControl(estudiante.primerApellido),
        //   editSegundoApellido : new FormControl(estudiante.segundoApellido),
        //   editCarrera : new FormControl(estudiante.carrera),
        //   editSemestre : new FormControl(estudiante.semestre),
        //   editNacionalidad : new FormControl(estudiante.nacionalidad),
        //   editFechaNacimiento : new FormControl(estudiante.fechaNacimiento),
        //   editDireccion : new FormControl(estudiante.direccion),
        //   editCi : new FormControl(estudiante.ci),
        //   editCelular : new FormControl(estudiante.celular)
        // });
      }
    }
  }

  saveUser() {
    this.user.idPersona = this.idPersona;
    this.user.idRol = this.idRol;
    this.user.password = this.passwordTwo;
    console.log(this.user);
    this._appUserService.postUser(this.user)
    .subscribe((data :User[]) => {console.log(data)});
    //.subscribe(data => {data}, error => console.log(error));
  }

  editUsers(){
    this.user.idRol = this.idRol;
    this.user.password = this.passwordTwo;
    console.log(this.user);
    this._appUserService.putUser(this.user, this.idPersona)
    .subscribe((data :User[]) => {console.log(data)});
  }

  editEstadoUser(idRol, usuario, password, estado, idPersona){
    this.user.idRol = idRol;
    this.user.usuario = usuario;
    this.user.password = password;
    this.user.estado = estado;
    console.log(this.user);
    this._appUserService.putUser(this.user, idPersona)
      .subscribe((data: User[]) => { console.log(data) });

    setTimeout( () => {
          this.getUsers();
    }, 2000);
  }

  deleteUser(idUsuario:string){
    this.idUsuario = idUsuario;
  }

  //Gestionar Personas
  getPersonas() {
    this._appPersonaService.getPersonas().subscribe((personas:Persona[]) => this.personas = personas);
    console.log(this.personas);
  }

  savePersona() {
    console.log(this.persona);
    this._appPersonaService.postPersona(this.persona)
    .subscribe((data :Persona[]) => {console.log(data)});
  }

  eliminarUser(){
    if(this.idUsuario != null){
      this._appUserService.deleteUser(this.idUsuario)
        .subscribe((user : User[]) => { console.log(user)});
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

}
