import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Departamento } from '../interfaces/departamento.interface';
import { Persona } from '../interfaces/persona.interface';
import { Organizacion } from '../interfaces/organizacion.interface';


@Injectable({
  providedIn: 'root'
})
export class AppOrganizacionService {

  listaOrganizacionDepartamentoURL = "http://localhost:3000/organizacionDepartamento";

  constructor(private _http: HttpClient) { }

  //Gestion de Organizacion de Departamento

  getOrgDepartamento(idDepartamento:string){
    let url = `${this.listaOrganizacionDepartamentoURL}/${idDepartamento}`;
    return this._http.get<Departamento[]>(url).pipe(map(res => res));
  }

  getAdministracion(idRol:string){
    let url = `${this.listaOrganizacionDepartamentoURL}/administracion/${idRol}`;
    return this._http.get<Persona[]>(url).pipe(map(res => res));
  }

  getEncargadoDepartamento(idDepartamento:string){
    let url = `${this.listaOrganizacionDepartamentoURL}/encargadosDepartamento/${idDepartamento}`;
    return this._http.get<Departamento[]>(url).pipe(map(res => res));
  }

  postOrganizacionDepartamento(departamento:Departamento):Observable<Departamento[]>{
    let body = JSON.stringify(departamento);
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this._http.post<Departamento[]>(this.listaOrganizacionDepartamentoURL, body, {headers}).pipe();
  }

  deleteOrganizacion(idOrganizacion){
    let url = `${this.listaOrganizacionDepartamentoURL}/${idOrganizacion}`;
    return this._http.delete(url).pipe(map(res => res));
  }

}
