import { TestBed } from '@angular/core/testing';

import { BitacoraService } from './bitacora.service';
import {HttpClientModule} from "@angular/common/http";
import {Bitacora} from "../model/bitacora";
import {concatMap} from "rxjs";

describe('ProblemaTecnicoService', () => {
  let service: BitacoraService;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(BitacoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBitacoras', (done: DoneFn) => {
    service.getBitacoras().subscribe((value) => {
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBeGreaterThan(0);
      done();
    });
  });

  it('registrarBitacora', (done: DoneFn) => {
    const nuevaBitacora: Bitacora = {
      idproblema: 0,
      descripcion: 'Testeo descripcion2',
      solucion: 'Testeo solucion2'
    };

    service.registrarBitacora(nuevaBitacora).subscribe((bitacoraCreada: Bitacora) => {
      expect(bitacoraCreada).toEqual(nuevaBitacora);
      done();
    }, (error) => {
      console.error('Error:', error);
      done.fail(error);
    });
  });

  it('editarBitacora y eliminarBitacora', (done: DoneFn) => {
    service.getBitacoras().subscribe((bitacoras: Bitacora[]) => {
      const ultimaBitacora = bitacoras[bitacoras.length - 1];
      const bitacoraParaEditar: Bitacora = {
        idproblema: ultimaBitacora.idproblema,
        descripcion: 'Testeo descripcion editada',
        solucion: 'Testeo solucion editada'
      };

      service.editarBitacora(bitacoraParaEditar).pipe(
        concatMap((bitacoraEditada: Bitacora) => {
          expect(bitacoraEditada).toEqual(bitacoraParaEditar);

          // Eliminar la bitácora
          return service.eliminarBitacora(bitacoraEditada);
        })
      ).subscribe((response) => {
        expect(response).toEqual(jasmine.anything()); // Verificar respuesta exitosa
        done();
      }, (error) => {
        console.error('Error:', error);
        done.fail(error);
      });
    }, (error) => {
      console.error('Error:', error);
      done.fail(error);
    });
  });
});
