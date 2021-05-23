import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrazacPage } from './obrazac.page';

describe('ObrazacPage', () => {
  let component: ObrazacPage;
  let fixture: ComponentFixture<ObrazacPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObrazacPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrazacPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
