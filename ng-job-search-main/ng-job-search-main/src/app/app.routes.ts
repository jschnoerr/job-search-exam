import { Routes } from '@angular/router';
import { JobComponent } from './job/job.component';
import { JobFavoritesComponent } from './job-favorites/job-favorites.component';

export const routes: Routes = [
    { path: 'favorites', component: JobFavoritesComponent },
    { path: 'joblist', component: JobComponent },
    { path: '**', redirectTo: 'joblist'}
];
