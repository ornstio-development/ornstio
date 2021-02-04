import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Example2.1Component } from './example2.1.component';

describe('Example2.1Component', () => {
  let component: Example2.1Component;
  let fixture: ComponentFixture<Example2.1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Example2.1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Example2.1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
