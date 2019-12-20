import { Acreedor } from './acreedor.interface';

export interface Descuento extends Acreedor {
  idDescuento?:string
  fechaDescuento?:string
  saldoInicialDescuento?:string
  montoDescuento?:string
  editDescuento?:string
  observacionDescuento?:string
  estadoDescuento?:string
}
