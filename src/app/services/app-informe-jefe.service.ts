import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { InformeJefe } from '../interfaces/informe-jefe.interface';

@Injectable({
  providedIn: 'root'
})
export class AppInformeJefeService {

  listaInformeJefe = "http://localhost:3000/informeJefe";

  constructor(private _http: HttpClient) { }

  getMaxIdInformeJefe(idUser:string, idDepartamento:string):Observable<InformeJefe[]>{
    let url = `${this.listaInformeJefe}/id/${idUser}/${idDepartamento}`;
    return this._http.get<InformeJefe[]>(url).pipe(map(res => res));
  }

  postInformeJefe(informe:InformeJefe):Observable<InformeJefe[]>{
    let body = JSON.stringify(informe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post<InformeJefe[]>(this.listaInformeJefe, body, { headers })
      .pipe ();
  }

}
