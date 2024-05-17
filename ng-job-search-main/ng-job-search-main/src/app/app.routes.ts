import { Routes } from '@angular/router';
import { JobComponent } from './job/job.component';

export const routes: Routes = [
    { path: '', redirectTo: 'joblist', pathMatch: 'full' },
    {path: 'joblist', component: JobComponent}
];
