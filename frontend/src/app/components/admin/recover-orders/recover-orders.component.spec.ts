import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverOrdersComponent } from './recover-orders.component';

describe('RecoverOrdersComponent', () => {
  let component: RecoverOrdersComponent;
  let fixture: ComponentFixture<RecoverOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
