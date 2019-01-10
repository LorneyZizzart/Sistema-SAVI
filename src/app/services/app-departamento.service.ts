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

  //Gestion de HistorialDep
  //Obtenemos todos los departamentos
  getHistorialDepartamento(){
    return this._http.get<Departamento[]>(this.listaHistorialDepartamentoURL).pipe(map(res => res));
  }
}
