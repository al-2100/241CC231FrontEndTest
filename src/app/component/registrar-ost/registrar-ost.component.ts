import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule} from "@angular/forms";
import {Vehiculo} from "../../model/vehiculo";
import {OstService} from "../../service/ost.service";
import {Cliente} from "../../model/cliente";
import Swal from "sweetalert2";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-registrar-ost',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './registrar-ost.component.html',
  styleUrl: './registrar-ost.component.css'
})
export class RegistrarOstComponent implements OnInit {
  cliente: Cliente = {
    id_cliente: 0,
    nombres: '',
    apellidos: '',
    dni: '',
    sexo: '',
    direccion: '',
    telefono: ''
  };
  vehiculo: Vehiculo = {
    idVehiculo: 0,
    placa: '',
    marca: '',
    modelo: '',
  }
  fallareportada: string = '';

  constructor(private ostService: OstService) { }

  ngOnInit(): void {
  }
  mostrarDatosVehiculo(): void {

  }

  buscarCliente(): void {
    this.ostService.buscarCliente(this.cliente.dni).subscribe(
      (result: Cliente) => {
        this.cliente = result;
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia!',
          text: 'No se encuentra el cliente.',
        });
      }
    );
  }

  registrarOST(): void {
    this.ostService.verificarVehiculo(this.vehiculo.placa).subscribe(
      (result: Vehiculo)   => {
        this.vehiculo = result;

        this.enviarDatosOST();
      },
      (err: any) => {
        // Si el vehículo no está registrado, lo registramos
        this.ostService.registrarVehiculo(this.vehiculo.placa, this.vehiculo.modelo, this.vehiculo.marca).subscribe(
          (result: any) => {
            // Usamos el ID del vehículo recién registrado
            console.log(result);
            this.vehiculo.idVehiculo = result.idVehiculo;
            console.log(this.vehiculo);
            this.enviarDatosOST();
          },
          (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al registrar vehículo',
              text: err.message,
            });
          }
        );
      }
    );
  }

  enviarDatosOST(): void {
    this.ostService.registrarOST(this.cliente, this.vehiculo, this.fallareportada).subscribe(
      (result: any) => {
        Swal.fire({
          icon: 'success',
          title: 'OST registrada con éxito',
        });
      },
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar OST',
          text: err.message,
        });
      }
    );
  }
}
