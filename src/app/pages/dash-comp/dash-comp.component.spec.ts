import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCompComponent } from './dash-comp.component';

describe('DashCompComponent', () => {
  let component: DashCompComponent;
  let fixture: ComponentFixture<DashCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
