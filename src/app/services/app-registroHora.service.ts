import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { RegistroHora } from '../interfaces/registroHora.interface';

@Injectable({
  providedIn: 'root'
})
export class AppRegistroHoraService {

  listaRegistroHora = "http://localhost:3000/registrohora";

  constructor(private _http: HttpClient) { }

  getInformeRegisterNow(nameDepartamento:string):Observable<RegistroHora[]>{
    let url = `${this.listaRegistroHora}/dateNow/${nameDepartamento}`;
    return this._http.get<RegistroHora[]>(url).pipe(map(res => res));
  }

  getInformeRegisterYesterday(nameDepartamento:string):Observable<RegistroHora[]>{
    let url = `${this.listaRegistroHora}/dateYesterday/${nameDepartamento}`;
    return this._http.get<RegistroHora[]>(url).pipe(map(res => res));
  }

  postRegistroHora(registro:RegistroHora):Observable<RegistroHora[]>{
    let body = JSON.stringify(registro);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post<RegistroHora[]>(this.listaRegistroHora, body, { headers })
      .pipe ();
  }

  deleteRegistroHora(key$:RegistroHora){
    let url = `${this.listaRegistroHora}/${key$}`;
    return this._http.delete(url).pipe(map(res => res));
  }
}
