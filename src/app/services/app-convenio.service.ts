import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Convenio } from "../interfaces/convenio.interface";
import { Observable } from "rxjs";
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AppConvenioService {

  convenio = {};

  listaUserURL: string = "http://localhost:3000/convenio";
  listaTipoPersonaURL: string = "http://localhost:3000/tipoPersona";

  constructor(private _http:HttpClient) { }

  getConvenios(): Observable<Convenio[]>{
    return this._http.get<Convenio[]>(this.listaUserURL).pipe(map(res => res));
  }

  getConvenio(key$: string): Observable<Convenio[]> {
    let url = `${this.listaUserURL}/${key$}`;
    return this._http.get<Convenio[]>(url);
  }

  getHistorialConvenio(idConvenio): Observable<User[]> {
    let url = `${this.listaTipoPersonaURL}/historialConvenio/${idConvenio}`;
    return this._http.get<User[]>(url);
  }

  postConvenio(convenio: Convenio): Observable<Convenio[]> {
    let body = JSON.stringify(convenio);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post<Convenio[]>(this.listaUserURL, body, { headers })
      .pipe();
  }

  putConvenio(convenio: Convenio, key$: string): Observable<Convenio[]> {
    let body = JSON.stringify(convenio);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaUserURL}/${key$}`;
    return this._http.put<Convenio[]>(url, body, { headers })
      .pipe();
  }

  putEstadoConvenio(convenio:Convenio, key$:string): Observable<Convenio[]> {
    let body = JSON.stringify(convenio);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaUserURL}/editEstado/${key$}`;
    return this._http.put<Convenio[]>(url, body, { headers })
      .pipe();
  }

  deleteConvenio(key$: string) {
    let url = `${this.listaUserURL}/${key$}`;
    return this._http.delete(url).pipe(map(res => res));
  }

}
