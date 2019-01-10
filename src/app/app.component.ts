import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularPrueba7';
  page = 1;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {
  }

  paginacion(value:string):string{
    return value;
  }

}
