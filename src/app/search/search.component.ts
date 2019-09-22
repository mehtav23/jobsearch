import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { ISearch } from '../shared/interfaces/ISearch.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  selectedCity;
  page;
  locationData;
  skillData;
  selectedSkill;
  jobs: ISearch[];
  totalRecords = 0;
  first = 0;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
     this.searchService.initializeData().subscribe(() => {
     this.locationData = this.searchService.getLocation();
     console.log(this.locationData);
     this.skillData = this.searchService.getSkills();
     console.log(this.skillData);
    }, (error) => {
      console.log(error);
    });
  }

  getjobs() {
    this.page = 1;
    this.first = 0;
    const params: any = {};
    params.location = this.selectedCity ? this.selectedCity : null;
    params.skill = this.selectedSkill ? this.selectedSkill : null;
    this.jobs = this.searchService.getData(params);
    this.totalRecords = this.jobs.length;
  }

}
