import { TestBed } from '@angular/core/testing';

import { SandboxOneService } from './sandbox-one.service';

describe('SandboxOneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SandboxOneService = TestBed.get(SandboxOneService);
    expect(service).toBeTruthy();
  });
});
