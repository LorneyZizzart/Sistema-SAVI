import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Departamento } from '../interfaces/departamento.interface';
import { Persona } from '../interfaces/persona.interface';


@Injectable({
  providedIn: 'root'
})
export class AppOrganizacionService {

  listaOrganizacionDepartamentoURL = "http://localhost:3000/organizacionDepartamento";

  constructor(private _http: HttpClient) { }

  //Gestion de Organizacion de Departamento

  getOrgDepartamentoSJ(){
    return this._http.get<Departamento[]>(this.listaOrganizacionDepartamentoURL).pipe(map(res => res));
  }

  getJefesDepartamento(){
    let url = this.listaOrganizacionDepartamentoURL + "/administracion";
    return this._http.get<Persona[]>(url).pipe(map(res => res));
  }

  postOrganizacionDepartamento(departamento:Departamento):Observable<Departamento[]>{
    let body = JSON.stringify(departamento);
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this._http.post<Departamento[]>(this.listaOrganizacionDepartamentoURL, body, {headers}).pipe();
  }
}
