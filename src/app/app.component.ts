import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RegistrarClienteComponent} from "./component/registrar-cliente/registrar-cliente.component";
import {RegistrarOstComponent} from "./component/registrar-ost/registrar-ost.component";
import {NavbarComponent} from "./component/navbar/navbar.component";
import {PrincipalComponent} from "./component/principal/principal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrarClienteComponent, RegistrarOstComponent, NavbarComponent, PrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd-Automotriz';
}
