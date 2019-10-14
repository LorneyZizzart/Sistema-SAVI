import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from "../interfaces/persona.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppTipoPersonaService {

  listaTipoPersonaURL: string = "http://localhost:3000/tipoPersona";

  constructor(private _http: HttpClient) { }

  getTipoPersona(value:string): Observable<Persona[]> {
    let url = `${this.listaTipoPersonaURL}/${value}`;
    return this._http.get<Persona[]>(url).pipe(map(res => res));
  }

  getMaxIdPersona() {
    return this._http.get(this.listaTipoPersonaURL).pipe(map(res => res));
  }

  getInfoStudentF(idEstudiante){
    let url = `${this.listaTipoPersonaURL}/finanzas/infoEstudiante/${idEstudiante}`;
    return this._http.get<Persona[]>(url).pipe(map(res => res));
  }

  getInfoStudentFinanzas(){
    let url = `${this.listaTipoPersonaURL}/finanzas/infoEstudiante/`;
    return this._http.get<Persona[]>(url).pipe(map(res => res));
  }

  getInfoEstudiantes(idDepartamento:string, idPesona:string){
    let url = `${this.listaTipoPersonaURL}/infoEstudiante/${idDepartamento}/${idPesona}`;
    return this._http.get<Persona[]>(url).pipe(map(res => res));
  }

  //Para listar lso estudiantes x departamento para asignar a una area
  getListStudentDepto(idDepartamento:string){
    let url = `${this.listaTipoPersonaURL}/estDep/${idDepartamento}`;
    return this._http.get<Persona[]>(url).pipe(map(res => res));
  }

  postEstudiante(estudiante:Persona): Observable<Persona[]> {
    let body = JSON.stringify(estudiante);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post<Persona[]>(this.listaTipoPersonaURL, body, { headers })
      .pipe();
  }
}
