import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { Persona } from "../../interfaces/persona.interface";
import { AppUserService } from "../../services/app-user.service";
import { AppPersonaService } from "../../services/app-persona.service";
import { Carrera } from '../../interfaces/carrera.interface';
import { AppCarreraService } from '../../services/app-carrera.service';
import { AuthService } from '../../services/auth.service';
import { AppApiSistemaAcademicoService } from '../../services/app-api-sistema-academico.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-gestionar-usuario',
  templateUrl: './gestionar-usuario.component.html',
  styleUrls: ['./gestionar-usuario.component.css']
})
export class GestionarUsuarioComponent implements OnInit {
  // usuario logeado
  private userLog:User = {};
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
  alertWarning:boolean = false;
  public userPersona: User[];
  //se utiliza para el buscador el usuario
  usuariosArray:User[];
  usuario:User[];
  personas:User[];
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

  estudiante:User[] = [];

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
  inputValMobile:boolean = true; messaggeMobile:string = null;
  //EDIT PEOPLE
  inputValEditCodStudent:boolean = true;
  inputValEditFirstName:boolean = true;
  inputValEditSecondName:boolean = true;
  inputValEditSurname:boolean = true;
  inputValEditSecondSurname:boolean = true;
  inputValEditSemester:boolean = true;
  inputValEditNationality:boolean = true;
  inputValEditBirth:boolean = true;
  inputValEditAddress:boolean = true;
  inputValEditCI:boolean = true;
  inputValEditMobile:boolean = true;
  //RESGISTER USER
  inputValSelectPeople:boolean = true; messageSelectPeople:string = null;
  inputValSelectRol:boolean = true; messageSelectRol:string = null;
  inputValUser:boolean = true; messageUser:string = null;
  inputValPassword:boolean = true; messagePassword:string = null;
  inputValPassword2:boolean = true; messagePassword2:string = null;
  //EDIT USER
  inputValEditSelectRol:boolean = true;
  inputValEditUser:boolean = true;
  inputValEditPassword:boolean = true;
  inputValEditPassword2:boolean = true;
  //para esconder el password
  typePassword:boolean;
  letters="abcdefghyjklmnñopqrstuvwxyz";
  numbers="0123456789";
  simbolos="/*-+|°!#$%&()=¿?,;.:_{}[]><";
  imagen:string = 'Jhonny.png';

  // API SISTEMA ACADEMICO
  listaEstudiantesSA:Persona[];
  cantidadEstudiantes:number = 0;
    
  constructor( private _appUserService: AppUserService,
              private _appPersonaService: AppPersonaService,
              private _appCarreraService:AppCarreraService,
              private _authService:AuthService,
              private _appApiSistemaAcademicoService : AppApiSistemaAcademicoService) {
  }

  ngOnInit() {
    this.obtenerUsuario();
    if(this.userLog != null){
      this.getUsers(this.userLog.idRol);
      this.getCarreras();
    }    
  }

  cargarImg(img){
    console.log("imagen url: ", img.target.files[0])
    this.imagen = img.target.files[0].name;
  }
  //obtencion de datos del usuario logeado
  obtenerUsuario(){
    this.userLog = this._authService.getCurrentUser();

  }

