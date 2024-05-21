import { Component } from '@angular/core';
import { JobService } from '../shared/job.service';
import { Job } from '../job/job.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-favorites.component.html',
  styleUrl: './job-favorites.component.css'
})
export class JobFavoritesComponent {

  jobList: Job[] = [];
  favoriteJobIDs: number[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(private jobService: JobService) {
    const jobListSub = this.jobService.getJoblist().subscribe(
      (data: Job[]) => {
        this.jobList = data;
      }
    );
    const favoriteJobsSub = this.jobService.favoriteJobs$.subscribe(
      (favoriteJobIDs: number[]) => {
        this.favoriteJobIDs = favoriteJobIDs;
      }
    );
    this.subscriptions.add(jobListSub);
    this.subscriptions.add(favoriteJobsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
