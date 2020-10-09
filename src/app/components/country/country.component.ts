import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { Country, CountryData } from 'src/app/models/country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  readonly CANVAS_SIZE = 500;

  @Input() countries: Country[];
  @Input() covidData;

  public selectedCountry: Country;

  @ViewChild('canvas', { static: true })
  public canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  private initialCountiesData: CountryData = {
    cases: '-',
    deaths: '-'
  };

  public countryData: CountryData = this.initialCountiesData;


  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = '#FF0000';
  }

  change(e): void {
    const country = this.countries.find((el) => el.name === e.target.value);
    this.selectedCountry = country;
    this.generatePeople(country);
    this.setCountryCasesInfo(country);
  }

  generatePeople(country: Country): void {
    this.ctx.clearRect(0, 0, this.CANVAS_SIZE, this.CANVAS_SIZE);
    this.ctx.fillStyle = '#FF0000';

    const ppkm = Number(country.density);
    for (let i = 0; i < ppkm; i++) {
      const dot = {
        top: Math.floor(Math.random() * this.CANVAS_SIZE),
        left: Math.floor(Math.random() * this.CANVAS_SIZE),
      };

      this.ctx.fillRect(dot.top, dot.left, 2, 2);
    }
  }

  setCountryCasesInfo(country: Country): void {
    const found = this.covidData.find((covid) => {
      return (
        covid.country.toLowerCase().includes(country.name.toLowerCase()) ||
        country.name.toLowerCase().includes(covid.country.toLowerCase())
      );
    });

    console.log(found);

    this.countryData = found ? found : this.initialCountiesData;
  }
}
