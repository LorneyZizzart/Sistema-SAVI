import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Carrera } from "../interfaces/carrera.interface"

@Injectable({
  providedIn: 'root'
})
export class AppCarreraService {

  uriCarrera = "http://localhost:3000/carrera";

  constructor(private _http: HttpClient) { }

  getListCarrera(){
    return this._http.get<Carrera[]>(this.uriCarrera).pipe(map(res => res));
  }

  getCarrera(idCarrera:number){
    let url = `${this.uriCarrera}/${idCarrera}`;
    return this._http.get<Carrera>(url).pipe(map(res => res));
  }

}
