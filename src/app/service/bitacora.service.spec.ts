import { TestBed } from '@angular/core/testing';

import { BitacoraService } from './bitacora.service';
import {HttpClientModule} from "@angular/common/http";

describe('ProblemaTecnicoService', () => {
  let service: BitacoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(BitacoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
