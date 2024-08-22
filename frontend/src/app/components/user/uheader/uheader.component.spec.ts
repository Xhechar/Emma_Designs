import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UheaderComponent } from './uheader.component';

describe('UheaderComponent', () => {
  let component: UheaderComponent;
  let fixture: ComponentFixture<UheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
