import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { AppUserService } from "../../services/app-user.service";
import { AuthService } from '../../services/auth.service';
import { Persona } from '../../interfaces/persona.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:User[];
  persona:Persona[];
  private user:User = {};
  alertUserIncorrect:boolean = false;
  alertLoading:boolean = false;
  alertUsuarioDesabilitado:boolean = false;
  messageError:string;
  //validar input's
  inputErrorUsuario = true;
  inputSuccessUsuario = false;
  inputErrorPassword = true;
  inputSuccessPassword = false;
  //el icono de candaddo de password para poder poner en 0/1
  iconPassword:boolean = true;


  constructor(private _router:Router, 
              private _appUserService: AppUserService,
              private _authService:AuthService) { }

  ngOnInit() {
  }

  inputUser(value){
    if (value.length >= 6) {
      this.inputErrorUsuario = true
      this.inputSuccessUsuario = true;
    }else if(value.length == 0){
      this.inputErrorUsuario = false
      this.inputSuccessUsuario = false;
    }
  }

  inputPassword(value){
    var numbers = "0123456789"
    var letras="abcdefghyjklmnñopqrstuvwxyz";
    var valNumbers = false;
    var valLetras = false;
    this.iconPassword = true;
    if (value.length > 5) {
      for (let i = 0; i < value.length; i++) {
        if(numbers.indexOf(value.charAt(i),0)!=-1) valNumbers = true;
        if(letras.indexOf(value.charAt(i),0)!=-1) valLetras = true;       
      }
      if(valLetras && valNumbers){   
        this.inputErrorUsuario = true;  
        this.inputSuccessUsuario = true;   
        this.inputErrorPassword  = true;
        this.inputSuccessPassword  = true;        
      }      
    }else if(value.length == 0){
      this.iconPassword = false;
      this.inputErrorPassword = false
      this.inputSuccessPassword  = false;
    }
  }

  verificarUsuario(){
    if(this.inputSuccessUsuario && this.inputSuccessPassword){
      this._appUserService.getVerificarUser(this.user)
      .subscribe((usuario:User[])=>{this.usuario = usuario});
      this.alertLoading = true;
  
      setTimeout(() => {
        if(this.usuario.length > 0)
          this._appUserService.getUser(this.usuario[0].idUsuario).subscribe((data : Persona[]) => {this.persona = data});                    
      }, 2000);
  
      setTimeout(() => {
        this.alertLoading = false;
        if(this.usuario.length > 0){
          if(this.usuario[0].estado){
            if(this._authService.setUser(this.usuario[0])){
              this._authService.setDatosPersonales(this.persona[0]);
              this._router.navigate(['/home']);  
            }
          }else{
            this.alertUsuarioDesabilitado = true;
            setTimeout(() => {
            this.alertUsuarioDesabilitado = false;              
            }, 6000); 
          }
        }else{
          this.iconPassword = false;
          this.inputErrorUsuario = false
          this.inputSuccessUsuario = false;
          this.inputErrorPassword = false
          this.inputSuccessPassword  = false;
          this.messageError = 'El usuario y la contraseña no son validos';
          this.alertErrorUser();
        }   
      }, 3000);
    }else{
      this.messageError = 'El usuario y la contraseña no son validos';
      this.alertErrorUser();
      this.iconPassword = false;
      this.inputErrorUsuario = false
      this.inputSuccessUsuario = false;
      this.inputErrorPassword = false
      this.inputSuccessPassword  = false;
    }
  }

  alertErrorUser(){
    this.alertUserIncorrect = true;
    setTimeout(() => {
      this.alertUserIncorrect = false;
    }, 5000);
  }

}
