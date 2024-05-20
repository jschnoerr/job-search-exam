import { Routes } from '@angular/router';
import { JobComponent } from './job/job.component';
import { JobFavoritesComponent } from './job-favorites/job-favorites.component';
import { JobDetailedComponent } from './job-detailed/job-detailed.component';

export const routes: Routes = [
    { path: 'favorites', component: JobFavoritesComponent },
    { path: 'joblist', component: JobComponent },
    { path: 'joblist/:id', component: JobDetailedComponent},
    { path: '**', redirectTo: 'joblist'}
];
