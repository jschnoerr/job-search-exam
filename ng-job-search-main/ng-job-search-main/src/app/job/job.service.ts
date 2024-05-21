import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DetailedJob, Job } from './job.interface';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private favoriteJobsSubject = new BehaviorSubject<number[]>([]);
  favoriteJobs$: Observable<number[]>;
  
  private apiURL = "/jobs";

  constructor(private http: HttpClient) { 
    const storedFavoriteJobIDs = sessionStorage.getItem('favoriteJobIDs');
    const initialFavoriteJobIDs = storedFavoriteJobIDs ? JSON.parse(storedFavoriteJobIDs) : [];

    this.favoriteJobsSubject = new BehaviorSubject<number[]>(initialFavoriteJobIDs);
    this.favoriteJobs$ = this.favoriteJobsSubject.asObservable();
  }

  getJoblist(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiURL);
  }

  getDetailedJob(id: number): Observable<DetailedJob> {
    return this.http.get<DetailedJob>(`${this.apiURL}/${id}`);
  }

  addFavoriteJobID(id: number): void {
    this.favoriteJobsSubject.next([...this.favoriteJobsSubject.getValue(), id]);
    this.saveFavoriteJobIDs(this.favoriteJobsSubject.getValue());
  }

  removeFavoriteJobID(id: number): void {
    this.favoriteJobsSubject.next(this.favoriteJobsSubject.getValue().filter(favId => favId !== id));
    this.saveFavoriteJobIDs(this.favoriteJobsSubject.getValue());
  }

  getFavoriteJobIDs(): number[] {
    return this.favoriteJobsSubject.getValue();
  }

  private saveFavoriteJobIDs(favoriteJobIDs: number[]): void {
    sessionStorage.setItem('favoriteJobIDs', JSON.stringify(favoriteJobIDs));
  }
}
