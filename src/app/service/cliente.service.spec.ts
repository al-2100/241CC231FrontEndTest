import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteService } from './cliente.service';
import { Cliente } from '../model/cliente';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService]
    });

    service = TestBed.inject(ClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCliente', () => {
    const mockClientes: Cliente[] = [{
      id_cliente: 1,
      dni: '7854632',
      nombres: 'name_test',
      apellidos: 'lastname_test',
      direccion: 'Av. test',
      sexo:'Masculino',
      telefono:'123459876',
    }];

    service.getClientes().subscribe(clientes => {
      expect(clientes.length).toBe(1);
      expect(clientes).toEqual(mockClientes);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/listar`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClientes); // Proporciona datos ficticios como respuesta
  });

  it('registrarCliente', () => {
    const mockForm = {
      dni: '7854632',
      nombres: 'name_test',
      apellidos: 'lastname_test',
      direccion: 'Av. test',
      sexo:'Masculino',
      telefono:'123459876',
    };

    service.registrarCliente(mockForm).subscribe(response => {
      expect(response).toEqual(jasmine.anything());
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/insert`);
    expect(req.request.method).toBe('POST');
    req.flush({}); // Proporciona datos ficticios como respuesta
  });

  it('eliminarCliente', () => {
    const mockCliente: Cliente = {
      id_cliente: 1,
      dni: '7854632',
      nombres: 'name_test',
      apellidos: 'lastname_test',
      direccion: 'Av. test',
      sexo:'Masculino',
      telefono:'123459876',
    };

    service.eliminarCliente(mockCliente).subscribe(response => {
      expect(response).toEqual(jasmine.anything());
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/delete`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}); // Proporciona datos ficticios como respuesta
  });

  it('actualizarCliente', () => {
    const mockForm = {
      id_cliente: 1,
      dni: '7854632',
      nombres: 'name_test_updated',
      apellidos: 'lastname_test_updated',
      direccion: 'Av. test updated',
      sexo:'Masculino',
      telefono:'123459876',
    };

    service.actualizarCliente(mockForm).subscribe(response => {
      expect(response).toEqual(jasmine.anything());
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/update`);
    expect(req.request.method).toBe('POST');
    req.flush({}); // Proporciona datos ficticios como respuesta
  });
});
