import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { AppUserService } from './app-user.service';
import { User } from '../interfaces/user.interface';
import { Persona } from '../interfaces/persona.interface';
import { Departamento } from '../interfaces/departamento.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(private htttp: HttpClient,
              private _appUserService: AppUserService) { }

  setUser(user:User):Boolean{
    if(user){
      let usuario = JSON.stringify(user);
      localStorage.setItem("currentUser", usuario);
      return true;
    }return false;
  }

  getCurrentUser():User{
    let usuario = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(usuario)) {
      let user: User = JSON.parse(usuario);
      return user;
    } else {
      return null;
    }
  }
  //para navbar del dashboard
  setDatosPersonales(persona:User):Boolean{
    if(persona){
      let people =JSON.stringify(persona);
      localStorage.setItem("dataPeople", people);
      return true;
    }else{return false}
  }

  getDatosPersonales():User{
    let persona = localStorage.getItem("dataPeople");
    if(!isNullOrUndefined(persona)){
      let people: User = JSON.parse(persona);
      return people;
    } else {
      return null;
    }
  }

  setDatosDepartamento(departamentos:Departamento):Boolean{
    if(departamentos){
      localStorage.removeItem("departament")
      let departament =JSON.stringify(departamentos);
      localStorage.setItem("departament", departament);
      return true;
    }else{return false}
  }

  getDatosDepartamento():Departamento{
    let departament = localStorage.getItem("departament");
    if(!isNullOrUndefined(departament)){
      let departaments: Departamento = JSON.parse(departament);
      return departaments;
    } else {
      return null;
    }
  }

  logoutUser(){
    localStorage.removeItem("currentUser")
    localStorage.removeItem("dataPeople")
    localStorage.removeItem("departament")
  }
}
