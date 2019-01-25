import { Component, OnInit } from '@angular/core';
import { RegistroHora } from '../../interfaces/registroHora.interface';
import { AppRegistroHoraService } from '../../services/app-registroHora.service';


@Component({
  selector: 'app-gestionar-informe-ayer',
  templateUrl: './gestionar-informe-ayer.component.html',
  styleUrls: ['./gestionar-informe-ayer.component.css']
})
export class GestionarInformeAyerComponent implements OnInit {

  //Variable global para almacenar el id del departamento
  IdDepartamento:string = "1"
  fechaHoy:any;
  nombreDepartamento:string;
  //Registro de ayer
  informesRegistrosAyer:RegistroHora[];

  constructor( private _appRegistroHoraService:AppRegistroHoraService) {
    this.getInformeRegistroYesterday(this.IdDepartamento);

   }

  ngOnInit() {
    this.fechaHoy = new Date();
  }

  getInformeRegistroYesterday(idDepartamento:string){
    this._appRegistroHoraService.getInformeRegisterYesterday(idDepartamento)
    .subscribe((registro : RegistroHora[]) => this.informesRegistrosAyer = registro);

    console.log("lista:", this.informesRegistrosAyer);
  }

}
