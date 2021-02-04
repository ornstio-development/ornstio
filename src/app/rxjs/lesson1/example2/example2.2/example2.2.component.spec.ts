import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Example2.2Component } from './example2.2.component';

describe('Example2.2Component', () => {
  let component: Example2.2Component;
  let fixture: ComponentFixture<Example2.2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Example2.2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Example2.2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
