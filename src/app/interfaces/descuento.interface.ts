import { User } from './user.interface';

export interface Descuento extends User {
  idDescuento?:string
  idAcreedor?:string
  fechaDescuento?:string
  saldoInicial?:string
  montoDescuento?:string
  editDescuento?:string
  observacion?:string
}
