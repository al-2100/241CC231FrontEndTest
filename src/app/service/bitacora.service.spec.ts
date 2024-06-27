import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BitacoraService } from './bitacora.service';
import {Bitacora} from "../model/bitacora";
import {concatMap} from "rxjs";

describe('ProblemaTecnicoService', () => {
  let service: BitacoraService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(BitacoraService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBitacoras', (done: DoneFn) => {
    const mockBitacoras = [{ idproblema: 1, descripcion: 'Test', solucion: 'Test' }];

    service.getBitacoras().subscribe((value) => {
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBeGreaterThan(0);
      done();
    });

    const req = httpMock.expectOne(service.BASE_URL + '/listar');
    expect(req.request.method).toBe('GET');
    req.flush(mockBitacoras); // Provide mock response
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

    const req = httpMock.expectOne(service.BASE_URL + '/insert');
    expect(req.request.method).toBe('POST');
    req.flush(nuevaBitacora); // Proporciona datos ficticios como respuesta
  });

  it('editarBitacora y eliminarBitacora', (done: DoneFn) => {
    const bitacorasMock: Bitacora[] = [{
      idproblema: 1,
      descripcion: 'Testeo descripcion',
      solucion: 'Testeo solucion'
    }];

    const bitacoraParaEditar: Bitacora = {
      idproblema: bitacorasMock[0].idproblema,
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
      expect(response).toEqual(jasmine.anything());
      done();
    }, (error) => {
      console.error('Error:', error);
      done.fail(error);
    });

    const reqUpdate = httpMock.expectOne(service.BASE_URL + '/update');
    expect(reqUpdate.request.method).toBe('POST');
    reqUpdate.flush(bitacoraParaEditar);

    const reqDelete = httpMock.expectOne(service.BASE_URL + '/delete');
    expect(reqDelete.request.method).toBe('DELETE');
    reqDelete.flush({});
  });
});

