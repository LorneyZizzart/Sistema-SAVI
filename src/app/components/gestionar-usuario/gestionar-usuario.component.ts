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
  idPersona:string = null;
  idRol:string = null;
  password:string = null;
  passwordTwo:string = null;;
  //ALERTS
  titleAlert:string = null;
  messageAlert:string = null;
  activateAlert:boolean = false;
  alertSuccess:Boolean = false;
  alertError:Boolean = false;
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
  private user: User = {};

  //Confirmacion de eliminar
  messageYdelete:boolean = false;
  messageNdelete:boolean = false;
  idUsuario:string;
  //Gestionar Carrera
  carreras:Carrera[] = [];
  carrera:Carrera = {};
  //INPUTs
  //REGISTER PEOPLE
  inputValCodStudent:boolean = true; messaggeCodStudent:string = null;
  inputValFirstName:boolean = true;
  inputValSecondName:boolean = true;
  inputValSurname:boolean = true;
  inputValSecondSurname:boolean = true; messaggeFullName:string = null;
  inputValSemester:boolean = true; messaggeSemester:string = null;
  inputValNationality:boolean = true; messaggeNationality:string = null;
  inputValBirth:boolean = true; messaggeBirth:string = null;
  inputValAddress:boolean = true; messaggeAddress:string = null;
  inputValCI:boolean = true; messaggeCI:string = null;
  inputValMobile:boolean = true;messaggeMobile:string = null;
  //RESGISTER USER
  inputValSelectPeople:boolean = true; messageSelectPeople:string = null;
  inputValUser:boolean = true; messageUser:string = null;
  inputValPassword:boolean = true; messagePassword:string = null;
  inputValPassword2:boolean = true; messagePassword2:string = null;
  letters="abcdefghyjklmnñopqrstuvwxyz";
  numbers="0123456789";
  simbolos="/*-+|°!#$%&()=¿?,;. :_{}[]><";
  constructor( private _appUserService: AppUserService,
              private _appPersonaService: AppPersonaService,
              private _formBuilder: FormBuilder,
              private _appCarreraService:AppCarreraService) {
  }

  ngOnInit() {
    // this.getUsers();
    this.formPersona = new FormGroup({});
  }

   //resetear el FORMULARIO no estamos usando
  resetForm(formulario:NgForm){
    formulario.reset({});
  }
  
  alert(opcion:boolean, title:string, message:string):void{
    if(opcion) this.alertSuccess = true;
    if(!opcion) this.alertError = true;      
    this.titleAlert = title;
    this.messageAlert = message;
    this.activateAlert = true;
    setTimeout(() => {
      this.activateAlert = false;
      this.alertSuccess = false;
      this.alertError = false;
    }, 5000);
  }
  
  ngOnDestroy(): void {
  }

  //inputs de Registrar Persona
  inputCodStudent(value){
    if(value != null){
    if(value.length == 9){
      for (let i = 0; i < value.length; i++) {
        if(this.letters.indexOf(value.charAt(i),0)!=-1){
          this.inputValCodStudent = false;
          this.messaggeCodStudent = 'Debe contener 9 caracteres numéricos y no se permite letras.';
          break;
        }else{
          this._appPersonaService.searchCodStudent(value)
          .subscribe((data:Persona[])=>{
            if(data.length > 0) {this.inputValCodStudent = false;
              this.messaggeCodStudent = 'El código de estudiante se encuentra registrado.';
            }else this.inputValCodStudent = true;
          },res =>{this.inputValCodStudent = false}); 
          break;
        }     
      }
    }else if(value.length >= 1 && value.length <= 8){
      this.inputValCodStudent = false;
      this.messaggeCodStudent = 'Debe contener 9 caracteres numéricos y no se permite letras.';
    }else if (value.length > 9){
      this.inputValCodStudent = false;
      this.messaggeCodStudent = 'Solo se permite 9 caracteres numéricos.';
    }else if (value.length == 0) this.inputValCodStudent = true
    }
  }

  inputFirstName(value){
    if(value != null){
      if(value.length > 0){
        for (let i = 0; i < value.length; i++) {
          if(this.numbers.indexOf(value.charAt(i),0)!=-1){
            this.inputValFirstName = false;
            this.messaggeFullName = 'No se permite caracteres numéricos.';
            break;
          }else {
            this.inputValFirstName = true
          }
        }
      }else {
        this.inputValFirstName = false;
        this.messaggeFullName = 'El campo debe ser llenado obligatoriamente.';
      }
    }     
  }

  inputSecondName(value){
    if(value != null){
      if(value.length > 0){
        for (let i = 0; i < value.length; i++) {
          if(this.numbers.indexOf(value.charAt(i),0)!=-1){
            this.inputValSecondName = false;
            this.messaggeFullName = 'No se permite caracteres numéricos.';
            break;
          }else this.inputValSecondName = true
        }
      }else this.inputValSecondName = true 
    }    
  }

  inputSurname(value){
    if(value != null){
    if(value.length > 0){
      for (let i = 0; i < value.length; i++) {
        if(this.numbers.indexOf(value.charAt(i),0)!=-1){
          this.inputValSurname = false;
          this.messaggeFullName = 'No se permite caracteres numéricos.';
          break;
        }else this.inputValSurname = true
      }
    }else {
      this.inputValSurname = false;
      this.messaggeFullName = 'El campo debe ser llenado obligatoriamente.';
    }
    }
  }

  inputSecondSurname(value){
    if(value != null){
    if(value.length > 0){
      for (let i = 0; i < value.length; i++) {
        if(this.numbers.indexOf(value.charAt(i),0)!=-1){
          this.inputValSecondSurname = false;
          this.messaggeFullName = 'No se permite caracteres numéricos.';
          break;
        }else this.inputValSecondSurname = true
      }
    }else this.inputValSecondSurname = true; 
    }
  }

  inputSemester(value){
    if(value != null){
    if(value.length>0){
      for (let i = 0; i < value.length; i++) {
        if(this.letters.indexOf(value.charAt(i),0)!=-1){
          this.inputValSemester = false;
          this.messaggeSemester = 'No se permite caracteres literarios.';
          break;
        }else {
          if(parseInt(value) >=1 && parseInt(value) <= 9){
           this.inputValSemester = true            
          }else if (parseInt(value) > 9){
            this.inputValSemester = false;
            this.messaggeSemester = 'Solo se permiten valores numéricos del 1 al 9.';
          }
        }
      }      
    }else this.inputValSemester = true; 
    }
  }

  inputNationality(value){
    if(value != null){
    if(value.length > 0){
      for (let i = 0; i < value.length; i++) {
        if(this.numbers.indexOf(value.charAt(i),0)!=-1){
          this.inputValNationality = false;
          this.messaggeNationality = 'No se permite caracteres numéricos.';
          break;
        }else this.inputValNationality = true
      }
    }else {
      this.inputValNationality = false; 
      this.messaggeNationality = 'El campo debe ser llenado obligatoriamente.';
    }
    }
  }

  inputBirth(value){
    if(value != null){
      var valDay = false, valMonth = false, valYear = false;
      var date = new Date();
      var infYear = parseInt(date.getFullYear().toString()) - 100;
      if(value.length > 0){
        for (let i = 0; i < value.length; i++) {
          if(this.letters.indexOf(value.charAt(i),0)!=-1){
            this.inputValBirth = false;
            this.messaggeBirth = 'No se permite caracteres literarios.';
            break;
          }else {
            if(value.substr(2,1) == '/' && value.substr(5,1) == '/'){            
              if(value.substr(0,2) > 0 && value.substr(0,2) <= 31){
                valDay = true;
              }else{
                this.inputValBirth = false;
                valDay = false;
                this.messaggeBirth = 'El valor del día debe ser entre 01 a 31';
              }
              if(value.substr(3,2) > 0 && value.substr(3,2) <= 12){
                valMonth = true;
              }else{
                this.inputValBirth = false;
                valMonth = false;
                this.messaggeBirth = 'El valor del mes debe ser entre 01 a 12';
              }
              if(value.length > 6){
                if(parseInt(value.substr(6)) > infYear && parseInt(value.substr(6)) < parseInt(date.getFullYear().toString())) {
                  valYear = true;
                }else {
                  this.inputValBirth = false;
                  valYear =false;
                  this.messaggeBirth = 'Debe ser un año valido y inferior al año actual.';
                }
              }            
              if(valDay == true && valMonth == true && valYear == true)this.inputValBirth = true;
            }else{
              this.inputValBirth = false;
              this.messaggeBirth = 'La fecha debe ser en el formato día/mes/año.';
            }                  
          }
        }
      }else{
        this.inputValBirth = false;
        this.messaggeBirth = 'El campo debe ser llenado obligatoriamente en el formato de día/mes/año.';
      }
    }
  }

  inputAddress(value){
    if(value != null){
    if(value.length > 0) this.inputValAddress = true
    else {
      this.inputValAddress = false;
      this.messaggeAddress = 'El campo debe ser llenado obligatoriamente.'
    }
    }
  }

  inputCI(value){
    if(value != null){
    if(value.length > 0) this.inputValCI = true
    else {
      this.inputValCI = false;
      this.messaggeCI = 'El campo debe ser llenado obligatoriamente.'
    }
  }
  }

  inputMobile(value){
    if(value != null){
    if(value.length > 0){
      for (let i = 0; i < value.length; i++) {
        if(this.letters.indexOf(value.charAt(i),0)!=-1){
          this.inputValMobile = false;
          this.messaggeMobile = 'No se permite caracteres literarios.';
          break;
        }else this.inputValMobile = true
      }
    }else{
      this.inputValMobile = false;
      this.messaggeMobile = 'El campo debe ser llenado obligatoriamente con caracteres numéricos';
    }
    }
  }

  //Inputs de registrar usuario
  selectPeople(){
    this.inputValSelectPeople=true;
  }
  generateUser(idPersona){
    if(idPersona != null){
      for(let persona of this.personas){
        if(persona.idPersona == idPersona){
          this.inputValUser = true;
          this.inputValPassword = true;
          this.user.usuario = (persona.primerNombre+persona.primerApellido).toLowerCase().substr(0,6);
          this.password = (persona.primerApellido).toLowerCase().substr(0,3)+(persona.ci).toLowerCase().substr(0,3);       
          if(this.password != this.passwordTwo){
            this.inputValPassword2 = false;
            this.messagePassword2 = 'Debe escribir la misma contraseña para confirmar.'
          }
        }
      }
    }       
  }
  inputUser(value){
    var validInput = false;
    if(value != null){
      if(value.length == 0){
        this.inputValUser = false;
        this.messageUser = 'El campo debe ser llenado obligatoriamente.'
      }else if(value.length > 5){
        for (let i = 0; i < value.length; i++) {
          if(this.simbolos.indexOf(value.charAt(i),0)!=-1){
            this.inputValUser = false;
            this.messageUser = 'No debe contener símbolos y ni espacios.'
            validInput = false;
            break;
          }else validInput = true;
        }
        if(validInput){
          this._appUserService.searchUser(value)
          .subscribe((data:User[])=>{
            if(data.length > 0){this.inputValUser = false;
              this.messageUser = 'El nombre de usuario ya existe.';  
              return;       
            }else{
              this.inputValUser = true;  
            }               
          }, res =>{this.inputValUser = false;
            this.messageUser = 'Se ha producido un error en el servidor.'})
        }
      }else{
        this.inputValUser = false;
        this.messageUser = 'Debe contener al menos 6 caracteres numéricos o literarios, sin símbolos y ni espacios.'
      }
    }
  }
  inputPassword1(value){
    var valLetters = false, valNumbers = false;
    if(value != null){
      if(value.length == 0){
        this.inputValPassword = false;
        this.messagePassword = 'El campo debe ser llenado obligatoriamente.';
      }else if(value.length > 5){
        this.inputValPassword = true;
        for (let i = 0; i < value.length; i++) {
          if(this.letters.indexOf(value.charAt(i),0)!=-1) valLetters = true;
          if(this.numbers.indexOf(value.charAt(i),0)!=-1) valNumbers = true;
          if(this.simbolos.indexOf(value.charAt(i),0)!=-1){
            valLetters = false; valNumbers = false;
            this.inputValPassword = false;
            this.messagePassword = 'No debe contener símbolos y ni espacios.'
            break;
          }
        }
        if(valLetters && valNumbers){
          if(this.password != this.passwordTwo){
            this.inputValPassword2 = false;
            this.messagePassword2 = 'La contraseñas deben ser iguales.';
          }else this.inputValPassword = true;
        }
      }else{
        this.inputValPassword = false;
        this.messagePassword = 'Debe contener al menos 6 caracteres entre letras y números, sin símbolos y ni espacios.';
      }
    }
  }

  inputPassword2(value){
    var valLetters = false, valNumbers = false;
    if(value != null){
      if(value.length == 0){
        this.inputValPassword2 = false;
        this.messagePassword2 = 'El campo debe ser llenado obligatoriamente.';
      }else if(value.length > 5){
        for (let i = 0; i < value.length; i++) {
          if(this.letters.indexOf(value.charAt(i),0)!=-1) valLetters = true;
          if(this.numbers.indexOf(value.charAt(i),0)!=-1) valNumbers = true;
          if(this.simbolos.indexOf(value.charAt(i),0)!=-1){
            valLetters = false; valNumbers = false;
            this.inputValPassword2 = false;
            this.messagePassword2 = 'No debe contener símbolos y ni espacios.'
            break;
          }
        }
        if(valLetters && valNumbers){
          if(this.password==this.passwordTwo) this.inputValPassword2 = true;
          else{
            this.inputValPassword2 = false;
            this.messagePassword2 = 'La contraseñas deben ser iguales.'
          }
        }
      }else{
        this.inputValPassword2 = false;
        this.messagePassword2 = 'Debe contener al menos 6 caracteres entre letras y números, sin símbolos y ni espacios.';
      }
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

  saveUser(idPersona) {
    if(idPersona == null || idPersona == ""){this.inputValSelectPeople = false; this.messageSelectPeople='Debe seleccionar un nombre para el usuario.'}
    if(this.user.usuario == null){this.inputValUser=false; this.messageUser='El campo debe ser llenado obligatoriamente.';}
    if(this.password == null){this.inputValPassword=false; this.messagePassword='El campo debe ser llenado obligatoriamente.';}
    if(this.passwordTwo == null){this.inputValPassword2=false; this.messagePassword2='El campo debe ser llenado obligatoriamente.';}

    if(this.inputValSelectPeople && this.inputValUser && this.inputValPassword && this.inputValPassword2){
      this.user.idPersona = idPersona;
      this.user.idRol = '5';
      this.user.password = this.passwordTwo;
      this._appUserService.postUser(this.user)
      .subscribe((data :User[]) => {
        this.alert(true, 'Registro exitoso','El registro del usuario se realizó satisfactoriamente.');
      },res => {
        this.alert(false, 'Error al registrar','Se ha producido un error en el servidor.');
      });
    }else this.alert(false, 'Error al registrar','Se ha producido un error al guardar el registro del usuario.');
    
    
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
  }

  savePersona(form:NgForm) {
    if(this.persona.primerNombre == null) {this.inputValFirstName = false;this.messaggeFullName = 'El campo debe ser llenado obligatoriamente.';}
    if(this.persona.primerApellido == null) this.inputValSurname = false;
    if(this.persona.nacionalidad == null) {this.inputValNationality = false;this.messaggeNationality = 'El campo debe ser llenado obligatoriamente.';}
    if(this.persona.fechaNacimiento == null) {this.inputValBirth = false;this.messaggeBirth = 'El campo debe ser llenado obligatoriamente en el formato de día/mes/año.';}
    if(this.persona.direccion == null) {this.inputValAddress = false;this.messaggeAddress = 'El campo debe ser llenado obligatoriamente.'}
    if(this.persona.ci == null) {this.inputValCI = false;this.messaggeCI = 'El campo debe ser llenado obligatoriamente.'}
    if(this.persona.celular == null) {this.inputValMobile = false;this.messaggeMobile = 'El campo debe ser llenado obligatoriamente con caracteres numéricos';}

    if(this.inputValFirstName && this.inputValSurname && this.inputValNationality &&
      this.inputValBirth && this.inputValAddress && this.inputValCI && this.inputValMobile){
        //
        let fecha = this.persona.fechaNacimiento.split('/')
        let date = fecha[2]+"/"+fecha[1]+"/"+fecha[0];
        this.persona.fechaNacimiento = date;  

        this._appPersonaService.postPersona(this.persona)
        .subscribe((data :Persona[]) => {
          this.alert(true, 'Registro exitoso', 'El registro se realizó satisfactoriamente.');
          this.resetForm(form);
        }, res =>{
          this.alert(false, 'Error al registrar','Se ha producido un error en el servidor.');
        });
      }else{
        this.alert(false, 'Error al registrar','Se ha producido un error al guardar el registro.');
      }   
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
