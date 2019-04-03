import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Acreedor } from "../interfaces/acreedor.interface"

@Injectable({
  providedIn: 'root'
})
export class AppAcreedorService {

  uriAcreedor = "http://localhost:3000/acreedor";

  constructor(private _http: HttpClient) { }

  getListAcredor(){
    let url = `${this.uriAcreedor}/lista/`;
    return this._http.get<Acreedor[]>(url).pipe(map(res => res));
  }

  getAcreedor(){
    return this._http.get<Acreedor[]>(this.uriAcreedor).pipe(map(res => res));
  }

  postAcreedor(acreedor:Acreedor):Observable<Acreedor[]>{
    let body = JSON.stringify(acreedor);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post<Acreedor[]>(this.uriAcreedor, body, { headers })
      .pipe ();
  }

  putAcreedor(acreedor:Acreedor):Observable<Acreedor[]>{
    let body = JSON.stringify(acreedor);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.uriAcreedor}/descuentos/`;
    return this._http.put<Acreedor[]>(url, body, { headers })
      .pipe ();
  }

  putSaldoAcreedor(idConvenio:string, acreedor:Acreedor):Observable<Acreedor[]>{
    let body = JSON.stringify(acreedor);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.uriAcreedor}/${idConvenio}`;
    return this._http.put<Acreedor[]>(url, body, { headers })
      .pipe ();
  }

  putDevolverSaldo(idConvenio:string, acreedor:Acreedor):Observable<Acreedor[]>{
    let body = JSON.stringify(acreedor);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.uriAcreedor}/acreditacion/${idConvenio}`;
    return this._http.put<Acreedor[]>(url, body, { headers })
      .pipe ();
  }

  deleteAcreedor(idInformeFinanzas:string){
    let url = `${this.uriAcreedor}/${idInformeFinanzas}`;
    return this._http.delete(url).pipe(map(res => res));
  }
}
