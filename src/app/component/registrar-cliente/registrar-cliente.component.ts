import { Component } from '@angular/core';
import {Cliente} from "../../model/cliente";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ClienteService} from "../../service/cliente.service";
import Swal from 'sweetalert2';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css'
})
export class RegistrarClienteComponent {
  clienteArray: Cliente[] = [];
  clienteForm: FormGroup;
  clienteSeleccionado: Cliente | null = null;

  constructor(private clienteService: ClienteService) {
    this.clienteForm = new FormGroup({
      nombres: new FormControl('', []),
      apellidos: new FormControl('', []),
      dni: new FormControl('', []),
      sexo: new FormControl('', []),
      direccion: new FormControl('', []),
      telefono: new FormControl('', [])
    });
  }
  ngOnInit(): void {
    this.clienteForm.reset();
    this.getClientes();

  }
  getClientes(): void {
    this.clienteService.getClientes().subscribe(
      (result: any) => {
        console.log(result);
        this.clienteArray = result;
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia!',
          text: 'Error al cargar datos de clientes.',
        });
      }
    );
  }

  eliminarCliente(cliente: Cliente): void {
    this.clienteService.eliminarCliente(cliente).subscribe(
      (result: any) => {
        this.ngOnInit();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Eliminar Cliente!',
          text: 'Se elimino exitosamente los datos del cliente.',
        });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia!',
          text: 'Error al eliminar cliente.',
        });
      }
    );
  }

  editarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.clienteForm.setValue({
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      dni: cliente.dni,
      sexo: cliente.sexo,
      direccion: cliente.direccion,
      telefono: cliente.telefono
    });
  }

  registrarCliente(): void {
    if (this.clienteSeleccionado) {
      // Actualizar el cliente seleccionado
      const clienteActualizado = { ...this.clienteSeleccionado, ...this.clienteForm.value };
      this.clienteService.actualizarCliente(clienteActualizado).subscribe(
        (result: any) => {
          this.ngOnInit();
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Actualizar Cliente!',
            text: 'Se actualizó exitosamente los datos del cliente.',
          });
          this.clienteForm.reset();
          this.clienteSeleccionado = null;
        },
        (err: any) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Advertencia!',
            text: 'Error al actualizar cliente.',
          });
        }
      );
    } else {
      // Crear un nuevo cliente
      this.clienteService.registrarCliente(this.clienteForm.value).subscribe(
        (result: any) => {
          this.ngOnInit();
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Registrar Cliente!',
            text: 'Se registró exitosamente los datos del cliente.',
          });
        },
        (err: any) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Advertencia!',
            text: 'Error al registrar cliente.',
          });
        }
      );
    }
  }
}


