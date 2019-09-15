import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Departamento } from '../interfaces/departamento.interface';
import { HistorialDepartamento } from '../interfaces/historialDepartamento.interface';

@Injectable({
  providedIn: 'root'
})
export class AppDepartamentoService {

  listaDepartamentoURL = 'http://localhost:3000/departamento';
  listaHistorialDepartamentoURL = "http://localhost:3000/historialDepartamento";
 

  constructor(private _http: HttpClient) { }


  //gestion de Departamentos
  //Obtener un deppartamento con sus datos actuales y activos
  getDepartamento(idDepartamento:string){
    let url = `${this.listaDepartamentoURL}/${idDepartamento}`;
    return this._http.get<Departamento[]>(url).pipe(map(res => res));
  }

  getAllDepartamento(){
    let url = `${this.listaDepartamentoURL}/all/depts`;
    return this._http.get<Departamento[]>(url).pipe(map(res => res));
  }

  getDepartamentos(){
    return this._http.get<Departamento[]>(this.listaDepartamentoURL).pipe(map(res => res));
  }

  getDepartamentoName(nameDepartamento:string){
    let url = `${this.listaDepartamentoURL}/search/${nameDepartamento}`;
    return this._http.get<Departamento[]>(url).pipe(map(res => res));
  }

  getDepartamentosUser(idRol:string, idUsuario:string){
    let url = `${this.listaDepartamentoURL}/depsUser/${idRol}/${idUsuario}`;
    return this._http.get<Departamento>(url).pipe(map(res => res));
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

  putEstadoDepartamento(departamento:Departamento, key$:string):Observable<Departamento[]>{
    let body = JSON.stringify(departamento);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let url = `${this.listaDepartamentoURL}/editEstado/${key$}`;
    return this._http.put<Departamento[]>(url, body, {headers}).pipe();
  }

  deleteDepartamento(key$:string){
    let url = `${this.listaDepartamentoURL}/${key$}`;
    return this._http.delete(url).pipe(map(res => res));
  }

  //Gestion de HistorialDep
  //Obtenemos historial activo  de cada departamento
  getHistorialDepartamento(idDepartamento:string){
    let url = `${this.listaHistorialDepartamentoURL}/${idDepartamento}`;
    return this._http.get<Departamento[]>(url).pipe(map(res => res));
  }

  //Obtencion de todo el historial de un departamento [INFO DEPARTAMENTO]
  getHistorialesDepartamento(idDepartamento:string){
    let url = `${this.listaHistorialDepartamentoURL}/allHistorial/${idDepartamento}`;
    return this._http.get<Departamento[]>(url).pipe(map(res => res));
  }

  postHistorialDepartamento(historialDepartamento:HistorialDepartamento):Observable<HistorialDepartamento[]>{
    let body = JSON.stringify(historialDepartamento);
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this._http.post<HistorialDepartamento[]>(this.listaHistorialDepartamentoURL, body, {headers}).pipe();
  }
  
  putEstadoHistorialDepartamento(historialDepartamento:Departamento, idHistorialDepartamento:string):Observable<Departamento[]>{
    let body = JSON.stringify(historialDepartamento);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let url = `${this.listaHistorialDepartamentoURL}/editEstado/${idHistorialDepartamento}`;
    return this._http.put<Departamento[]>(url, body, {headers}).pipe();
  }

  putHistorialDepartamento(idHistorialDepartamento:string, historialDepartamento:Departamento):Observable<Departamento[]>{
    let body = JSON.stringify(historialDepartamento);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let url = `${this.listaHistorialDepartamentoURL}/${idHistorialDepartamento}`;
    return this._http.put<Departamento[]>(url, body, {headers}).pipe();
  }

  deleteHistorialDepartamento(idHistorialDepartamento){
    let url = `${this.listaHistorialDepartamentoURL}/${idHistorialDepartamento}`;
    return this._http.delete(url).pipe(map(res => res));
  }
}
