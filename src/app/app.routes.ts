// @ts-ignore

import { Routes } from '@angular/router';
import { PrincipalComponent } from './component/principal/principal.component';
import {RegistrarClienteComponent} from "./component/registrar-cliente/registrar-cliente.component";
import {RegistrarOstComponent} from "./component/registrar-ost/registrar-ost.component";
import {BitacoraComponent} from "./component/bitacora/bitacora.component";

export const routes: Routes = [
  {path: '', redirectTo: '/principal', pathMatch: 'full'},
  {path: 'principal', component: PrincipalComponent},
  {path: 'registrar-cliente', component:RegistrarClienteComponent},
  {path: 'registrar-ost', component:RegistrarOstComponent},
  {path: 'bitacora', component:BitacoraComponent}
];
