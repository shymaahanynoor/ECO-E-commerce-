import { TestBed } from '@angular/core/testing';

import { HandleNavBarService } from './handle-nav-bar.service';

describe('HandleNavBarService', () => {
  let service: HandleNavBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleNavBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
