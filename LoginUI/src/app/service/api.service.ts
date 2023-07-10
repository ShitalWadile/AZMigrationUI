
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../Model/application';
export class ApiService {

  constructor(private http: HttpClient) { }

  getApplicationData(): Observable<Application[]> {
    // Replace the URL with your API endpoint to fetch the application data
    const url = 'your-api-endpoint';

    return this.http.get<Application[]>(url);
  }
}
