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
  uriHospital = "http://hospitals.fixturebol.com/public/api";

  constructor(private _http: HttpClient) { }

  getListaHospitales(){
    let url = `${this.uriHospital}/hospitales`;
    return this._http.get<any[]>(url).pipe(map(res => res));
  }

  getInformeRegisterNow(idDepartamento:string):Observable<RegistroHora[]>{
    let url = `${this.listaRegistroHora}/dateNow/${idDepartamento}`;
    return this._http.get<RegistroHora[]>(url).pipe(map(res => res));
  }

  getInformeRegisterYest(idDepartamento:string):Observable<RegistroHora[]>{
    let url = `${this.listaRegistroHora}/dateYest/informe/${idDepartamento}`;
    return this._http.get<RegistroHora[]>(url).pipe(map(res => res));
  }

  getInformeRegisterWeek(idDepartamento:string):Observable<RegistroHora[]>{
    let url = `${this.listaRegistroHora}/dateWeek/informe/${idDepartamento}`;
    return this._http.get<RegistroHora[]>(url).pipe(map(res => res));
  }
  getInformeRegisterMonth(idDepartamento:string):Observable<RegistroHora[]>{
    let url = `${this.listaRegistroHora}/dateMonth/informe/${idDepartamento}`;
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

  putRegistroSalida(idRegistro:string, registro:RegistroHora):Observable<RegistroHora[]>{
    let body = JSON.stringify(registro);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaRegistroHora}/${idRegistro}`;
    return this._http.put<RegistroHora[]>(url, body, { headers })
      .pipe ();
  }

  putRegsitroAprovacion(idRegistro:string, registro:RegistroHora):Observable<RegistroHora[]>{
    let body = JSON.stringify(registro);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaRegistroHora}/aprovado/${idRegistro}`;
    return this._http.put<RegistroHora[]>(url, body, { headers })
      .pipe ();
  }

  putRegsitroAprobarFinanzas(idRegistro:string, registro:RegistroHora):Observable<RegistroHora[]>{
    let body = JSON.stringify(registro);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaRegistroHora}/aprobarFinanzas/${idRegistro}`;
    return this._http.put<RegistroHora[]>(url, body, { headers })
      .pipe ();
  }

  deleteRegistroHora(idRegistro:string, registro:RegistroHora):Observable<RegistroHora[]>{
    let body = JSON.stringify(registro);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaRegistroHora}/delete/${idRegistro}`;
    return this._http.put<RegistroHora[]>(url, body, { headers })
      .pipe ();
  }
}
