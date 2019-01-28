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
  newinformesRegistrosAyer:RegistroHora[];

  constructor( private _appRegistroHoraService:AppRegistroHoraService) {


   }

  ngOnInit() {
    this.getInformeRegistroYesterday(this.IdDepartamento);
    this.fechaHoy = new Date();
  }

  getInformeRegistroYesterday(idDepartamento:string){
    this._appRegistroHoraService.getInformeRegisterYest(idDepartamento)
    .subscribe((registro : RegistroHora[]) => {
        this.informesRegistrosAyer = registro;

       console.log("recibido: ",this.informesRegistrosAyer)
    });
    setTimeout(() => {
    this.newinformesRegistrosAyer =  this.informesRegistrosAyer;
    console.log("Lista: ",this.newinformesRegistrosAyer);
    }, 2000);
  }

}
