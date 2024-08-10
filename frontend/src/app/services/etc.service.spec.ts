import { TestBed } from '@angular/core/testing';

import { EtcService } from './etc.service';

describe('EtcService', () => {
  let service: EtcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
