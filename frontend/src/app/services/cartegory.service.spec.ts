import { TestBed } from '@angular/core/testing';

import { CartegoryService } from './cartegory.service';

describe('CartegoryService', () => {
  let service: CartegoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartegoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
