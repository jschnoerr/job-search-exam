import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { DetailedJob, Job } from './job';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {

  jobList: Job[] = [];
  detailedJoblist: DetailedJob[] = [];
  favoriteJobIDs: number[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
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

  isFavorite(id: number): boolean {
    return this.favoriteJobIDs.includes(id);
  }

  toggleFavoriteJob(id: number) {
    if (this.isFavorite(id)) {
      this.jobService.removeFavoriteJobID(id);
    } else {
      this.jobService.addFavoriteJobID(id);
    }
  }
}
