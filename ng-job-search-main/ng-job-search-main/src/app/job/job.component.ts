import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { DetailedJob, Job } from './job';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {

  jobList: Job[] = [];
  detailedJoblist: DetailedJob[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJob().subscribe(
      (data: Job[]) => {
        this.jobList = data;
        this.jobList.map((job)=>{
          job.isFavorite = false;
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
  }

  toggleFavoriteJob(id: number){
    const index = this.jobList.findIndex(job => job.id == id);
    this.jobList[index].isFavorite = !this.jobList[index].isFavorite;
  }
}
