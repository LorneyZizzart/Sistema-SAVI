import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../interfaces/user.interface";
import { Persona } from "../interfaces/persona.interface";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AppUserService {

   user = {};

  listaUserURL: string = "http://localhost:3000/user";


    constructor(private _http:HttpClient) {   }
    //Gestionar User
    //Get Users
  getUsers(idRol, token): Observable<Persona[]>{
    let url = `${this.listaUserURL}/search/users/${idRol}`;
    let headers = new HttpHeaders({
      "Authorization" : "Sabi "+token
   });
    return this._http.get<Persona[]>(url, { headers }).pipe(map(res => res));
    }

  getUser(key$:string, token):Observable<Persona[]>{
      let url = `${this.listaUserURL}/${key$}`;
      let headers = new HttpHeaders({
        "Authorization" : "Sabi "+token
     });
      return this._http.get<Persona[]>(url, { headers }).pipe();
    }
  
  getVerificarUser(user:User):Observable<User>{
      let body = JSON.stringify(user);
      let headers = new HttpHeaders({
         'Content-Type': 'application/json'
      });
      let url = `${this.listaUserURL}/login/`;
      return this._http.post<User>(url, body, { headers }).pipe ();
  }

  searchUser(user:string, token):Observable<User[]>{
    let url = `${this.listaUserURL}/search/name/${user}`;
    let headers = new HttpHeaders({
      "Authorization" : "Sabi "+token
   });
    return this._http.get<User[]>(url, { headers }).pipe(map(res => res));
  }

  postUser(user:User, token):Observable<User[]>{
      let body = JSON.stringify(user);
      let headers = new HttpHeaders({
         'Content-Type': 'application/json',
         "Authorization" : "Sabi " + token 
      });

      return this._http.post<User[]>(this.listaUserURL, body, { headers })
      //.pipe(map( res => {return res}));
      .pipe ();
    }

  deleteUser(key$:string, token){
    let url = `${this.listaUserURL}/${key$}`;
    let headers = new HttpHeaders({
      "Authorization" : "Sabi "+token
   });
    return this._http.delete(url, { headers }).pipe(map(res => res));
  }

  putUser(user:User, key$:string, idPersona:string, token):Observable<User[]>{
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      "Authorization" : "Sabi " + token
    });
    let url = `${this.listaUserURL}/${key$}/${idPersona}`;
    return this._http.put<User[]>(url, body, {headers})
    .pipe();
  }
}
