import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DataScrapperService } from './services/data-scrapper/data-scrapper.service';

interface ComparisonData {
  c1: {
    top: string,
    left: string
  }[];

  c2: {
    top: string,
    left: string
  }[];
}

interface Country {
  name: string;
  density: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'people-density';
  countries: Country[] = [{ name: '-', density: 0 }];
  comparison: BehaviorSubject<ComparisonData> = new BehaviorSubject({c1: [], c2: []});
  selectedCountries: Country[] = [];

  constructor(private dataService: DataScrapperService) {
    this.dataService.getJSON().subscribe((data) => (this.countries = data));
  }
  
  changeFirst(e): void {
    const country = this.countries.find((el) => el.name == e.target.value);
    this.selectedCountries[0] = country;
    this.generatePeople(country, 'c1');
  }

  changeSecond(e): void {
    const country = this.countries.find((el) => el.name == e.target.value);
    this.selectedCountries[1] = country;
    this.generatePeople(country, 'c2');
  }

  generatePeople(country, num: 'c1'| 'c2'): void {
    const ppkm = Number(country.density);
    console.log('ppkm', ppkm);
    let humans = [];

    for (let i = 0; i < ppkm; i++) {
      const dot = {
        top: Math.floor(Math.random() * 500).toString() + 'px',
        left: Math.floor(Math.random() * 500).toString() + 'px'
      };

      humans.push(dot);
    }

    const obj = {
      c1: num === 'c1' ? humans : this.comparison.getValue().c1,
      c2: num === 'c2' ? humans : this.comparison.getValue().c2
    };

    this.comparison.next(obj);
  }
}