   //resetear el FORMULARIO no estamos usando
  resetForm(formulario:NgForm){
    formulario.reset({});
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

  hidePassword(){
    this.typePassword  = !this.typePassword 
  }

  //inputs de Registrar Persona
  inputCodStudent(value, opcion){
    var valCodStudent = true;
    if(value != null){
    if(value.length == 9){
      for (let i = 0; i < value.length; i++) {
        if(this.simbolos.indexOf(value.charAt(i),0)!=-1){valCodStudent = false; break}
        if(this.letters.indexOf(value.charAt(i),0)!=-1){valCodStudent = false; break}    
      }
      if(valCodStudent){
        this._appPersonaService.searchCodStudent(value)
          .subscribe((data:Persona[])=>{
            if(data.length > 0) {
              if(opcion == 1) this.inputValCodStudent = false;
              if(opcion == 2) this.inputValEditCodStudent = false;
              this.messaggeCodStudent = 'El código de estudiante se encuentra registrado.';
            }else{
              if(opcion == 1) this.inputValCodStudent = true;
              if(opcion == 2) this.inputValEditCodStudent = true;
            }            
          },res =>{
            if(opcion == 1) this.inputValCodStudent = false;
            if(opcion == 2) this.inputValEditCodStudent = false;
          });
      }else{
        if(opcion == 1) this.inputValCodStudent = false;
        if(opcion == 2) this.inputValEditCodStudent = false;
        this.messaggeCodStudent = 'Debe contener 9 caracteres numéricos y no se permite letras.';
      }
    }else if(value.length >= 1 && value.length <= 8){
      if(opcion == 1) this.inputValCodStudent = false;
      if(opcion == 2) this.inputValEditCodStudent = false;
      this.messaggeCodStudent = 'Debe contener 9 caracteres numéricos y no se permite letras.';
    }else if (value.length > 9){
      if(opcion == 1) this.inputValCodStudent = false;
      if(opcion == 2) this.inputValEditCodStudent = false;
      this.messaggeCodStudent = 'Solo se permite 9 caracteres numéricos.';
    }else if (value.length == 0) {
      if(opcion == 1) this.inputValCodStudent = true;
      if(opcion == 2) this.inputValEditCodStudent = true;
    }
    }
  }

  inputFirstName(value, opcion){
    var valName = true;
    if(value != null){
      if(value.length > 0){
        for (let i = 0; i < value.length; i++) { 
          if(this.simbolos.indexOf(value.charAt(i),0)!=-1){valName = false; break}
          if(this.numbers.indexOf(value.charAt(i),0)!=-1){valName = false; break}
        }
        if(valName){
          if(opcion == 1) this.inputValFirstName = true;
            if(opcion == 2) this.inputValEditFirstName = true;
        }else{
          if(opcion == 1) this.inputValFirstName = false;
          if(opcion == 2) this.inputValEditFirstName = false;
          this.messaggeFullName = 'No se permite caracteres numéricos ni símbolos.';
        }
      }else {
        if(opcion == 1) this.inputValFirstName = false;
        if(opcion == 2) this.inputValEditFirstName = false;
        this.messaggeFullName = 'El campo debe ser llenado obligatoriamente.';
      }
    }     
  }

  inputSecondName(value, opcion){
    var valName = true;
    if(value != null){
      if(value.length > 0){
        for (let i = 0; i < value.length; i++) {
          if(this.simbolos.indexOf(value.charAt(i),0)!=-1){valName = false; break}
          if(this.numbers.indexOf(value.charAt(i),0)!=-1){valName = false; break}
        }
        if(valName){
          if(opcion == 1) this.inputValSecondName = true;
          if(opcion == 2) this.inputValEditSecondName = true;
        }else{
          if(opcion == 1) this.inputValSecondName = false;
          if(opcion == 2) this.inputValEditSecondName = false;
          this.messaggeFullName = 'No se permite caracteres numéricos ni símbolos.';
        }
      }else{
        if(opcion == 1) this.inputValSecondName = true;
        if(opcion == 2) this.inputValEditSecondName = true;
      }
    }    
  }

  inputSurname(value, opcion){
    var valSurname = true;
    if(value != null){
    if(value.length > 0){
      for (let i = 0; i < value.length; i++) {
        if(this.simbolos.indexOf(value.charAt(i),0)!=-1){valSurname = false; break}
        if(this.numbers.indexOf(value.charAt(i),0)!=-1){valSurname = false; break}
      }
      if(valSurname){
        if(opcion == 1) this.inputValSurname = true;
        if(opcion == 2) this.inputValEditSurname = true;
      }else{
        if(opcion == 1) this.inputValSurname = false;
        if(opcion == 2) this.inputValEditSurname = false;
        this.messaggeFullName = 'No se permite caracteres numéricos ni símbolos.';
      }
    }else {
      if(opcion == 1) this.inputValSurname = false;
      if(opcion == 2) this.inputValEditSurname = false;
      this.messaggeFullName = 'El campo debe ser llenado obligatoriamente.';
    }
    }
  }

  inputSecondSurname(value, opcion){
    var valSurname = true;
    if(value != null){
    if(value.length > 0){
      for (let i = 0; i < value.length; i++) {
        if(this.simbolos.indexOf(value.charAt(i),0)!=-1){valSurname = false; break}
        if(this.numbers.indexOf(value.charAt(i),0)!=-1){valSurname = false; break}
      }
      if(valSurname){
        if(opcion == 1) this.inputValSecondSurname = true;
        if(opcion == 2) this.inputValEditSecondSurname = true;
      }else{
        if(opcion == 1) this.inputValSecondSurname = false;
        if(opcion == 2) this.inputValEditSecondSurname = false;
        this.messaggeFullName = 'No se permite caracteres numéricos ni símbolos.';
      }
    }else{
      if(opcion == 1) this.inputValSecondSurname = true;
      if(opcion == 2) this.inputValEditSecondSurname = true;
    } 
    }
  }

  inputSemester(value, opcion){
    var valSemester = true;
    if(value != null){
    if(parseInt(value)>0){
      for (let i = 0; i < value.length; i++) {
        if(this.simbolos.indexOf(value.charAt(i),0)!=-1){valSemester = false; break}
        if(this.letters.indexOf(value.charAt(i),0)!=-1){valSemester = false; break}
      }
      if(valSemester){
        if(parseInt(value) >=1 && parseInt(value) <= 9){
          if(opcion == 1) this.inputValSemester = true;
          if(opcion == 2) this.inputValEditSemester = true;           
        }else if (parseInt(value) > 9){
          if(opcion == 1) this.inputValSemester = false;
          if(opcion == 2) this.inputValEditSemester = false;
          this.messaggeSemester = 'Solo se permiten valores numéricos del 1 al 9.';
        }
      }else{
        if(opcion == 1) this.inputValSemester = false;
        if(opcion == 2) this.inputValEditSemester = false;
        this.messaggeSemester = 'No se permite caracteres literarios ni símbolos.';
      }     
    }else if(value.length == 0){
      if(opcion == 1) this.inputValSemester = true;
      if(opcion == 2) this.inputValEditSemester = true;
    }
    else{
      if(opcion == 1) this.inputValSemester = false;
      if(opcion == 2) this.inputValEditSemester = false;
      this.messaggeSemester = 'Solo se permiten valores numéricos del 1 al 9.';
    }
    }
  }

  inputNationality(value, opcion){
    var valNationality = true;
    if(value != null){
    if(value.length > 0){
      for (let i = 0; i < value.length; i++) {
        if(this.simbolos.indexOf(value.charAt(i),0)!=-1){valNationality = false; break}
        if(this.numbers.indexOf(value.charAt(i),0)!=-1){valNationality = false; break}
      }
      if(valNationality){
        if(opcion == 1) this.inputValNationality = true;
        if(opcion == 2) this.inputValEditNationality = true;
      }else{
        if(opcion == 1) this.inputValNationality = false;
        if(opcion == 2) this.inputValEditNationality = false;
        this.messaggeNationality = 'No se permite caracteres numéricos ni símbolos.';
      }
    }else {
      if(opcion == 1) this.inputValNationality = false;
      if(opcion == 2) this.inputValEditNationality = false;
      this.messaggeNationality = 'El campo debe ser llenado obligatoriamente.';
    }
    }
  }

  inputBirth(value, opcion){
    if(value != null){
      var valDay = false, valMonth = false, valYear = false;
      var date = new Date();
      var infYear = parseInt(date.getFullYear().toString()) - 100;
      if(value.length > 0){
        for (let i = 0; i < value.length; i++) {
          if(this.letters.indexOf(value.charAt(i),0)!=-1){
            if(opcion == 1) this.inputValBirth = false;
            if(opcion == 2) this.inputValEditBirth = false;
            this.messaggeBirth = 'No se permite caracteres literarios.';
            break;
          }else {
            if(value.substr(2,1) == '/' && value.substr(5,1) == '/'){            
              if(value.substr(0,2) > 0 && value.substr(0,2) <= 31){
                valDay = true;
              }else{
                if(opcion == 1) this.inputValBirth = false;
                if(opcion == 2) this.inputValEditBirth = false;
                valDay = false;
                this.messaggeBirth = 'El valor del día debe ser entre 01 a 31';
              }
              if(value.substr(3,2) > 0 && value.substr(3,2) <= 12){
                valMonth = true;
              }else{
                if(opcion == 1) this.inputValBirth = false;
                if(opcion == 2) this.inputValEditBirth = false;
                valMonth = false;
                this.messaggeBirth = 'El valor del mes debe ser entre 01 a 12';
              }
              if(value.length > 6){
                if(parseInt(value.substr(6)) > infYear && parseInt(value.substr(6)) < parseInt(date.getFullYear().toString())) {
                  valYear = true;
                }else {
                  if(opcion == 1) this.inputValBirth = false;
                  if(opcion == 2) this.inputValEditBirth = false;
                  valYear =false;
                  this.messaggeBirth = 'Debe ser un año valido y inferior al año actual.';
                }
              }            
              if(valDay == true && valMonth == true && valYear == true){
                if(opcion == 1) this.inputValBirth = true;
                if(opcion == 2) this.inputValEditBirth = true;
              }
            }else{
              if(opcion == 1) this.inputValBirth = false;
              if(opcion == 2) this.inputValEditBirth = false;
              this.messaggeBirth = 'La fecha debe ser en el formato día/mes/año.';
            }                  
          }
        }
      }else{
        if(opcion == 1) this.inputValBirth = false;
        if(opcion == 2) this.inputValEditBirth = false;
        this.messaggeBirth = 'El campo debe ser llenado obligatoriamente en el formato de día/mes/año.';
      }
    }
  }

  inputAddress(value, opcion){
    if(value != null){
    if(value.length > 0){
      if(opcion == 1) this.inputValAddress = true;
      if(opcion == 2) this.inputValEditAddress = true;
    }
    else {
      if(opcion == 1) this.inputValAddress = false;
      if(opcion == 2) this.inputValEditAddress = false;
      this.messaggeAddress = 'El campo debe ser llenado obligatoriamente.'
    }
    }
  }

  inputCI(value, opcion){
    if(value != null){
    if(value.length > 0){
      if(opcion == 1) this.inputValCI = true;
      if(opcion == 2) this.inputValEditCI = true;
    }
    else {
      if(opcion == 1) this.inputValCI = false;
      if(opcion == 2) this.inputValEditCI = false;
      this.messaggeCI = 'El campo debe ser llenado obligatoriamente.'
    }
  }
  }

  inputMobile(value, opcion){
    var valMobile = true;
    if(value != null){
    if(value.length > 0 && value != " "){
      for (let i = 0; i < value.length; i++) {
        if(this.simbolos.indexOf(value.charAt(i),0)!=-1){valMobile = false; break}
        if(this.letters.indexOf(value.charAt(i),0)!=-1){valMobile = false; break}
      }
      if(valMobile){
        if(opcion == 1) this.inputValMobile = true;
        if(opcion == 2) this.inputValEditMobile = true;
      }else{
        if(opcion == 1) this.inputValMobile = false;
        if(opcion == 2) this.inputValEditMobile = false;
        this.messaggeMobile = 'No se permite caracteres literarios ni símbolos.';
      }  
    }else{
      if(opcion == 1) this.inputValMobile = false;
      if(opcion == 2) this.inputValEditMobile = false;
      this.messaggeMobile = 'El campo debe ser llenado obligatoriamente con caracteres numéricos.';
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
          this.user.usuario = (persona.primerNombre+persona.primerApellido).toLowerCase().replace(/ /g,"").substr(0,6);
          this.password = (persona.primerApellido).toLowerCase().replace(/ /g,"").substr(0,3)+(persona.ci).toLowerCase().replace(/ /g,"").substr(0,3);       
          this._appUserService.searchUser(this.user.usuario )
          .subscribe((data:User[])=>{
            if(data.length > 0){ this.inputValUser = false;
              this.messageUser = 'El nombre generado de usuario ya existe.';
            }else{
              this.inputValUser = true; 
            }
          }, res => {this.inputValUser = false;
            this.messageUser = 'Se ha producido un error en el servidor.'})
          if(this.password != this.passwordTwo){
            this.inputValPassword2 = false;
            this.messagePassword2 = 'Debe escribir la misma contraseña para confirmar.'
          }
        }
      }
    }       
  }
  inputUser(value, opcion){
    var validInput = true;
    if(value != null){
      if(value.length == 0){
        if(opcion == 1) this.inputValUser = false;
        if(opcion == 2) this.inputValEditUser = false;
        this.messageUser = 'El campo debe ser llenado obligatoriamente.'
      }else if(value.length > 5){
        for (let i = 0; i < value.length; i++) {
          if(this.simbolos.indexOf(value.charAt(i),0)!=-1){validInput = false; break}
        }
        if(validInput){
          this._appUserService.searchUser(value)
          .subscribe((data:User[])=>{
            if(data.length > 0){
              if(opcion == 1) this.inputValUser = false;
              if(opcion == 2) this.inputValEditUser = false;
              this.messageUser = 'El nombre de usuario ya existe.'; 
            }else{
              if(opcion == 1) this.inputValUser = true;
              if(opcion == 2) this.inputValEditUser = true;
            }               
          }, res =>{
            if(opcion == 1) this.inputValUser = false;
            if(opcion == 2) this.inputValEditUser = false;
            this.messageUser = 'Se ha producido un error en el servidor.'})
        }else{
          if(opcion == 1) this.inputValUser = false;
          if(opcion == 2) this.inputValEditUser = false;
          this.messageUser = 'No debe contener símbolos y ni espacios.'
        }
      }else{
        if(opcion == 1) this.inputValUser = false;
        if(opcion == 2) this.inputValEditUser = false;
        this.messageUser = 'Debe contener al menos 6 caracteres numéricos o literarios, sin símbolos y ni espacios.'
      }
    }
  }
  inputPassword1(value, opcion){
    var valLetters = false, valNumbers = false;
    if(value != null){
      if(value.length == 0){
        if(opcion == 1) this.inputValPassword = false;
        if(opcion == 2) this.inputValEditPassword = false;
        this.messagePassword = 'El campo debe ser llenado obligatoriamente.';
      }else if(value.length > 5){
        for (let i = 0; i < value.length; i++) {
          if(this.letters.indexOf(value.charAt(i),0)!=-1) valLetters = true;
          if(this.numbers.indexOf(value.charAt(i),0)!=-1) valNumbers = true;
          if(this.simbolos.indexOf(value.charAt(i),0)!=-1){
            valLetters = false; valNumbers = false;            
            break;
          }
        }
        if(valLetters && valNumbers){
          if(opcion == 1) {
            this.inputValPassword = true;
            if(this.password != this.passwordTwo){
              this.inputValPassword2 = false;
              this.messagePassword2 = 'La contraseñas deben ser iguales.';
            }            
          }
          if(opcion == 2){
            this.inputValEditPassword = true;
            if(this.edituser.password != this.editPassword){
              this.inputValEditPassword2 = false;
              this.messagePassword2 = 'La contraseñas deben ser iguales.';
            }
          }
        }else{
          if(opcion == 1) this.inputValPassword = false;
          if(opcion == 2) this.inputValEditPassword = false;
          this.messagePassword = 'No debe contener símbolos y ni espacios.'
        }
      }else{
        if(opcion == 1) this.inputValPassword = false;
        if(opcion == 2) this.inputValEditPassword = false;
        this.messagePassword = 'Debe contener al menos 6 caracteres entre letras y números, sin símbolos y ni espacios.';
      }
    }
  }

