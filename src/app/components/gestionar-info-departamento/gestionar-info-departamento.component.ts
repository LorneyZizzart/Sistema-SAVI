import { Component, OnInit } from '@angular/core';
import { Departamento } from "../../interfaces/departamento.interface";
import { AppDepartamentoService } from '../../services/app-departamento.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-gestionar-info-departamento',
  templateUrl: './gestionar-info-departamento.component.html',
  styleUrls: ['./gestionar-info-departamento.component.css']
})
export class GestionarInfoDepartamentoComponent implements OnInit {

  historialDepartamento:Departamento[];
  departamento:Departamento;

  constructor(private _appDepartamentoService: AppDepartamentoService,
              private _appAuthService : AuthService) {

   }

  ngOnInit() {
    this.departamento = this._appAuthService.getDatosDepartamento();
    this.getHistorialesDepartamento(this.departamento[0].idDepartamento);

  }

  getHistorialesDepartamento(idDepartamento:string){
    this._appDepartamentoService.getHistorialesDepartamento(idDepartamento).subscribe((historial:Departamento[]) => {
      this.historialDepartamento = historial;
    })
  }

}
