import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaPage } from './registracija.page';

describe('RegistracijaPage', () => {
  let component: RegistracijaPage;
  let fixture: ComponentFixture<RegistracijaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistracijaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistracijaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
