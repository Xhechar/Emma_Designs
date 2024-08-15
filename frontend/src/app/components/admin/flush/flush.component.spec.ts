import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlushComponent } from './flush.component';

describe('FlushComponent', () => {
  let component: FlushComponent;
  let fixture: ComponentFixture<FlushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlushComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
