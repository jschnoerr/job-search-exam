import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailedComponent } from './job-detailed.component';

describe('JobDetailedComponent', () => {
  let component: JobDetailedComponent;
  let fixture: ComponentFixture<JobDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDetailedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
