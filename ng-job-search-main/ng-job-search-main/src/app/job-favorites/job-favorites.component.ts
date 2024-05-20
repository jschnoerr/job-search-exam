import { Component} from '@angular/core';
import { JobService } from '../job/job.service';
import { Job, DetailedJob } from '../job/job';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  constructor(private jobService: JobService) {
    this.jobService.getJob().subscribe(
      (data: Job[]) => {
        this.jobList = data;
        this.jobList.map((job) => {
        })
      },
      (error) => {
        console.log(error);
      }
    );
    this.jobService.favoriteJobs$.subscribe(
      (favoriteJobIDs: number[]) => {
        this.favoriteJobIDs = favoriteJobIDs;
      }
    );
   }

}
