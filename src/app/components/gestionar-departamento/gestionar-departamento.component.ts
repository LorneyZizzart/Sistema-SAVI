import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppDepartamentoService } from '../../services/app-departamento.service';
import { Departamento } from "../../interfaces/departamento.interface";

@Component({
  selector: 'app-gestionar-departamento',
  templateUrl: './gestionar-departamento.component.html',
  styleUrls: ['./gestionar-departamento.component.css']
})
export class GestionarDepartamentoComponent implements OnInit {

  departamentos:Departamento[];
  historialDepartamento:Departamento[];
  MessageSuccess:Boolean = false;

  departamento:Departamento = {
    nombreDepartamento:"",
    costoHora:"",
    limiteEstudiante:"",
  }

  constructor( private _appDepartamentoService: AppDepartamentoService) {
    this.getDepartamentos();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {

  }

  //ALERT SUCCESS
  mensajeSuccess() {
    if (!this.MessageSuccess) {
      this.getDepartamentos();
      this.MessageSuccess = true;
      setTimeout(() => {
        this.MessageSuccess = false;
      }, 10000);
    }
  }
  //GEATION DEPARTAMENTOS
  getDepartamentos(){
    this._appDepartamentoService.getDepartamentos().subscribe((departamentos:Departamento[]) => {this.departamentos = departamentos});
    console.log(this.departamentos);

  }

  saveDepartamento(){
    console.log(this.departamento);
  }

  editDepartamento(){
    console.log(this.departamento);
  }
  saveOrganizacion(){}

  //GESTION HISTORIAL DEPARTAMENTOS
  // getHistorialDepartamentos(){
  //   this._appDepartamentoService.getHistorialDepartamento().subscribe((departamentos: Departamento[]) => { this.historialDepartamento = departamentos });
  // }

}
