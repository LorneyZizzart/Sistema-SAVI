import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

//Service
import { AppAcreedorService } from "./services/app-acreedor.service";
import { AppAreaService } from './services/app-area.service';
import { AppBecaService } from "./services/app-beca.service";
import { AppConvenioService } from "./services/app-convenio.service";
import { AppDepartamentoService } from "./services/app-departamento.service";
import { AppDescuentoService } from './services/app-descuento.service';
import { AppInformeEstudianteService } from "./services/app-informe-estudiante.service";
import { AppInformeFinanzasService } from "./services/app-informe-finanzas.service";
import { AppInformeJefeService } from "./services/app-informe-jefe.service";
import { AppOrganizacionService } from "./services/app-organizacion.service";
import { AppRegistroHoraService } from "./services/app-registroHora.service";
import { AppRolService } from "./services/app-rol.service";
import { AppTurnoService } from "./services/app-turno.service";
import { AppUserService } from "./services/app-user.service";
import { AppTipoPersonaService } from './services/app-tipoPersona.service';
import { AppCarreraService } from './services/app-carrera.service';


//Pipe
import { KeysPipe } from './pipes/keys.pipe';
import { RolUserPipe } from './pipes/rol-user.pipe';
import { BoleanpPipe } from './pipes/boolean.pipe';
import { EstadoPipe } from './pipes/estado.pipe';
import { MesPipe } from './pipes/mes.pipe';
import { HoraPipe } from './pipes/hora.pipe';
import { MinutoPipe } from './pipes/minuto.pipe';
import { UndefineHoraPipe } from './pipes/undefine-hora.pipe';
import { UndefineSaldoPipe } from './pipes/undefine-saldo.pipe';
import { UndefinedDatoPipe } from './pipes/undefined-dato.pipe';
import { NameDayPipe } from './pipes/name-day.pipe';

//Routing
import { AppRoutingModule } from './app-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { NavbarJFComponent } from './components/navbar-jf/navbar-jf.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { GestionarUsuarioComponent } from './components/gestionar-usuario/gestionar-usuario.component';
import { GestionarDepartamentoComponent } from './components/gestionar-departamento/gestionar-departamento.component';
import { GestionarHistorialDepartamentoComponent } from './components/gestionar-historial-departamento/gestionar-historial-departamento.component';
import { GestionarOrganizacionComponent } from './components/gestionar-organizacion/gestionar-organizacion.component';
import { GestionarAreaComponent } from './components/gestionar-area/gestionar-area.component';
import { GestionarInformeJefeComponent } from './components/gestionar-informe-jefe/gestionar-informe-jefe.component';
import { GestionarAsignacionAreaComponent } from './components/gestionar-asignacion-area/gestionar-asignacion-area.component';
import { GestionarInformeEstudianteComponent } from './components/gestionar-informe-estudiante/gestionar-informe-estudiante.component';
import { GestionarInformeFinanzasComponent } from './components/gestionar-informe-finanzas/gestionar-informe-finanzas.component';
import { GestionarConvenioComponent } from './components/gestionar-convenio/gestionar-convenio.component';
import { RegistroHoraComponent } from './components/registro-hora/registro-hora.component';
import { GestionarTurnoComponent } from './components/gestionar-turno/gestionar-turno.component';
import { GestionarBecaComponent } from './components/gestionar-beca/gestionar-beca.component';
import { GestionarAcreedorComponent } from './components/gestionar-acreedor/gestionar-acreedor.component';
import { GestionarDescuentoComponent } from './components/gestionar-descuento/gestionar-descuento.component';
import { GestionarRolComponent } from './components/gestionar-rol/gestionar-rol.component';
import { GestionarInformeWeekComponent } from './components/gestionar-informe-week/gestionar-informe-week.component';
import { GestionarInformeAyerComponent } from './components/gestionar-informe-ayer/gestionar-informe-ayer.component';
import { GestionarInformeHoyComponent } from './components/gestionar-informe-hoy/gestionar-informe-hoy.component';
import { GestionarInformeMonthComponent } from './components/gestionar-informe-month/gestionar-informe-month.component';
import { GestionarInformeJefeArhivadoComponent } from './components/gestionar-informe-jefe-arhivado/gestionar-informe-jefe-arhivado.component';
import { GestionarInformeFinanzasAprobadoComponent } from './components/gestionar-informe-finanzas-aprobado/gestionar-informe-finanzas-aprobado.component';
import { GestionarInformeFinanzasArchivadoComponent } from './components/gestionar-informe-finanzas-archivado/gestionar-informe-finanzas-archivado.component';
import { GestionarInfoDepartamentoComponent } from './components/gestionar-info-departamento/gestionar-info-departamento.component';

//auth
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { GestionarAcreedorHistorialComponent } from './components/gestionar-acreedor-historial/gestionar-acreedor-historial.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { GestionarInformeJefeEliminadoComponent } from './components/gestionar-informe-jefe-eliminado/gestionar-informe-jefe-eliminado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    GestionarUsuarioComponent,
    KeysPipe,
    GestionarDepartamentoComponent,
    GestionarHistorialDepartamentoComponent,
    GestionarOrganizacionComponent,
    GestionarAreaComponent,
    GestionarInformeJefeComponent,
    GestionarAsignacionAreaComponent,
    GestionarInformeEstudianteComponent,
    GestionarInformeFinanzasComponent,
    GestionarConvenioComponent,
    RegistroHoraComponent,
    GestionarTurnoComponent,
    GestionarBecaComponent,
    GestionarAcreedorComponent,
    GestionarDescuentoComponent,
    GestionarRolComponent,
    RolUserPipe,
    EstadoPipe,
    BoleanpPipe,
    MesPipe,
    NavbarJFComponent,
    GestionarInformeHoyComponent,
    HoraPipe,
    MinutoPipe,
    GestionarInformeAyerComponent,
    UndefineHoraPipe,
    UndefineSaldoPipe,
    UndefinedDatoPipe,
    GestionarInformeWeekComponent,
    NameDayPipe,
    GestionarInformeMonthComponent,
    GestionarInformeJefeArhivadoComponent,
    GestionarInformeFinanzasAprobadoComponent,
    GestionarInformeFinanzasArchivadoComponent,
    LoginComponent,
    GestionarAcreedorHistorialComponent,
    FechaPipe,
    GestionarInfoDepartamentoComponent,
    GestionarInformeJefeEliminadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AppUserService,
    AppAcreedorService,
    AppAreaService,
    AppBecaService,
    AppConvenioService,
    AppDepartamentoService,
    AppDescuentoService,
    AppInformeEstudianteService,
    AppInformeFinanzasService,
    AppInformeJefeService,
    AppOrganizacionService,
    AppRegistroHoraService,
    AppRolService,
    AppTurnoService,
    AppTipoPersonaService,
    AppCarreraService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
