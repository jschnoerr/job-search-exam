import { Component, Input, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { DetailedJob } from '../job/job.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-detailed',
  standalone: true,
  imports: [],
  templateUrl: './job-detailed.component.html',
  styleUrl: './job-detailed.component.css'
})
export class JobDetailedComponent implements OnInit {

  @Input()
  id!: number;

  detailedJob?: DetailedJob;

  private subscriptions: Subscription = new Subscription();

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    const detailedJobSub = this.jobService.getDetailedJob(this.id).subscribe(
      (data: DetailedJob) => {
        this.detailedJob = data;
      }
    );

    this.subscriptions.add(detailedJobSub);
  }

  goBack(): void {
    window.history.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
