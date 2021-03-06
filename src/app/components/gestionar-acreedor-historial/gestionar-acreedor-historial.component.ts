import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { AppConvenioService } from '../../services/app-convenio.service';
import { Convenio } from 'src/app/interfaces/convenio.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';
import { InformeEstudiante } from '../../interfaces/informe-estudiante.interface';
import { AppAreaService } from '../../services/app-area.service';
import { Area } from 'src/app/interfaces/area.interface';
import { AppCarreraService } from '../../services/app-carrera.service';
import { Carrera } from '../../interfaces/carrera.interface';
import { AppDescuentoService } from '../../services/app-descuento.service';
import { Descuento } from '../../interfaces/descuento.interface';
import { AppAcreedorService } from "../../services/app-acreedor.service";
import { Acreedor } from '../../interfaces/acreedor.interface';


@Component({
  selector: 'app-gestionar-acreedor-historial',
  templateUrl: './gestionar-acreedor-historial.component.html',
  styleUrls: ['./gestionar-acreedor-historial.component.css']
})
export class GestionarAcreedorHistorialComponent implements OnInit {

  idConvenio:string;
  convenio:Convenio[] = [];
  convenioData:Convenio = {};
  nombreCompleto:string;
  areas:any[] = [];
  informeEstudiante:InformeEstudiante[] = [];
  informeEstudianteArray:InformeEstudiante[] = [];
  mesArray:any[] = [];
  month:string;
  meses:any = {
    enero : false,
    febrero : false,
    marzo : false,
    abril : false,
    mayo : false,
    junio : false,
    julio : false,
    agosto : false,
    septiembre : false,
    octubre : false,
    noviembre : false,
    diciembre : false
  };
  saldoDiario:string = "00.00";
  saldoDescuento:string = "00.00";
  totalSaldo:string = "00.00";
  descuentos:Descuento[] = [];
  constructor( private _activatedRoute:ActivatedRoute,
               private _router:Router,
               private _appConvenioService:AppConvenioService,
               private _appInformeEstudianteService:AppInformeEstudianteService,
               private _appAreaService:AppAreaService,
               private _appCarreraService : AppCarreraService,
               private _appDescuentoService : AppDescuentoService,
               private _appAcreedorService : AppAcreedorService
               ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.idConvenio = params['idConvenio'];
      this.getConvenio(this.idConvenio);
      this.getAcreedorHistorial(this.idConvenio);
      this.getDescuentos(this.idConvenio);
      this.getTotalSaldoAcreedor(this.idConvenio);
    });
  }

  //resetear el FORMULARIO no estamos usando
  resetForm(formulario: NgForm) {
    formulario.reset({
    });
  }

  getConvenio(idConvenio){
    this.areas = [];
    this._appConvenioService.getConvenio(idConvenio).subscribe((convenio : Convenio[])=>{

      for(let data of convenio){
        if(data.idConvenio == idConvenio){
          if (data.segundoNombre == null && data.segundoApellido != null ) {
            this.nombreCompleto = data.primerApellido + " " + data.segundoApellido+ " " + data.primerNombre ;
          } else if (data.segundoNombre == null && data.segundoApellido == null){
            this.nombreCompleto = data.primerApellido + " " + data.primerNombre; 
          }else if (data.segundoNombre != null && data.segundoApellido == null){ 
            this.nombreCompleto = data.primerApellido + " " + data.primerNombre + " " + data.segundoNombre;
          }else{
            this.nombreCompleto = data.primerApellido + " " + data.segundoApellido + " " + data.primerNombre + " " + data.segundoNombre;
          }
          this._appCarreraService.getCarrera(Number(data.idCarrera)).subscribe((carrera:Carrera)=>{
            if(carrera)
            this.convenioData.carrera = carrera[0].nombreCarrera;
          })
          this.convenioData.codEstudiante = data.codEstudiante;
          this.convenioData.nacionalidad = data.nacionalidad;
          this.convenioData.direccion = data.direccion;
          this.convenioData.celular = data.celular;
          this.convenioData.ci = data.ci;
          this.convenioData.fechaNacimiento = data.fechaNacimiento;
          this.convenioData.estadoPersona = data.estadoPersona;
          this.convenioData.semestre = data.semestre;
          this.convenioData.departamento = data.departamento;
          this.convenioData.beca = data.beca;
          this.convenioData.estadoConvenio = data.estadoConvenio;
          this.convenioData.fechaInicio = data.fechaInicio;
          this.convenioData.fechaFinal = data.fechaFinal;
          this.convenioData.fotocopiaCarnet = data.fotocopiaCarnet;
          this.convenioData.solicitudTrabajo = data.solicitudTrabajo;
          this._appAreaService.getAsignacionByConvenio(idConvenio)
                .subscribe((data: Area[]) => {
                  if(data.length > 0){
                    for(let a of data){
                      this.areas.push(a.nombreArea);
                    }
                  }
                });
        }

      }
    })
  }

  irHome(){
    this._router.navigate(['/home']);  
  }

  convertDate(value, opcion){
    let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo" ];
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let date = new Date(value);

    switch (opcion) {
      case 1:
        var fechaNum = date.getDate()+1;
        var mes_name = date.getMonth()+1;  
        if(fechaNum >= 32){
          fechaNum = 1;
        }  
        value =  (dias[date.getDay()]).toLowerCase() + ", " + fechaNum + " de " + meses[mes_name] + " de " + date.getFullYear();
        break;
      case 2:
        var fechaNum = date.getDate();
        var mes_name = date.getMonth();  
        if(fechaNum >= 32){
          fechaNum = 1;
        }
        value = (dias[date.getDay()]).toLowerCase() + ", " + fechaNum + " de " + meses[mes_name] + " de " + date.getFullYear();
        break;
      case 3:
        value =  date;
        break;
      case 4:
        let fecha = new Date(date.getTime() + (24*60*60*1000)*1)
        value =  fecha;
        break;  
      case 5:
        value =  date.getMonth()+1;
        break;
      case 6:
        value =  date.getFullYear();
        break; 
      default:
        break;
    }
    return value;

  }
  fechaLiteral(value){
    let date = new Date(value);
    let day = date.getDate()+1;
    let month = date.getMonth()+1;
    if(day < 10 && month < 10) return '0'+day+"/"+'0'+month+"/"+date.getFullYear();
    if(day < 10 && month >= 10) return '0'+day+"/"+month+"/"+date.getFullYear();
    if(day >= 10 && month < 10) return day+"/"+'0'+month+"/"+date.getFullYear();
    if(month >= 10 && month >= 10) return day+"/"+month+"/"+date.getFullYear();
  }

  ordenarFecha(date){
    let fecha = date.split('/');
    return fecha[1]+"/"+fecha[0]+"/"+fecha[2];
  }

  

  getAcreedorHistorial(idConvenio){
    this._appInformeEstudianteService.getAcreedorHistorial(idConvenio)
    .subscribe((data : InformeEstudiante[]) => {
      this.informeEstudiante = data;
      this.informeEstudianteArray = data;
      this.calcularSaldoDiario(data);
    });
  }

  calcularSaldoDiario(data:InformeEstudiante[]){
    var saldo = 0;
    for(let informe of data){
      saldo =  parseFloat(informe.totalSaldo) + saldo;
    }
    this.saldoDiario = saldo.toFixed(2);
  }
  //buscar x dia -> falta probar con 1 de enero y 31 de diciembre
  getFecha(date){
    if(date.length==10){
      date = this.ordenarFecha(date);
      let array:InformeEstudiante[] = [];
      this.informeEstudiante = this.informeEstudianteArray;
      for(let informe of this.informeEstudiante){
        if(this.fechaLiteral(informe.fecha).indexOf(date) >= 0)
          array.push(informe)
      }
      this.informeEstudiante = array;
    }else{
      this.informeEstudiante = this.informeEstudianteArray;
    }
  }

  //buscar x rango de fechas
  getFechaRange(data){
    if(data.length >=23){
      let fecha1=data.substr(0, 10), fecha2=data.substr(13, 10);
      fecha1 = this.convertDate(fecha1, 3);
      fecha2 = this.convertDate(fecha2, 4);
      let array:InformeEstudiante[] = [];
      this.informeEstudiante = this.informeEstudianteArray;
      for(let informe of this.informeEstudiante){
        if(this.convertDate(informe.fecha, 4) >= fecha1 && this.convertDate(informe.fecha, 4) <= fecha2){
          array.push(informe)          
        } 
      }
      this.informeEstudiante = array;
    }else{this.informeEstudiante = this.informeEstudianteArray;}
  
  }

  getMonth(mes, opcion){
    opcion = !opcion;
    let array:InformeEstudiante[] = [];
    this.informeEstudiante = this.informeEstudianteArray;
    if(opcion){
      this.mesArray.push(mes)
      for(let informe of this.informeEstudiante){
        for (let i = 0; i < this.mesArray.length; i++) {
          if(this.mesArray[i] == this.convertDate(informe.fecha, 5)){
            array.push(informe)  
          }        
        }
      }
    }else{
      var index = this.mesArray.indexOf(mes)
      this.mesArray.splice(index, 1)
      for(let informe of this.informeEstudiante){
        for (let i = 0; i < this.mesArray.length; i++) {
          if(this.mesArray[i] == this.convertDate(informe.fecha, 5)){
            array.push(informe)  
          }        
        }
      }
    }       
    this.informeEstudiante = array;
  }

  getGestion(data){
    let array:InformeEstudiante[] = [];
    this.informeEstudiante = this.informeEstudianteArray;
    for(let informe of this.informeEstudiante){
      if(this.convertDate(informe.fecha, 6) == data){
        array.push(informe)  
      }
    }
    this.informeEstudiante = array;
  }
  
  getDescuentos(idConvenio){
    this._appDescuentoService.getDescuentoByConvenio(idConvenio).subscribe((data:Descuento[])=>{
      this.descuentos = data;
      var saldo = 0;
      for(let informe of data){
        saldo =  saldo + parseFloat(informe.saldoInicialDescuento);
      }
      this.saldoDescuento = saldo.toFixed(2);
    })
  }

  getTotalSaldoAcreedor(idConvenio){
    this._appAcreedorService.getAcreedorByIdConvenio(idConvenio).subscribe((data:Acreedor[])=>{
      if(data.length>0){
        var saldo = 0;
        for(let informe of data){
          saldo =  saldo + parseFloat(informe.montoBs);
        }
        this.totalSaldo =  saldo.toFixed(2);
      }
    })
  }
  

}
