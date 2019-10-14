import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Area } from '../interfaces/area.interface';

@Injectable({
  providedIn: 'root'
})
export class AppAreaService {

  listaAreaDepartamento = "http://localhost:3000/area";

  constructor(private _http: HttpClient) { }

  getAreas(){
    return this._http.get<Area[]>(this.listaAreaDepartamento).pipe(map(res => res));
  }

  getArea(key$:string):Observable<Area[]>{
    let url = `${this.listaAreaDepartamento}/${key$}`;
    return this._http.get<Area[]>(url).pipe(map(res => res));
  }

  getAreasDepartamento(key$:string):Observable<Area[]>{
    let url = `${this.listaAreaDepartamento}/dept/${key$}`;
    return this._http.get<Area[]>(url).pipe(map(res => res));
  }

  postArea(area:Area):Observable<Area[]>{
    let body = JSON.stringify(area);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post<Area[]>(this.listaAreaDepartamento, body, { headers })
      .pipe ();
  }

  putArea(area:Area, key$:string):Observable<Area[]>{
    let body = JSON.stringify(area);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaAreaDepartamento}/${key$}`;
    return this._http.put<Area[]>(url, body, { headers })
      .pipe ();
  }

  putEstado(area:Area, key$:Area):Observable<Area[]>{
    let body = JSON.stringify(area);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaAreaDepartamento}/estado/${key$}`;
    return this._http.put<Area[]>(url, body, { headers })
      .pipe ();
  }

  deleteArea(key$:String){
    let url = `${this.listaAreaDepartamento}/${key$}`;
    return this._http.delete(url).pipe(map(res => res));
  }
//gestion asignacion area
  getAsignacionArea(idArea:string){
    let url = `${this.listaAreaDepartamento}/asignacionArea/crud/${idArea}`;
    return this._http.get<Area[]>(url).pipe(map(res => res));
  }  

  getAsignacionByConvenio(idConvenio:string){
    let url = `${this.listaAreaDepartamento}/asignacionArea/byConvenio/${idConvenio}`;
    return this._http.get<Area[]>(url).pipe(map(res => res));
  }  


  postAsignarArea(area:Area):Observable<Area[]>{
    let body = JSON.stringify(area);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaAreaDepartamento}/asignacionArea/crud`;
    return this._http.post<Area[]>(url, body, { headers })
      .pipe ();
  }

  putAsignacionArea(idAsignacion:string, area:Area):Observable<Area[]>{
    let body = JSON.stringify(area);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaAreaDepartamento}/asignacionArea/crud/${idAsignacion}`;
    return this._http.put<Area[]>(url, body, { headers })
      .pipe ();
  }
  putCambiarArea(idAsignacion:string, area:Area):Observable<Area[]>{
    let body = JSON.stringify(area);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.listaAreaDepartamento}/cambiarArea/${idAsignacion}`;
    return this._http.put<Area[]>(url, body, { headers })
      .pipe ();
  }

  deleteAsignacionArea(idAsignacion){
    let url = `${this.listaAreaDepartamento}/asignacionArea/crud/${idAsignacion}`;
    return this._http.delete(url).pipe(map(res => res));
  }
}
