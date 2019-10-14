import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { GestionarUsuarioComponent } from './components/gestionar-usuario/gestionar-usuario.component';
import { GestionarAcreedorComponent } from './components/gestionar-acreedor/gestionar-acreedor.component';
import { GestionarAreaComponent } from './components/gestionar-area/gestionar-area.component';
import { GestionarBecaComponent } from './components/gestionar-beca/gestionar-beca.component';
import { GestionarConvenioComponent } from './components/gestionar-convenio/gestionar-convenio.component';
import { GestionarDepartamentoComponent } from './components/gestionar-departamento/gestionar-departamento.component';
import { GestionarDescuentoComponent } from './components/gestionar-descuento/gestionar-descuento.component';
import { GestionarInformeEstudianteComponent } from './components/gestionar-informe-estudiante/gestionar-informe-estudiante.component';
import { GestionarInformeFinanzasComponent } from './components/gestionar-informe-finanzas/gestionar-informe-finanzas.component';
import { GestionarInformeFinanzasAprobadoComponent } from './components/gestionar-informe-finanzas-aprobado/gestionar-informe-finanzas-aprobado.component';
import { GestionarInformeFinanzasArchivadoComponent } from './components/gestionar-informe-finanzas-archivado/gestionar-informe-finanzas-archivado.component';
import { GestionarInformeJefeComponent } from './components/gestionar-informe-jefe/gestionar-informe-jefe.component';
import { GestionarInformeJefeArhivadoComponent } from './components/gestionar-informe-jefe-arhivado/gestionar-informe-jefe-arhivado.component';
import { GestionarOrganizacionComponent } from './components/gestionar-organizacion/gestionar-organizacion.component';
import { GestionarRolComponent } from './components/gestionar-rol/gestionar-rol.component';
import { GestionarTurnoComponent } from './components/gestionar-turno/gestionar-turno.component';
import { GestionarInformeHoyComponent } from './components/gestionar-informe-hoy/gestionar-informe-hoy.component';
import { GestionarInformeAyerComponent } from "./components/gestionar-informe-ayer/gestionar-informe-ayer.component";
import { GestionarInformeWeekComponent } from './components/gestionar-informe-week/gestionar-informe-week.component';
import { GestionarInformeMonthComponent } from './components/gestionar-informe-month/gestionar-informe-month.component';
import { GestionarAcreedorHistorialComponent } from './components/gestionar-acreedor-historial/gestionar-acreedor-historial.component';
import { GestionarInfoDepartamentoComponent } from './components/gestionar-info-departamento/gestionar-info-departamento.component';
import { GestionarInformeJefeEliminadoComponent } from './components/gestionar-informe-jefe-eliminado/gestionar-informe-jefe-eliminado.component';



import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'acreedorHistorial/:idConvenio', component: GestionarAcreedorHistorialComponent, canActivate: [AuthGuard] },
  { path: 'acreedor', component: GestionarAcreedorComponent, canActivate: [AuthGuard] },
  { path: 'area', component: GestionarAreaComponent, canActivate: [AuthGuard] },
  //este path aun falta
  { path: 'beca', component: GestionarBecaComponent, canActivate: [AuthGuard] },
  { path: 'convenio', component: GestionarConvenioComponent, canActivate: [AuthGuard] },
  { path: 'departamento', component: GestionarDepartamentoComponent, canActivate: [AuthGuard] },
  { path: 'infoDepartamento', component: GestionarInfoDepartamentoComponent, canActivate: [AuthGuard] },
  { path: 'descuento', component: GestionarDescuentoComponent, canActivate: [AuthGuard] },
  { path: 'informeEstudiante', component: GestionarInformeEstudianteComponent, canActivate: [AuthGuard] },
  { path: 'informeFinanzas', component: GestionarInformeFinanzasComponent, canActivate: [AuthGuard] },
  { path: 'informeFinanzasAprobado', component: GestionarInformeFinanzasAprobadoComponent, canActivate: [AuthGuard] },
  { path: 'informeFinanzasArchivado', component: GestionarInformeFinanzasArchivadoComponent, canActivate: [AuthGuard] },
  { path: 'informeJefe', component: GestionarInformeJefeComponent, canActivate: [AuthGuard] },
  { path: 'informeJefeArchivado', component: GestionarInformeJefeArhivadoComponent, canActivate: [AuthGuard] },
  { path: 'informeJefeEliminado', component: GestionarInformeJefeEliminadoComponent, canActivate: [AuthGuard] },
  { path: 'organizacion', component: GestionarOrganizacionComponent, canActivate: [AuthGuard] },
  { path: 'informeHoy', component: GestionarInformeHoyComponent, canActivate: [AuthGuard] },
  { path: 'informeAyer', component: GestionarInformeAyerComponent, canActivate: [AuthGuard] },
  { path: 'informeWeek', component: GestionarInformeWeekComponent, canActivate: [AuthGuard] },
  { path: 'informeMonth', component: GestionarInformeMonthComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: GestionarUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'registroHora', component: GestionarUsuarioComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },

  //Falta este modulo registroHora
  { path: 'rol', component: GestionarRolComponent },
  { path: 'turno', component: GestionarTurnoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
