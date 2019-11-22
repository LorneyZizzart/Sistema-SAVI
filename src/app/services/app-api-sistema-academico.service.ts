import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Notas } from '../interfaces/notas.interface';
import { Persona } from '../interfaces/persona.interface';



@Injectable({
  providedIn: 'root'
})
export class AppApiSistemaAcademicoService {

  uriSistemaAcademico = "http://localhost:3000/apiSistemaAcademico";

  constructor(private _http: HttpClient) { }

  getEstudiantesSA(cantidad:number){
    let url = `${this.uriSistemaAcademico}/estudiantes/${cantidad}`;
    return this._http.get<Persona[]>(url).pipe(map(res => res));
  }

  getEstudianteSA(codEstudiante:number){
    let url = `${this.uriSistemaAcademico}/estudiante/${codEstudiante}`;
    return this._http.get<Persona[]>(url).pipe(map(res => res));
  }
  // gestionar notas
  getNotasSA(idEstudiante:string){
    let url = `${this.uriSistemaAcademico}/notas/${idEstudiante}`;
    return this._http.get<Notas[]>(url).pipe(map(res => res));
  }

  getHorarioSA(idEstudiante:string){
    let url = `${this.uriSistemaAcademico}/horario/${idEstudiante}`;
    return this._http.get<any[]>(url).pipe(map(res => res));
  }

}

