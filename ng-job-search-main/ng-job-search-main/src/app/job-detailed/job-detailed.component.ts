import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-detailed',
  standalone: true,
  imports: [],
  templateUrl: './job-detailed.component.html',
  styleUrl: './job-detailed.component.css'
})
export class JobDetailedComponent {
  
  @Input()
  id!: string;
}
