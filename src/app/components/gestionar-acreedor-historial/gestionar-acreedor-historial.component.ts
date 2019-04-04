import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { AppConvenioService } from '../../services/app-convenio.service';
import { Convenio } from 'src/app/interfaces/convenio.interface';

@Component({
  selector: 'app-gestionar-acreedor-historial',
  templateUrl: './gestionar-acreedor-historial.component.html',
  styleUrls: ['./gestionar-acreedor-historial.component.css']
})
export class GestionarAcreedorHistorialComponent implements OnInit {

  idConvenio:string;
  convenio:User[] = [];

  constructor( private _activatedRoute:ActivatedRoute,
               private _router:Router,
               private _appConvenioService:AppConvenioService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.idConvenio = params['idConvenio'];
      this.getHistorialConvenio(this.idConvenio);
    });
  }

  irHome(){
    this._router.navigate(['/home']);  
  }

  getHistorialConvenio(idConvenio){
    this._appConvenioService.getHistorialConvenio(idConvenio)
    .subscribe((data:User[]) => {this.convenio = data});
    setTimeout(() => {
      console.log(this.convenio);
    }, 2000);
  }



}
