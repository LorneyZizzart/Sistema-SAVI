import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Departamento } from '../interfaces/departamento.interface';

@Injectable({
  providedIn: 'root'
})
export class AppDepartamentoService {

  listaDepartamentoURL = 'http://localhost:3000/departamento';
  listaHistorialDepartamentoURL = "http://localhost:3000/historialDepartamento";
 

  constructor(private _http: HttpClient) { }

  //gestion de Departamentos

  getDepartamentos(){
    return this._http.get<Departamento[]>(this.listaDepartamentoURL).pipe(map(res => res));
  }

  postDepartamento(departamento:Departamento):Observable<Departamento[]>{
    let body = JSON.stringify(departamento);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post<Departamento[]>(this.listaDepartamentoURL, body, {headers}).pipe();
  }

  putDepartamento(departamento:Departamento, key$:string):Observable<Departamento[]>{
    let body = JSON.stringify(departamento);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let url = `${this.listaDepartamentoURL}/${key$}`;
    return this._http.put<Departamento[]>(url, body, {headers}).pipe();
  }

  deleteDepartamento(key$:string){
    let url = `${this.listaDepartamentoURL}/${key$}`;
    return this._http.delete(url).pipe(map(res => res));
  }

  //Gestion de HistorialDep
  //Obtenemos todos los departamentos
  getHistorialDepartamento(){
    //Lo utilizaremos para obtener el ultimo idDept
    return this._http.get<Departamento[]>(this.listaHistorialDepartamentoURL).pipe(map(res => res));
  }

  postHistorialDepartamento(departamento:Departamento):Observable<Departamento[]>{
    let body = JSON.stringify(departamento);
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this._http.post<Departamento[]>(this.listaDepartamentoURL, body, {headers}).pipe();
  }
}
