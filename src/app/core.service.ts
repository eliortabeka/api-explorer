import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  baseUrl:string = 'https://api.publicapis.org';

  constructor(private httpClient:HttpClient) { }

  getEntries() {
    return this.httpClient.get(`${this.baseUrl}/entries`);
  }

  getCategories() {
    return this.httpClient.get(`${this.baseUrl}/categories`);
  }

  getEntryByTitle(title: string) {
    return this.httpClient.get(`${this.baseUrl}/entries?title=${title}`);
  }

}
