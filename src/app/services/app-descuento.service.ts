import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Descuento } from '../interfaces/descuento.interface';

@Injectable({
  providedIn: 'root'
})
export class AppDescuentoService {

  uriDescuento = "http://localhost:3000/descuento";

  constructor(private _http: HttpClient) { }

  getDescuentos(){
    return this._http.get<Descuento[]>(this.uriDescuento).pipe(map(res => res));
  }

  postDescuentos(descuento:Descuento):Observable<Descuento[]>{
    let body = JSON.stringify(descuento);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post<Descuento[]>(this.uriDescuento, body, { headers })
      .pipe ();
  }

  putDescuento(descuento:Descuento, idDescuento:string):Observable<Descuento[]>{
    let body = JSON.stringify(descuento);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.uriDescuento}/${idDescuento}`;
    return this._http.put<Descuento[]>(url, body, { headers })
      .pipe ();
  }
}
