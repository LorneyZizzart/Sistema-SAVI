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
  MessageEnable:Boolean = false;
  MessageDesable:Boolean = false;

  departamento:Departamento = {
    nombreDepartamento:"",
    costoHora:"",
    limiteEstudiante:"",
  }

  editarDepartamento:Departamento = {
    nombreDepartamento:"",
    fechaRegistro:"",
    estadoDepartamento:""
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

  messageEnableDesable(value:string){
    if (value == 'inactivo') {
      this.MessageEnable = true;
      setTimeout(() => {
        this.MessageEnable = false;
      }, 8000);
    }else if (value == 'activo') {
      this.MessageDesable = true;
      setTimeout(() => {
        this.MessageDesable = false;
      }, 8000);
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

  editDepartamento(idDepartamento, nombre, fechaRegistro, estado){
    this.editarDepartamento.nombreDepartamento = nombre;
    this.editarDepartamento.fechaRegistro = fechaRegistro;
    this.editarDepartamento.estadoDepartamento = estado;
    console.log(this.editarDepartamento);
    this._appDepartamentoService.putDepartamento(this.editarDepartamento, idDepartamento)
      .subscribe((data : Departamento[]) => {console.log(data)});

      setTimeout(() => {
        this.getDepartamentos();
      }, 2000);
  }

  deleteDepartameto(){
    
  }

  saveOrganizacion(){}

  //GESTION HISTORIAL DEPARTAMENTOS
  // getHistorialDepartamentos(){
  //   this._appDepartamentoService.getHistorialDepartamento().subscribe((departamentos: Departamento[]) => { this.historialDepartamento = departamentos });
  // }

}
