import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISearch } from '../shared/interfaces/ISearch.interface';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private dataUrl = 'https://nut-case.s3.amazonaws.com/jobs.json';
  private data: any;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {

  }

  initializeData() {
    console.log(this.dataUrl);
    return this.http.get<ISearch[]>(this.dataUrl).pipe(map(res => {
      this.data = res;
    }));
  }

  getLocation() {
    const distinctLocations = [];
    const resultLocations = [];
    if (this.data) {
      this.data.data.forEach(element => {
        const location = element.location ? element.location.split(',') : [];
        location.forEach((locationName: string) => {
          if (distinctLocations.indexOf(locationName.trim()) === -1) {
            distinctLocations.push(locationName.trim());
            resultLocations.push({label: locationName, value: locationName});
          }
        });
      });
    }

    return resultLocations;
  }
  getSkills() {
    const distinctSkills = [];
    const resultSkills = [];
    if (this.data) {
      this.data.data.forEach(element => {
        const skillArray = element.skills ? element.skills.split(',') : [];
        skillArray.forEach((skill: string) => {
          if (distinctSkills.indexOf(skill.trim()) === -1) {
            distinctSkills.push(skill.trim());
            resultSkills.push({label: skill, value: skill});
          }
        });
      });
    }
    return resultSkills;
  }

  getData(params) {
    let data = this.data.data;
    if (params.location) {
      const location = params.location;
      data = data.filter((item) => {
        return item.location.split(',').indexOf(location) >= 0;
      });
    }
    if (params.skill) {
      const skill = params.skill;
      data = data.filter((item) => {
        return item.skills.split(',').indexOf(skill) >= 0;
      });
    }
    return data;
  }
}
