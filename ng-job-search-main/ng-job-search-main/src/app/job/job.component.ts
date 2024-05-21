import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { Job } from './job';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {

  jobList: Job[] = [];
  favoriteJobIDs: number[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
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

  isFavorite(id: number): boolean {
    return this.favoriteJobIDs.includes(id);
  }

  toggleFavoriteJob(id: number): void {
    if (this.isFavorite(id)) {
      this.jobService.removeFavoriteJobID(id);
    } else {
      this.jobService.addFavoriteJobID(id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
