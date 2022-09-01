import { TestBed } from '@angular/core/testing';

import { AzureAuthSharedService } from './azure-auth-shared.service';

describe('AzureAuthSharedService', () => {
  let service: AzureAuthSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureAuthSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
