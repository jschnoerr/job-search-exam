import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DetailedJob, Job } from './job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiURL = "/jobs";

  constructor(private http: HttpClient) { }

    getJob(): Observable<Job[]> {
      return this.http.get<Job[]>(this.apiURL);
    }

    getDetailedJob(): Observable<DetailedJob[]>{
      return this.http.get<DetailedJob[]>(this.apiURL)
    }
}
