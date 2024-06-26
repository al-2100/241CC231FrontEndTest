import {Component, OnInit} from '@angular/core';
import {BitacoraService} from "../../service/bitacora.service";
import {Bitacora} from "../../model/bitacora";
import {NgForOf, NgIf} from "@angular/common";
import Swal from "sweetalert2";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.css'
})

export class BitacoraComponent implements OnInit {
  bitacora : Bitacora[] = [];
  bitacoraSeleccionada: Bitacora | null = null;
  bitacoraForm: FormGroup;
  showForm: boolean = false; // Nueva variable para controlar la visualización del formulario
  bitacoraArray: Bitacora[] = [];

  constructor(private bitacoraService: BitacoraService) {
    this.bitacora = [];
    this.bitacoraForm = new FormGroup({
      descripcion: new FormControl('', []),
      solucion: new FormControl('', [])
    });
  }

  ngOnInit(): void {
    this.getBitacoras();
  }


  editarBitacora(bitacora: Bitacora): void {
    this.bitacoraSeleccionada = bitacora;
    this.showForm = true; // Mostrar el formulario cuando se hace clic en el botón de editar
    this.bitacoraForm.setValue({
      descripcion: bitacora.descripcion,
      solucion: bitacora.solucion
    });
  }

  eliminarBitacora(bitacora: Bitacora): void {
    this.bitacoraService.eliminarBitacora(bitacora).subscribe(
      (result: any) => {
        this.getBitacoras();
        Swal.fire({
          icon: 'success',
          title: 'Eliminar Bitácora!',
          text: 'Se eliminó exitosamente la bitácora.',
        });
      },
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Advertencia!',
          text: 'Error al eliminar bitácora.',
        });
      }
    );
  }

  registrarBitacora(): void {
    if (this.bitacoraSeleccionada) {
      // Actualizar la bitácora seleccionada
      const bitacoraActualizada = {
        ...this.bitacoraSeleccionada,
        descripcion: this.bitacoraForm.value.descripcion,
        solucion: this.bitacoraForm.value.solucion
      };
      this.bitacoraService.editarBitacora(bitacoraActualizada).subscribe(
        (result: any) => {
          this.getBitacoras();
          Swal.fire({
            icon: 'success',
            title: 'Actualizar Bitácora!',
            text: 'Se actualizó exitosamente la bitácora.',
          });
          this.showForm = false; // Ocultar el formulario después de completar la edición
          this.bitacoraSeleccionada = null;
        },
        (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Advertencia!',
            text: 'Error al actualizar bitácora.',
          });
        }
      );
    } else {
      // Crear una nueva bitácora
      this.bitacoraService.registrarBitacora(this.bitacoraForm.value).subscribe(
        (result: any) => {
          this.getBitacoras();
          Swal.fire({
            icon: 'success',
            title: 'Registrar Bitácora!',
            text: 'Se registró exitosamente la bitácora.',
          });
          this.showForm = false; // Ocultar el formulario después de registrar una nueva bitácora
        },
        (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Advertencia!',
            text: 'Error al registrar bitácora.',
          });
        }
      );
    }
  }

  getBitacoras(): void {
    this.bitacoraService.getBitacoras().subscribe(
      (result: any) => {
        this.bitacora = result;
        this.bitacoraArray = [...this.bitacora]; // BitacoraArray se actualiza cuando los datos se cargan
        this.filterBitacora(); // Filtra los datos después de cargarlos
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  filterBitacora(): void {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    const value = searchInput.value.toLowerCase();
    if (value) {
      this.bitacoraArray = this.bitacora.filter(bitacora =>
        bitacora.descripcion.toLowerCase().includes(value)
      );
    } else {
      this.bitacoraArray = [...this.bitacora]; // BitacoraArray se actualiza cuando el valor de búsqueda está vacío
    }
  }

  onSearch(event: Event): void {
    this.filterBitacora(); // Llama a filterBitacora en lugar de filtrar directamente en onSearch
  }
  protected readonly HTMLInputElement = HTMLInputElement;
}
