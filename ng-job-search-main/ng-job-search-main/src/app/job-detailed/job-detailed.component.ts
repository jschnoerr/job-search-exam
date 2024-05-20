import { Component, Input, OnInit } from '@angular/core';
import { JobService } from '../job/job.service';
import { DetailedJob } from '../job/job';

@Component({
  selector: 'app-job-detailed',
  standalone: true,
  imports: [],
  templateUrl: './job-detailed.component.html',
  styleUrl: './job-detailed.component.css'
})
export class JobDetailedComponent implements OnInit{

  @Input()
  id!: string;

  detailedJoblist: DetailedJob[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getDetailedJob().subscribe(
      (data: DetailedJob[]) => {
        this.detailedJoblist = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
