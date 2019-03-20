import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { InformeFinanzas } from '../interfaces/informe-finanzas.interface';

@Injectable({
  providedIn: 'root'
})
export class AppInformeFinanzasService {

  listaInformeFinanzas = "http://localhost:3000/informeFinanzas";

  constructor(private _http: HttpClient) { }

  getInformesFinanzas(){
    return this._http.get<InformeFinanzas[]>(this.listaInformeFinanzas).pipe(map(res => res));
  }

  getInformesFinanzasArchivadas(){
    let url = `${this.listaInformeFinanzas}/informes/archivados`;
    return this._http.get<InformeFinanzas[]>(url).pipe(map(res => res));
  }

  postInformeFinanzas(informe:InformeFinanzas):Observable<InformeFinanzas[]>{
    let body = JSON.stringify(informe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post<InformeFinanzas[]>(this.listaInformeFinanzas, body, { headers })
      .pipe ();
  }

  putInformeFinanzas(idInformeFinanzas:string, informe:InformeFinanzas):Observable<InformeFinanzas[]>{
    let body = JSON.stringify(informe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaInformeFinanzas}/${idInformeFinanzas}`;
    return this._http.put<InformeFinanzas[]>(url, body, { headers })
      .pipe ();
  }      

  putInformeFinanzasArchivar(idInformeFinanzas:string, informe:InformeFinanzas):Observable<InformeFinanzas[]>{
    let body = JSON.stringify(informe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaInformeFinanzas}/informes/archivados/${idInformeFinanzas}`;
    return this._http.put<InformeFinanzas[]>(url, body, { headers })
      .pipe ();
  }

  deleteInformeFinanzas(idInformeEstudiante:string){
    let url = `${this.listaInformeFinanzas}/${idInformeEstudiante}`;
    return this._http.delete(url).pipe(map(res => res));
  }
}
