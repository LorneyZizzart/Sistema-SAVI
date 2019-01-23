import { Component, OnInit } from '@angular/core';
import { AppRegistroHoraService } from '../../services/app-registroHora.service';
import { RegistroHora } from '../../interfaces/registroHora.interface';

@Component({
  selector: 'app-gestionar-informe-hoy',
  templateUrl: './gestionar-informe-hoy.component.html',
  styleUrls: ['./gestionar-informe-hoy.component.css']
})
export class GestionarInformeHoyComponent implements OnInit {

  //FOOTER
  numStudent:number = 0;
  numHour:number = 0;
  numMoney:number = 0;
  auxHora:number  = 0;
  informesRegistrosNow:RegistroHora[];

  constructor(private _appRegistroHoraService:AppRegistroHoraService ) { }

  ngOnInit() {
    this.getInformeRegisterNow('Limpieza');
  }

  getInformeRegisterNow(nameDepto:string){
    this._appRegistroHoraService.getInformeRegisterNow(nameDepto)
    .subscribe((registro : RegistroHora[]) => {this.informesRegistrosNow = registro})
  }

  totalDatos(){
    
    for(let registro of this.informesRegistrosNow){
      this.numStudent++;
      if(registro.horaSalida != null){
        // this.auxHora = Int(registro.horaEntrada) - registro.horaSalida;
        this.numHour = this.auxHora + this.auxHora;
      }
    }
  }

}
