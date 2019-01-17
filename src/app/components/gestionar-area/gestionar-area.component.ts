import { Component, OnInit } from '@angular/core';
import { AppAreaService } from '../../services/app-area.service';
import { Area } from '../../interfaces/area.interface';


@Component({
  selector: 'app-gestionar-area',
  templateUrl: './gestionar-area.component.html',
  styleUrls: ['./gestionar-area.component.css']
})
export class GestionarAreaComponent implements OnInit {

  //GestionarArea
  listaAreaDepartamento:Area[];

  constructor( private _appAreaService : AppAreaService) {
    
   }

  ngOnInit() {
    this.getAreaDepartamento("1");
  }

  ngOnDestroy(): void {
    this.getAreaDepartamento("1");
  }

  getAreaDepartamento(idDepto:string){
    this._appAreaService.getAreasDepartamento(idDepto)
    .subscribe((areas : Area[]) => {this.listaAreaDepartamento = areas});
  }
 
}
