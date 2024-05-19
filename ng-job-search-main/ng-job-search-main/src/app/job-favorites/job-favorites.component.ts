import { Component} from '@angular/core';
import { JobService } from '../job/job.service';
import { Job, DetailedJob } from '../job/job';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-favorites.component.html',
  styleUrl: './job-favorites.component.css'
})
export class JobFavoritesComponent {

  jobList: Job[] = [];
  detailedJoblist: DetailedJob[] = [];
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
    this.jobService.getDetailedJob().subscribe(
      (data: DetailedJob[]) => {
        this.detailedJoblist = data;
      },
      (error) => {
        console.log(error);
      }
    )
    this.jobService.favoriteJobs$.subscribe(
      (favoriteJobIDs: number[]) => {
        this.favoriteJobIDs = favoriteJobIDs;
      }
    );
   }

}
