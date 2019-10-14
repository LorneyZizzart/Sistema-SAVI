import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { InformeEstudiante } from '../interfaces/informe-estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class AppInformeEstudianteService {

  listaInformeEstudiante = "http://localhost:3000/informeEstudiante";

  constructor(private _http: HttpClient) { }

  getInformeEstudianteAll():Observable<InformeEstudiante[]>{
    return this._http.get<InformeEstudiante[]>(this.listaInformeEstudiante).pipe(map(res => res));
  }
  
  //para obtener los informes aprobadas con total horas y saldos de cada estudiante dependiente del departamento
  getInformeEstudiante(idDepartamento):Observable<InformeEstudiante[]>{
    let url = `${this.listaInformeEstudiante}/${idDepartamento}`;
    return this._http.get<InformeEstudiante[]>(url).pipe(map(res => res));
  }

  getInformeArchivado(idDepartamento:string):Observable<InformeEstudiante[]>{
    let url = `${this.listaInformeEstudiante}/archivar/${idDepartamento}`;
    return this._http.get<InformeEstudiante[]>(url).pipe(map(res => res));
  }

  getInformeEliminado(idDepartamento:string):Observable<InformeEstudiante[]>{
    let url = `${this.listaInformeEstudiante}/informesEliminados/${idDepartamento}`;
    return this._http.get<InformeEstudiante[]>(url).pipe(map(res => res));
  }

  getAcreedorHistorial(idConvenio):Observable<InformeEstudiante[]>{
    let url = `${this.listaInformeEstudiante}/acreedorHistorial/${idConvenio}`;
    return this._http.get<InformeEstudiante[]>(url).pipe(map(res => res));
  }

  postInformeEstudiante(informe:InformeEstudiante):Observable<InformeEstudiante[]>{
    let body = JSON.stringify(informe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post<InformeEstudiante[]>(this.listaInformeEstudiante, body, { headers })
      .pipe ();
  }

  putInformeEstudianteAprobarFinanzas(idInformeEstudiante:string, informe:InformeEstudiante):Observable<InformeEstudiante[]>{
    let body = JSON.stringify(informe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaInformeEstudiante}/aprobarFinanzas/${idInformeEstudiante}`;
    return this._http.put<InformeEstudiante[]>(url, body, { headers })
      .pipe ();
  }

  putInformeArchivar(idInformeEstudiante:string, informe:InformeEstudiante):Observable<InformeEstudiante[]>{
    let body = JSON.stringify(informe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaInformeEstudiante}/archivar/${idInformeEstudiante}`;
    return this._http.put<InformeEstudiante[]>(url, body, { headers })
      .pipe ();
  }

  bajaInformeEstudiante(idInformeEstudiante:string){
    let url = `${this.listaInformeEstudiante}/${idInformeEstudiante}`;
    return this._http.delete(url).pipe(map(res => res));
  }
  
  deleteInformeEstudiante(fecha:string, idRegistroHora:string){
    let url = `${this.listaInformeEstudiante}/${fecha}/${idRegistroHora}`;
    return this._http.delete(url).pipe(map(res => res));
  }
}
