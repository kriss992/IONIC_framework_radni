import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostavkePage } from './postavke.page';

describe('PostavkePage', () => {
  let component: PostavkePage;
  let fixture: ComponentFixture<PostavkePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostavkePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostavkePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
