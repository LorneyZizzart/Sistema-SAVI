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

  constructor(private _router:Router, 
              private _appUserService: AppUserService,
              private _authService:AuthService) { }

  ngOnInit() {
  }

  verificarUsuario(){
    this._appUserService.getVerificarUser(this.user)
    .subscribe((usuario:User[])=>{this.usuario = usuario});
    this.alertLoading = true;

    setTimeout(() => {
      if(this.usuario.length > 0)
      this._appUserService.getUser(this.usuario[0].idUsuario).subscribe((data : Persona[]) => {this.persona = data});      
    }, 2000);

    setTimeout(() => {
      this.alertLoading = false;
      if(this.usuario != undefined && this.usuario.length > 0){

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
        this.alertErrorUser();
      }   
    }, 3000);
  }

  alertErrorUser(){
    this.alertUserIncorrect = true;
    setTimeout(() => {
      this.alertUserIncorrect = false;
    }, 5000);
  }

}
