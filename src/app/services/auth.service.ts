import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { AppUserService } from './app-user.service';
import { User } from '../interfaces/user.interface';



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

  logoutUser(){
    localStorage.removeItem("currentUser")
  }
}