  inputPassword2(value, opcion){
    var valLetters = false, valNumbers = false;
    if(value != null){
      if(value.length == 0){
        if(opcion == 1) this.inputValPassword2 = false;
        if(opcion == 2) this.inputValEditPassword2 = false;        
        this.messagePassword2 = 'El campo debe ser llenado obligatoriamente.';
      }else if(value.length > 5){
        for (let i = 0; i < value.length; i++) {
          if(this.letters.indexOf(value.charAt(i),0)!=-1) valLetters = true;
          if(this.numbers.indexOf(value.charAt(i),0)!=-1) valNumbers = true;
          if(this.simbolos.indexOf(value.charAt(i),0)!=-1){
            valLetters = false; valNumbers = false;
            break;
          }
        }
        if(valLetters && valNumbers){
          if(opcion == 1) {
            this.inputValPassword2 = true;
            if(this.password!=this.passwordTwo){
              this.inputValPassword2 = false;
              this.messagePassword2 = 'La contraseñas deben ser iguales.'
            }            
          }else if(opcion == 2) {
            this.inputValEditPassword2 = true;
            if(this.edituser.password!=this.editPassword){
              this.inputValEditPassword2 = false;
              this.messagePassword2 = 'La contraseñas deben ser iguales.'
            }
          } 
        }else{
          if(opcion == 1) this.inputValPassword2 = false;
          if(opcion == 2) this.inputValEditPassword2 = false; 
          this.messagePassword2 = 'No debe contener símbolos y ni espacios.'
        }
      }else{
        if(opcion == 1) this.inputValPassword2 = false;
        if(opcion == 2) this.inputValEditPassword2 = false; 
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

  getUsers(idRol) {
    this._appUserService.getUsers(idRol)
    .subscribe((users: Persona[]) => {
      this.userPersona = users; 
      this.usuariosArray = this.userPersona;
    });
  }
  buscarEstudiante(idPersona:string){
    this.infoCarrera = null;
    this.infoSemestre = null;

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

        for(let carrera of this.carreras){
          if(carrera.idCarrera == estudiante.idCarrera)
            this.infoCarrera = carrera.nombreCarrera;
        }
        this.infoCodEstudiante = estudiante.codEstudiante;        
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
    this.inputValEditCodStudent = true;
    this.inputValEditFirstName = true;
    this.inputValEditSecondName = true;
    this.inputValEditSurname = true;
    this.inputValEditSecondSurname = true;
    this.inputValEditSemester = true;
    this.inputValEditNationality = true;
    this.inputValEditBirth = true;
    this.inputValEditAddress = true;
    this.inputValEditCI = true;
    this.inputValEditMobile = true;
    this.idPersona = idPersona; 
    this.idUsuario = idUsuario;   
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
        for(let carrera of this.carreras){
          if(carrera.idCarrera == estudiante.idCarrera)
          this.editpersona.carrera = carrera.nombreCarrera;  
        }              
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

  saveUser(idPersona, idRol, form:NgForm) {
    if(idPersona == null || idRol == ""){this.inputValSelectRol = false; this.messageSelectRol='Debe seleccionar un rol para el usuario.'}
    if(idPersona == null || idPersona == ""){this.inputValSelectPeople = false; this.messageSelectPeople='Debe seleccionar un nombre para el usuario.'}
    if(this.user.usuario == null){this.inputValUser=false; this.messageUser='El campo debe ser llenado obligatoriamente.';}
    if(this.password == null){this.inputValPassword=false; this.messagePassword='El campo debe ser llenado obligatoriamente.';}
    if(this.passwordTwo == null){this.inputValPassword2=false; this.messagePassword2='El campo debe ser llenado obligatoriamente.';}

    if(this.inputValSelectPeople && this.inputValSelectRol && this.inputValUser && this.inputValPassword && this.inputValPassword2){
      this.user.idPersona = idPersona;
      this.user.idRol = idRol;
      this.user.password = this.passwordTwo;      
      this._appUserService.postUser(this.user)
      .subscribe((data :User[]) => {
        this.alert(1, 'Registro exitoso','El registro del usuario se realizó satisfactoriamente.');
        this.resetForm(form);
        this.getUsers(this.userLog.idRol);
      },res => {
        this.alert(2, 'Error al registrar','Se ha producido un error en el servidor.');
      });
    }else this.alert(2, 'Error al registrar','Se ha producido un error al guardar el registro del usuario.');       
  }  

  editUsers(idRol){
    this.edituser.estado = '1';
    this.edituser.idRol = idRol;
    this._appUserService.putUser(this.edituser, this.idUsuario, this.idPersona)
    .subscribe((data :User[]) => {
      this.alert(1,'Actualización exitoso', 'Los datos del usuario se actualizarion satisfactoriamente.')
      this.getUsers(this.userLog.idRol);
    }
    ,res =>{this.alert(2, 'Error', 'Se ha producido un error en el servidor al actualizar los datos.')});
  }

  editEstadoUser(idRol, usuario, password, estado, idUsuario, idPersona){
    this.user.idRol = idRol;
    this.user.usuario = usuario;
    this.user.password = password;
    this.user.estado = estado;
    this._appUserService.putUser(this.user, idUsuario, idPersona)
      .subscribe((data: User[]) => {
        if(estado == 1)this.alert(1, 'Habilitación exitosa','Se ha habilitado la cuenta del usuario.')
        if(estado == 0)this.alert(3, 'Deshabilitación exitosa','Se ha habilitado la cuenta del usuario.')
        this.getUsers(this.userLog.idRol);
      }, res => {
        this.alert(2, 'Error','Se ha producido un error en el servidor al cambiar de estado.')
      });
  }

  deleteUser(idUsuario:string, idPersona:string){
    this.idUsuario = idUsuario;
    this.idPersona = idPersona;
  }
  eliminarUser(){
    var successDelete = false;
    if(this.idUsuario != null){
      this._appUserService.deleteUser(this.idUsuario)
        .subscribe((user : User[]) => { successDelete = true},res => { successDelete = false});
      this._appPersonaService.deletePersona(this.idPersona)
      .subscribe((persona : Persona[]) =>{
        if(successDelete) this.alert(1, 'Eliminación exitoso','El registro del usuario fue eliminado satisfactoriamente.')
        else this.alert(2, 'Error al eliminar', 'Se ha poducido un error en el servidor al eliminar la cuenta del usuario.')
        this.getUsers(this.userLog.idRol);
      }, res => {this.alert(2, 'Error al eliminar', 'Se ha poducido un error en el servidor al eliminar los datos del usuario.')});
    }else this.alert(2, 'Error al eliminar', 'Se ha poducido un error en el sistema al eliminar la cuenta del usuario.')
  }

  //Gestionar Personas
  getPersonas() {
    this._appPersonaService.getPersonas().subscribe((personas:Persona[]) => this.personas = personas);
  }

  savePersona() {
    if(this.persona.primerNombre == null) {this.inputValFirstName = false;this.messaggeFullName = 'El campo debe ser llenado obligatoriamente.';}
    if(this.persona.primerApellido == null){this.inputValSurname = false;this.messaggeFullName = 'El campo debe ser llenado obligatoriamente.';}
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
        this.persona.idCarrera = this.persona.idCarrera;

        this._appPersonaService.postPersona(this.persona)
        .subscribe((data :Persona[]) => {
          this.alert(1, 'Registro exitoso', 'El registro se realizó satisfactoriamente.');
          this.getUsers(this.userLog.idRol);
        }, res =>{
          this.alert(2, 'Error al registrar','Se ha producido un error en el servidor.');
        });
      }else{
        this.alert(2, 'Error al registrar','Se ha producido un error al guardar el registro en el sistema.');
      }   
  }

  editarPersona(){
    if(this.editpersona.primerNombre == null){this.inputValEditFirstName = false;this.messaggeFullName = 'El campo debe ser llenado obligatoriamente.';}
    if(this.editpersona.primerApellido == null){this.inputValEditSurname = false;this.messaggeFullName = 'El campo debe ser llenado obligatoriamente.';}
    if(this.editpersona.nacionalidad == null){this.inputValEditNationality = false;this.messaggeNationality = 'El campo debe ser llenado obligatoriamente.';}
    if(this.editpersona.fechaNacimiento == null){this.inputValEditBirth = false;this.messaggeBirth = 'El campo debe ser llenado obligatoriamente.';}
    if(this.editpersona.direccion == null){this.inputValEditAddress = false;this.messaggeAddress = 'El campo debe ser llenado obligatoriamente.';}
    if(this.editpersona.ci == null){this.inputValEditCI= false;this.messaggeCI = 'El campo debe ser llenado obligatoriamente.';}
    if(this.editpersona.celular == null){this.inputValEditMobile = false;this.messaggeMobile = 'El campo debe ser llenado obligatoriamente.';}
    if(this.inputValEditFirstName && this.inputValEditSurname && this.inputValEditNationality && this.inputValEditBirth
      && this.inputValEditAddress && this.inputValEditAddress && this.inputValEditCI && this.inputValEditMobile){
        let fecha =  this.editpersona.fechaNacimiento.split('/');
        let date = fecha[2]+"/"+fecha[1]+"/"+fecha[0]
        this.editpersona.fechaNacimiento = date;
        this._appPersonaService.putPersona(this.editpersona, this.idPersona)
        .subscribe((data : Persona[]) =>{
          this.alert(1,'Actualización exitoso', 'Los datos del usuario fueron actualizados satisfactoriamente.')
          this.getUsers(this.userLog.idRol);
        }
        , res =>{this.alert(2, 'Error', 'Se ha producido un error en el servidor al actualizar los datos.')});
    }else{
      this.alert(2, 'Error al actualizar','Se ha producido un error al actualizar el registro.');
    }    
  }

  //Gestionar Carrera
  getCarreras(){
    this._appCarreraService.getListCarrera()
    .subscribe((carrera : Carrera[]) => {this.carreras = carrera})
  }

  // gestionar consumir API SISTEMA ACADEMICO

  buscarEstudianteSA(codEstudiante:string){
    if(codEstudiante.length == 9){
      this.getEstudianteSA(parseInt(codEstudiante));
    }
  }

  listarEstudiantesSA(){
    this.cantidadEstudiantes += 4;
    this.getEstudiantesSA(this.cantidadEstudiantes);
  }

  agregarEstudiante(idEstudiante:string){    

    for(let estudiante of this.listaEstudiantesSA){     
      if (estudiante.idEstudiante == idEstudiante) {

          var nombres = estudiante.nombres.split(" ");
          this.persona.primerNombre = nombres[0];
          this.persona.segundoNombre = nombres[1];

          var apellidos = estudiante.apellidos.split(" ");
          this.persona.primerApellido = apellidos[0];
          this.persona.segundoApellido = apellidos[1]; 

        this.persona.codEstudiante = estudiante.codEstudiante;
        this.persona.ci = estudiante.ci;
        this.persona.semestre = estudiante.semestre;
        this.persona.nacionalidad = estudiante.nacionalidad;
        this.persona.direccion = estudiante.direccion;
        this.persona.celular = estudiante.celular;
        this.persona.fechaNacimiento = estudiante.fechaNacimiento;
        for(let carrera of this.carreras){
          if(carrera.nombreCarrera == estudiante.carrera)
          this.persona.idCarrera = carrera.idCarrera; 
        }          
      }
    }
    this._appPersonaService.searchCodStudent(this.persona.codEstudiante)
          .subscribe((data:Persona[])=>{
            if(data.length > 0) {
              this.alert(3, 'Error al agregar', 'El estudiante se encuentra registrado en el sistema Sabi.');              
            }else{
              this._appPersonaService.postPersona(this.persona)
                .subscribe((data :Persona[]) => {
                  this.alert(1, 'Registro exitoso', 'El registro se agregó satisfactoriamente.');
                }, res =>{
                  this.alert(2, 'Error al agregar','Se ha producido un error en el servidor.');
                });
            }
          });
    
  }

  getEstudiantesSA(cantidad:number){
    this._appApiSistemaAcademicoService.getEstudiantesSA(cantidad).subscribe((estudiantes:Persona[]) => {
      this.listaEstudiantesSA = estudiantes;
    })
  }

  getEstudianteSA(codEstudiante:number){
    this._appApiSistemaAcademicoService.getEstudianteSA(codEstudiante).subscribe((estudiante:Persona[]) => {
      this.listaEstudiantesSA = estudiante;
    })
  }  

}
