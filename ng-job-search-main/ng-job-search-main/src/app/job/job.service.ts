import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DetailedJob, Job } from './job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private favoriteJobsSubject = new BehaviorSubject<number[]>([]);
  favoriteJobs$: Observable<number[]> = this.favoriteJobsSubject.asObservable();
  
  private apiURL = "/jobs";

  constructor(private http: HttpClient) { }

  getJob(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiURL);
  }

  getDetailedJob(): Observable<DetailedJob[]> {
    return this.http.get<DetailedJob[]>(this.apiURL);
  }

  addFavoriteJobID(id: number): void {
    this.favoriteJobsSubject.next([...this.favoriteJobsSubject.getValue(), id]);
  }

  removeFavoriteJobID(id: number): void {
    this.favoriteJobsSubject.next(this.favoriteJobsSubject.getValue().filter(favId => favId !== id));
  }

  getFavoriteJobIDs(): number[] {
    return this.favoriteJobsSubject.getValue();
  }
}
