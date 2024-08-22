import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsidebarComponent } from './usidebar.component';

describe('UsidebarComponent', () => {
  let component: UsidebarComponent;
  let fixture: ComponentFixture<UsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
