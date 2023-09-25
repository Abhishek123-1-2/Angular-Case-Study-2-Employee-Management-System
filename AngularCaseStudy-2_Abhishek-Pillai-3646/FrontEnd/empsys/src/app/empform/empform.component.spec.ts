import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpformComponent } from './empform.component';

describe('EmpformComponent', () => {
  let component: EmpformComponent;
  let fixture: ComponentFixture<EmpformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpformComponent]
    });
    fixture = TestBed.createComponent(EmpformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
