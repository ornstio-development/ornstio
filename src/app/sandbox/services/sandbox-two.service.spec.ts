import { TestBed } from '@angular/core/testing';

import { SandboxTwoService } from './sandbox-two.service';

describe('SandboxTwoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SandboxTwoService = TestBed.get(SandboxTwoService);
    expect(service).toBeTruthy();
  });
});
