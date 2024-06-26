import { TestBed } from '@angular/core/testing';

import { ClienteService } from './cliente.service';
import {HttpClientModule} from "@angular/common/http";

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
    let cliente1: Cliente;
    const cliente: Cliente = {
      id_cliente: 91,
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
});
