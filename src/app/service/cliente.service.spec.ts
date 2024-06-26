import { TestBed } from '@angular/core/testing';

import { ClienteService } from './cliente.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Cliente } from '../model/cliente';

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]});
    service = TestBed.inject(ClienteService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('getCliente', (done : DoneFn) => {
    service.getClientes().subscribe((value) => {
      expect(value).toBeInstanceOf(Array);
      done();
    });
  });

  it('RegistrarCliente', (done: DoneFn) => {
    const cliente: Cliente = {
      id_cliente: 0,
      dni: '7854632',
      nombres: 'name_test',
      apellidos: 'lastname_test',
      direccion: 'Av. test',
      sexo:'Masculino',
      telefono:'123459876',

    };

    service.registrarCliente(cliente).subscribe((value) =>{
      expect(value).toEqual(cliente);
      done();
    });

  });

  it('eliminarCliente', (done: DoneFn) => {
    service.getClientes().subscribe((clientes) => {
      const ultimoCliente = clientes[clientes.length - 1];
      service.eliminarCliente(ultimoCliente).subscribe(() => {
        service.getClientes().subscribe((clientesActualizados) => {
          const clienteEliminado = clientesActualizados.find(c => c.id_cliente === ultimoCliente.id_cliente);
          expect(clienteEliminado).toBeFalsy();
          done();
        });
      });
    });
  });

});
