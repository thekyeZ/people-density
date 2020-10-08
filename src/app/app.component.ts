import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DataScrapperService } from './services/data-scrapper/data-scrapper.service';

interface ComparisonData {
  c1: {
    top: string;
    left: string;
  }[];

  c2: {
    top: string;
    left: string;
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
export class AppComponent implements OnInit {
  title = 'people-density';
  countries: Country[] = [{ name: '-', density: 0 }];
  covidData: any[] = [];
  selectedCountries: Country[] = [];

  readonly CANVAS_SIZE = 500;

  @ViewChild('canvas1', { static: true })
  canvas1: ElementRef<HTMLCanvasElement>;

  @ViewChild('canvas2', { static: true })
  canvas2: ElementRef<HTMLCanvasElement>;

  private ctx1: CanvasRenderingContext2D;
  private ctx2: CanvasRenderingContext2D;

  private initialCountiesData = {
    cases: '-',
    deaths: '-'
  };

  countriesData = this.initialCountiesData;


  // covidApi = 'https://corona.lmao.ninja/v2/countries';

  ngOnInit(): void {
    this.ctx1 = this.canvas1.nativeElement.getContext('2d');
    this.ctx1.fillStyle = '#FF0000';

    this.ctx2 = this.canvas2.nativeElement.getContext('2d');
    this.ctx2.fillStyle = '#FF0000';
  }

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

  changeFirst(e): void {
    const country = this.countries.find((el) => el.name == e.target.value);
    this.selectedCountries[0] = country;
    this.generatePeople(country, 'ctx1');
    // console.log(this.covidData[0], country);
    this.setCountryCasesInfo(country, 0);
  }

  changeSecond(e): void {
    const country = this.countries.find((el) => el.name == e.target.value);
    this.selectedCountries[1] = country;
    this.generatePeople(country, 'ctx2');
    this.setCountryCasesInfo(country, 1);
  }

  setCountryCasesInfo(country: Country, num: 0 | 1): void {
    const found = this.covidData.find((covid) => {
      return (
        covid.country.toLowerCase().includes(country.name.toLowerCase()) ||
        country.name.toLowerCase().includes(covid.country.toLowerCase())
      );
    });

    console.log(found);

    this.countriesData[num] = found ? found : this.initialCountiesData;
  }

  generatePeople(country, num: 'ctx1' | 'ctx2'): void {
    this[num].clearRect(0, 0, this.CANVAS_SIZE, this.CANVAS_SIZE);

    this.ctx1.fillStyle = '#FF0000';
    this.ctx2.fillStyle = '#FF0000';

    const ppkm = Number(country.density);
    for (let i = 0; i < ppkm; i++) {
      const dot = {
        top: Math.floor(Math.random() * this.CANVAS_SIZE),
        left: Math.floor(Math.random() * this.CANVAS_SIZE),
      };

      // TODO: Oh god please refactor this
      if (num === 'ctx1') {
        this.ctx1.fillRect(dot.top, dot.left, 2, 2);
      }

      if (num === 'ctx2') {
        this.ctx2.fillRect(dot.top, dot.left, 2, 2);
      }
    }
  }
}
