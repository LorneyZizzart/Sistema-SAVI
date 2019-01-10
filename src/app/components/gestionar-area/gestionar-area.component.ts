import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestionar-area',
  templateUrl: './gestionar-area.component.html',
  styleUrls: ['./gestionar-area.component.css']
})
export class GestionarAreaComponent implements OnInit {

  MessageSuccess:Boolean = false;

  constructor() { }

  ngOnInit() {
  }
  //ALERT SUCCESS
  mensajeSuccess() {
    if (!this.MessageSuccess) {
      this.MessageSuccess = true;
      setTimeout(() => {
        this.MessageSuccess = false;
      }, 10000);
    }
  }


}
