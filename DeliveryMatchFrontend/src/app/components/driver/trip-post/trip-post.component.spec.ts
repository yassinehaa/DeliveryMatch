import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPostComponent } from './trip-post.component';

describe('TripPostComponent', () => {
  let component: TripPostComponent;
  let fixture: ComponentFixture<TripPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
