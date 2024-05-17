import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Job } from './job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiURL = "/jobs";

  constructor(private http: HttpClient) { }

    getJoblist(): Observable<Job> {
      return this.http.get<Job>(this.apiURL);
    }
}
