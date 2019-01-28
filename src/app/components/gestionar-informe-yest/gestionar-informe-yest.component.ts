import { Component, OnInit } from '@angular/core';
import { RegistroHora } from '../../interfaces/registroHora.interface';
import { AppRegistroHoraService } from '../../services/app-registroHora.service';



@Component({
  selector: 'app-gestionar-informe-yest',
  templateUrl: './gestionar-informe-yest.component.html',
  styleUrls: ['./gestionar-informe-yest.component.css']
})
export class GestionarInformeYestComponent implements OnInit {

  //Variable global para almacenar el id del departamento
  IdDepartamento:string = "1";
  //Registro de ayer
  informesRegistrosAyer:RegistroHora[];

  constructor( private _appRegistroHoraService:AppRegistroHoraService) { }

  ngOnInit() {
    this.getInformeRegistroYesterday(this.IdDepartamento);
  }

  getInformeRegistroYesterday(idDepartamento:string){
    this._appRegistroHoraService.getInformeRegisterYest(idDepartamento)
    .subscribe((registro : RegistroHora[]) => {
      setTimeout(() => {
        this.informesRegistrosAyer = registro;
    console.log("lista:", this.informesRegistrosAyer);

      }, 8000);
       console.log("recibido: ",registro)
    });
  }
}
