import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFavoritesComponent } from './job-favorites.component';

describe('JobFavoritesComponent', () => {
  let component: JobFavoritesComponent;
  let fixture: ComponentFixture<JobFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobFavoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
