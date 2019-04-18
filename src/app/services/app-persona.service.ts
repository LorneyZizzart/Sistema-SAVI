import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from "../interfaces/persona.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppPersonaService {

  listaPersonaURL: string = "http://localhost:3000/people";


  constructor(private _http:HttpClient) { }

   getPersonas(): Observable<Persona[]>{

    return this._http.get<Persona[]>(this.listaPersonaURL).pipe(map(res => res));
    }

  getPersona(key$: string):Observable<Persona[]>{
    let url = `${this.listaPersonaURL}/${key$}`;
    return this._http.get<Persona[]>(url).pipe(map(res => res));
  }

  searchCodStudent(codStudent):Observable<Persona[]>{
    let url = `${this.listaPersonaURL}/search/codStudent/${codStudent}`;
    return this._http.get<Persona[]>(url).pipe(map(res => res));
  }

  postPersona(persona:Persona):Observable<Persona[]>{
      let body = JSON.stringify(persona);
      let headers = new HttpHeaders({
         'Content-Type': 'application/json'
      });

      return this._http.post<Persona[]>(this.listaPersonaURL, body, { headers })
      //.pipe(map( res => {return res}));
      .pipe ();
  }

  putPersona(persona:Persona, key$:string):Observable<Persona[]>{
    let body = JSON.stringify(persona);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let url = `${this.listaPersonaURL}/${key$}`;
    return this._http.put<Persona[]>(url, body, {headers})
    .pipe();
  }

  deletePersona(key$:string){
    let url = `${this.listaPersonaURL}/${key$}`;
    return this._http.delete(url).pipe(map(res => res));
  }
}
