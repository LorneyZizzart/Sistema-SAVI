import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { formatDate, DatePipe } from "@angular/common";
import { Convenio } from "../../interfaces/convenio.interface";
import { AppConvenioService } from "../../services/app-convenio.service";
import { AppTipoPersonaService } from "../../services/app-tipoPersona.service";
import { AppDepartamentoService } from "../../services/app-departamento.service";
import { Persona } from 'src/app/interfaces/persona.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';

@Component({
  selector: 'app-gestionar-convenio',
  templateUrl: './gestionar-convenio.component.html',
  styleUrls: ['./gestionar-convenio.component.css']
})
export class GestionarConvenioComponent implements OnInit {

  convenios:Convenio [];
  estudiantes: Persona [];
  departamentos:Departamento[];
  //alert message
  MessageSuccess = false;
  estado = false;
  idConvenio = "";
  idEstudiante = "";
  idDepartamento = "";
  idBeca = "";
  fechaInicio = "";
  fechaFinal = "";

  private convenio: Convenio = {
    idPersona: "",
    idDepartamento: "",
    idBeca: "",
    fechaInicio: "",
    fechaFinal: "",
    fotocopiaCarnet: "0",
    solicitudTrabajo: "0",
    estado: "1"
  }

  constructor( private _appConvenioService:AppConvenioService,
              private _appTipoPersonaService:AppTipoPersonaService,
    private _appDepartamentoService: AppDepartamentoService) {
   }

  ngOnInit() {
    this.getConvenios();
    setTimeout(() => {
      this.getEstudiantes();
    }, 4000);
  }

  ngOnChanges(): void {
    this.getConvenios();
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  ngOnDestroy(): void {
    this.getConvenios();
    this.getEstudiantes();
    this.getDepartamentos();
  }

  //resetear el FORMULARIO no estamos usando
  resetForm(formulario: NgForm) {
    formulario.reset({
    });
  }

  mensajeSuccess() {
    if (!this.MessageSuccess) {
      this.MessageSuccess = true;
      setTimeout(() => {
        this.MessageSuccess = false;
      }, 10000);
    }

  }

  //GESTIONAR CONVENIO

  getConvenios(){
    this._appConvenioService.getConvenios().subscribe((convenios: Convenio[]) => this.convenios = convenios);
    console.log(this.convenios);
  }

  saveConvenio(){
    this.convenio.idPersona = this.idEstudiante;
    this.convenio.idDepartamento = this.idDepartamento;
    this.convenio.idBeca = this.idBeca;
    console.log(this.convenio);
    this._appConvenioService.postConvenio(this.convenio)
      .subscribe((data: Convenio[]) => { console.log(data) });
  }

  editConvenio(){
    console.log(this.convenio);
    // this._appConvenioService.putConvenio(this.convenio, this.idConvenio)
    //   .subscribe((data: Convenio[]) => { console.log(data) });
  }

  //GESTIONAR TIPO PERSONA

  getEstudiantes(){
    this._appTipoPersonaService.getTipoPersona('5').subscribe((estudiantes: Persona[]) => this.estudiantes = estudiantes);
    console.log(this.estudiantes);
  }

  //GESTIONAR DEPARTAMENTO
  getDepartamentos(){
    this._appDepartamentoService.getDepartamentos().subscribe((departamento: Departamento[]) => this.departamentos = departamento);
    console.log(this.departamentos);
  }
}
