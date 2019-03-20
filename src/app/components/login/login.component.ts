import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { AppUserService } from "../../services/app-user.service";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:User[];
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
    this._appUserService.getVerificarUser(this.user.usuario, this.user.password)
    .subscribe((usuario:User[])=>{this.usuario = usuario});
    this.alertLoading = true;

    setTimeout(() => {
      this.alertLoading = false;
      if(this.usuario != undefined && this.usuario.length > 0){

        if(this.usuario[0].estado){
          if(this._authService.setUser(this.usuario[0])){
            this._router.navigate(['/home']);  
          }
        }else{
          this.alertUsuarioDesabilitado = true;
          setTimeout(() => {
          this.alertUsuarioDesabilitado = false;              
          }, 5000); 
        }
      }else{
        this.alertErrorUser();
      }   
    }, 2500);
  }

  alertErrorUser(){
    this.alertUserIncorrect = true;
    setTimeout(() => {
      this.alertUserIncorrect = false;
    }, 5000);
  }

}
