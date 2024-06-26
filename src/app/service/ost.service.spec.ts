import { TestBed } from '@angular/core/testing';

import { OstService } from './ost.service';
import {HttpClientModule} from "@angular/common/http";

describe('OstService', () => {
  let service: OstService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]});
    service = TestBed.inject(OstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
