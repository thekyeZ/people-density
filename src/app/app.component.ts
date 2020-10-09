import { Component } from '@angular/core';

import { Country } from './models/country.model';
import { DataScrapperService } from './services/data-scrapper/data-scrapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  countries: Country[] = [{ name: '-', density: 0 }];
  covidData: any[] = [];

  constructor(private dataService: DataScrapperService) {
    this.dataService.getJSON().subscribe(
      (data) =>
        (this.countries = data
          .map((el) => ({ ...el, name: el.name.trimLeft() }))
          .sort((a, b) => {
            return ('' + a.name).localeCompare(b.name);
          }))
    );

    this.dataService.getCases().subscribe((data) => (this.covidData = data));
  }
}
