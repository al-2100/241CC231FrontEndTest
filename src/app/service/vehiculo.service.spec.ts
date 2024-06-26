import { TestBed } from '@angular/core/testing';

import { VehiculoService } from './vehiculo.service';
import {HttpClientModule} from "@angular/common/http";

describe('VehiculoService', () => {
  let service: VehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]});
    service = TestBed.inject(VehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
